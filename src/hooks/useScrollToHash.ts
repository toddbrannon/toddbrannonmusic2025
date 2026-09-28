import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RETRY_WINDOW_MS = 500;

/**
 * Scrolls to the element named by location.hash. Sections further down the page
 * may not be in the DOM on the first frame after a route change, so this retries
 * for a short window before giving up. `location.key` is in the deps so clicking
 * the same anchor twice scrolls again.
 */
export function useScrollToHash() {
  const { hash, key } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const startedAt = Date.now();
    let frame = 0;

    const attempt = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (Date.now() - startedAt < RETRY_WINDOW_MS) frame = requestAnimationFrame(attempt);
    };

    attempt();
    return () => cancelAnimationFrame(frame);
  }, [hash, key]);
}
