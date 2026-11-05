/**
 * Runs the inline PostHog loader against a fake page: it loads on the live hosts, stays off elsewhere and for our
 * own visits, and follows the cookie banner. `npx tsx tools/check-posthog.ts`
 */
import assert from "node:assert/strict";
import { posthogScript } from "../lib/analytics/posthog";

function run(host: string, opts: { cookie?: string; search?: string; consent?: string } = {}) {
  const listeners: Record<string, () => void> = {};
  const scripts: { src?: string }[] = [];
  const document = {
    cookie: opts.cookie ?? "",
    createElement: () => ({}) as { src?: string },
    getElementsByTagName: () => [{ parentNode: { insertBefore: (el: { src?: string }) => scripts.push(el) } }],
  };
  const window: Record<string, unknown> = {
    addEventListener: (name: string, fn: () => void) => (listeners[name] = fn),
    document,
    localStorage: { getItem: () => opts.consent ?? null },
    location: { hostname: host, search: opts.search ?? "" },
  };
  window.window = window;
  // page globals resolve on the fake window; `posthog` too, once the snippet has set it
  const scope = new Proxy(window, { has: (t, k) => k in t || k === "posthog" });
  new Function("scope", `with(scope){${posthogScript()}}`)(scope);
  const ph = window.posthog as { _i?: unknown[][] } | undefined;
  return { ph, scripts, listeners };
}

const live = run("wetrio.dev");
assert.equal(live.scripts[0]?.src, "https://eu-assets.i.posthog.com/static/array.js");
assert.equal((live.ph?._i?.[0]?.[0] as string).slice(0, 4), "phc_");
assert.equal((live.ph?._i?.[0]?.[1] as { cookieless_mode: string }).cookieless_mode, "on_reject");
assert.ok(live.listeners["consent-update"]);
assert.equal(run("www.wetrio.dev").scripts.length, 1);
assert.equal(run("localhost").ph, undefined);
assert.equal(run("wetr.io").ph, undefined);
assert.equal(run("wetrio.dev", { cookie: "a=1; wetrio_internal=internal" }).ph, undefined);
assert.equal(run("wetrio.dev", { search: "?x=1&internal=1" }).ph, undefined);

// the banner: "all" opts in, anything else opts out
type Sdk = { has_opted_in_capturing: () => boolean; opt_in_capturing: () => void; opt_out_capturing: () => void };
const sync = (consent: string | undefined, optedIn: boolean) => {
  const { ph } = run("wetrio.dev", { consent });
  const loaded = (ph?._i?.[0]?.[1] as { loaded: (a: Sdk) => void }).loaded;
  const did: string[] = [];
  loaded({ has_opted_in_capturing: () => optedIn, opt_in_capturing: () => did.push("in"), opt_out_capturing: () => did.push("out") });
  return did.join(",");
};
assert.equal(sync("all", false), "in");
assert.equal(sync("all", true), "");
assert.equal(sync("essential", true), "out");
assert.equal(sync(undefined, false), "");
console.log("posthog loader: ok");
