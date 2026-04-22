import config from './leadMagnets.json' assert { type: 'json' };

export const LEAD_MAGNETS = config;

export function getTitleBySlug(slug) {
  return LEAD_MAGNETS[slug]?.title || 'Your Free PDF Resource';
}