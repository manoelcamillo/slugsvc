import { UsageTracker } from './tracker.js'

/**
 * Relatórios de popularidade de slugs. Regra de negócio: o ranking dos slugs mais
 * acessados alimenta a home e sugestões; empates são desfeitos pela ordem alfabética.
 */
export interface RankedSlug {
  slug: string
  accesses: number
}

export function topSlugs(tracker: UsageTracker, limit = 10): RankedSlug[] {
  const bySlug = new Map<string, number>()
  for (const ev of tracker.all()) {
    if (ev.type === 'accessed') bySlug.set(ev.slug, (bySlug.get(ev.slug) ?? 0) + 1)
  }
  return [...bySlug.entries()]
    .map(([slug, accesses]) => ({ slug, accesses }))
    .sort((a, b) => b.accesses - a.accesses || a.slug.localeCompare(b.slug))
    .slice(0, limit)
}
