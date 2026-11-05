/**
 * PostHog, the studio's project: the one wetr.io writes to through its GTM tag and the Hub reads for the visit journal
 * (Marketing → Site, split by host). The tag in the container is limited to wetr.io's hosts, so this site loads the
 * same snippet with the same settings itself. Do not also add wetrio.dev to that tag: the second init is ignored,
 * but there would be two places to keep in step.
 *
 * Before a choice and after "Essential only" PostHog counts the visit cookieless; "Accept all" opts it in. Our own
 * visits (`?internal=1`, which the GTM container turns into the `wetrio_internal` cookie) are not counted at all.
 */

import { ANALYTICS_HOSTS } from "@/lib/site";
import { CONSENT_KEY } from "./consent";

const KEY = "phc_togbw4Jn9sSQooidoHsSqsz5v3KCF3EMpYS9Dpji2avn";

declare global {
  interface Window {
    posthog?: {
      capture?: (event: string, properties?: Record<string, unknown>) => void;
      get_distinct_id?: () => string | undefined;
      get_session_id?: () => string | undefined;
    };
  }
}

/** Inline <head> script, after the Consent Mode defaults. The middle is PostHog's own loader, unchanged. */
export function posthogScript(): string {
  return String.raw`
(function(){
if(${JSON.stringify(ANALYTICS_HOSTS)}.indexOf(location.hostname)===-1)return;
if(/(?:^|;\s*)wetrio_internal=internal(?:;|$)/.test(document.cookie)||/[?&]internal=1(?:&|$)/.test(location.search))return;
function sync(a){var all;try{all=localStorage.getItem(${JSON.stringify(CONSENT_KEY)})==="all"}catch(e){all=false}
if(all&&!a.has_opted_in_capturing())a.opt_in_capturing({captureEventName:false});else if(!all&&a.has_opted_in_capturing())a.opt_out_capturing()}
!function(a,b){var h,k,g,n;b.__SV||(window.posthog=b,b._i=[],b.init=function(q,p,e){function r(f,c){var l=c.split(".");2==l.length&&(f=f[l[0]],c=l[1]);f[c]=function(){f.push([c].concat(Array.prototype.slice.call(arguments,0)))}}(g=a.createElement("script")).type="text/javascript";g.crossOrigin="anonymous";g.async=!0;g.src=p.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js";(n=a.getElementsByTagName("script")[0]).parentNode.insertBefore(g,n);var d=b;void 0!==e?d=b[e]=[]:e="posthog";d.people=d.people||[];Object.defineProperty(d,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(f){var c="posthog";return"posthog"!==e&&(c+="."+e),f||(c+=" (stub)"),c}});Object.defineProperty(d.people,"toString",{configurable:!0,enumerable:!0,writable:!0,value:function(){return d.toString(1)+".people (stub)"}});h="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" ");for(k=0;k<h.length;k++)r(d,h[k]);b._i.push([q,p,e])},b.__SV=1)}(document,window.posthog||[]);
posthog.init("${KEY}",{api_host:"https://eu.i.posthog.com",defaults:"2026-08-30",cookieless_mode:"on_reject",opt_out_capturing_by_default:true,person_profiles:"identified_only",autocapture:true,capture_heatmaps:true,capture_dead_clicks:false,capture_pageview:"history_change",capture_pageleave:true,session_recording:{maskAllInputs:true,maskTextSelector:"[data-ph-mask]"},loaded:sync});
window.addEventListener("consent-update",function(){var a=window.posthog;if(a&&a.__loaded)sync(a)});
})();
`.trim();
}

/** A PostHog id off the SDK: a string, bounded, or nothing. A cookieless visitor's is the placeholder `$posthog_cookieless`. */
function id(value: unknown): string | undefined {
  if (typeof value !== "string" || value.startsWith("$")) return undefined;
  return value.trim().slice(0, 100) || undefined;
}

/**
 * Who PostHog is counting this visit as, read when the form is sent. The Hub joins the lead to its visit by the
 * session id. Read from the SDK, not the cookie: most visitors are cookieless and have none.
 */
export function posthogIds(): { posthog_distinct_id?: string; posthog_session_id?: string } {
  try {
    const ph = window.posthog;
    const distinctId = id(ph?.get_distinct_id?.());
    const sessionId = id(ph?.get_session_id?.());
    return {
      ...(distinctId ? { posthog_distinct_id: distinctId } : {}),
      ...(sessionId ? { posthog_session_id: sessionId } : {}),
    };
  } catch {
    return {};
  }
}
