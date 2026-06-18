"use client";

import { useEffect, useState } from "react";

type Gtag = (...args: unknown[]) => void;

function updateConsent(granted: boolean) {
  const value = granted ? "granted" : "denied";
  const params = {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  };
  const w = window as unknown as { gtag?: Gtag; dataLayer?: unknown[] };
  if (typeof w.gtag === "function") {
    w.gtag("consent", "update", params);
  } else {
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push({ event: "consent_update", ...params });
  }
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("ta-consent")) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function decide(granted: boolean) {
    try {
      localStorage.setItem("ta-consent", granted ? "granted" : "denied");
    } catch {}
    updateConsent(granted);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de privacidade"
      aria-live="polite"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-2xl border border-border bg-card/95 p-5 shadow-lg backdrop-blur-md sm:inset-x-auto sm:right-4 sm:left-4"
    >
      <p className="text-sm text-muted">
        Usamos cookies para medir o desempenho do site e melhorar sua experiência. Você pode aceitar
        ou recusar. Veja a{" "}
        <a href="/privacidade" className="text-brand underline underline-offset-2">
          Política de Privacidade
        </a>
        .
      </p>
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => decide(true)}
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-strong"
        >
          Aceitar
        </button>
        <button
          onClick={() => decide(false)}
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-fg transition hover:bg-surface"
        >
          Recusar
        </button>
      </div>
    </div>
  );
}
