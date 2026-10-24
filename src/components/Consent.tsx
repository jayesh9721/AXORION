"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";

type Consent = "granted" | "denied" | null | "unknown";

const KEY = "consent";
const EVENT = "axorion-consent";

function read(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}
function write(v: "granted" | "denied" | null) {
  try {
    if (v) localStorage.setItem(KEY, v);
    else localStorage.removeItem(KEY);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}
function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
const useConsent = () => useSyncExternalStore<Consent>(subscribe, read, () => "unknown");

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/** Cookie banner. GA4 and Meta Pixel are loaded only after the visitor accepts (and only if their IDs are set). */
export default function ConsentBanner() {
  const consent = useConsent();
  return (
    <>
      {consent === "granted" && GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}
      {consent === "granted" && PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}
      {consent === null && (
        <div role="dialog" aria-label="Cookie consent" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-line bg-surface p-4 shadow-2xl sm:bottom-5 sm:left-5 sm:right-auto sm:p-5">
          <p className="text-sm text-muted">
            We use optional analytics and advertising cookies to understand how the site is used. They stay off unless you accept. See our{" "}
            <a href="/privacy" className="text-accent2 underline">Privacy Policy</a>.
          </p>
          <div className="mt-3 flex gap-2">
            <button onClick={() => write("granted")} className="btn btn-primary !min-h-10 !px-4 !py-2 !text-sm">Accept</button>
            <button onClick={() => write("denied")} className="btn btn-ghost !min-h-10 !px-4 !py-2 !text-sm">Decline</button>
          </div>
        </div>
      )}
    </>
  );
}

export function CookieSettingsButton() {
  return (
    <button onClick={() => write(null)} className="hover:text-fg">
      Cookie settings
    </button>
  );
}
