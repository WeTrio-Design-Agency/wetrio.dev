"use client";

import { useEffect, useRef } from "react";
import { TURNSTILE_SITE_KEY } from "@/lib/site";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "flexible";
          appearance?: "always" | "execute" | "interaction-only";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      remove: (widgetId: string) => void;
    };
  }
}

type Props = {
  onVerify: (token: string) => void;
  onExpire: () => void;
  /** The script was blocked or the challenge never answered: the form sends anyway and the intake decides. */
  onLoadError: () => void;
  /** Bump to get a fresh token after a send. */
  resetKey: number;
};

// how long to wait for the script, then for a token, before failing open (wetr.io's numbers)
const LOAD_TIMEOUT_MS = 10_000;
const SOLVE_TIMEOUT_MS = 15_000;

/**
 * Cloudflare Turnstile, ported from wetr.io's `TurnstileWidget`: invisible unless Cloudflare wants this visitor to
 * prove something, the token arriving while they fill the fields. The admin intake verifies it.
 */
export function Turnstile({ onVerify, onExpire, onLoadError, resetKey }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const callbacks = useRef({ onVerify, onExpire, onLoadError });
  useEffect(() => {
    callbacks.current = { onVerify, onExpire, onLoadError };
  });

  useEffect(() => {
    if (document.querySelector("script[data-cf-turnstile]")) return;
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.defer = true;
    s.setAttribute("data-cf-turnstile", "");
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    let destroyed = false;
    let verified = false;
    let widgetId: string | null = null;
    let solveTimer: ReturnType<typeof setTimeout> | undefined;
    const failOpen = () => {
      if (!destroyed && !verified) callbacks.current.onLoadError();
    };

    const render = () => {
      if (destroyed || !window.turnstile || !ref.current) return;
      widgetId = window.turnstile.render(ref.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "dark",
        size: "flexible",
        appearance: "interaction-only",
        callback: (token) => {
          if (destroyed) return;
          verified = true;
          clearTimeout(solveTimer);
          callbacks.current.onVerify(token);
        },
        "expired-callback": () => {
          if (destroyed) return;
          verified = false;
          callbacks.current.onExpire();
        },
        "error-callback": () => {
          if (destroyed) return;
          clearTimeout(solveTimer);
          callbacks.current.onExpire();
          callbacks.current.onLoadError();
        },
      });
      solveTimer = setTimeout(failOpen, SOLVE_TIMEOUT_MS);
    };

    let poll: ReturnType<typeof setInterval> | undefined;
    let loadTimer: ReturnType<typeof setTimeout> | undefined;
    if (window.turnstile) render();
    else {
      poll = setInterval(() => {
        if (!window.turnstile) return;
        clearInterval(poll);
        clearTimeout(loadTimer);
        render();
      }, 150);
      loadTimer = setTimeout(() => {
        clearInterval(poll);
        if (!window.turnstile) failOpen();
      }, LOAD_TIMEOUT_MS);
    }

    return () => {
      destroyed = true;
      clearInterval(poll);
      clearTimeout(loadTimer);
      clearTimeout(solveTimer);
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch {
          /* already gone */
        }
      }
    };
  }, [resetKey]);

  return <div ref={ref} />;
}
