type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export function pushDataLayer(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...params });
}

export function trackWhatsApp(origin: string): void {
  pushDataLayer("whatsapp_click", { origin });
}

export function trackCall(origin: string): void {
  pushDataLayer("call_click", { origin });
}
