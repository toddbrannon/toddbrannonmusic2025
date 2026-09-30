// Thin wrapper so pages can report events without caring which analytics tool
// is installed. Sends to Umami, GA4 (gtag) and/or Plausible if their script is on the
// page; otherwise it's a no-op (and logs in dev so events can be verified).

type EventProps = Record<string, string>;

declare global {
  interface Window {
    gtag?: (command: 'event', name: string, params?: EventProps) => void;
    plausible?: (name: string, options?: { props?: EventProps }) => void;
    umami?: { track: (name: string, data?: EventProps) => void };
  }
}

export function trackEvent(name: string, props: EventProps = {}): void {
  try {
    window.umami?.track(name, props);
    window.gtag?.('event', name, props);
    window.plausible?.(name, { props });
  } catch {
    /* analytics must never break the page */
  }
  if (import.meta.env.DEV) console.info('[analytics]', name, props);
}
