"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { trackEvent } from "@/lib/analytics/track";

const LINKS = [
  { href: "#products", label: "Products" },
  { href: "#projects", label: "Projects" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
];

/** The bar after the reference (Kirill, 30.10): the mark, the links and the button in one group on the left. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-background/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="wrap flex h-20 items-center">
        <a href="#top" className="z-10 flex items-center" aria-label="WeTrio Dev Lab, home">
          <Logo />
        </a>

        <div className="ml-8 hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={() => trackEvent("cta_click", { place: "nav" })} className="btn btn-secondary ml-3">
            Start a project
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-md bg-white/5 lg:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-foreground transition-all duration-300 ${
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 bg-foreground transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-foreground transition-all duration-300 ${
                open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="h-[calc(100dvh-5rem)] overflow-y-auto bg-background/95 backdrop-blur-xl lg:hidden">
          <div className="wrap flex flex-col gap-1 py-4">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => {
                setOpen(false);
                trackEvent("cta_click", { place: "nav_mobile" });
              }}
              className="btn btn-primary mt-3"
            >
              Start a project
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
