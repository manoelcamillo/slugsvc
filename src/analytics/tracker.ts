/**
 * Rastreamento de uso de slugs. Registra eventos de criação e de acesso para
 * alimentar relatórios de popularidade — regra de negócio: cada acesso a um slug
 * incrementa seu contador, usado depois para ranquear os slugs mais buscados.
 */
export type SlugEventType = 'created' | 'accessed'

export interface SlugEvent {
  slug: string
  type: SlugEventType
  at: number
}

export class UsageTracker {
  private readonly events: SlugEvent[] = []
  private readonly counters = new Map<string, number>()

  constructor(private readonly now: () => number = Date.now) {}

  record(slug: string, type: SlugEventType): void {
    this.events.push({ slug, type, at: this.now() })
    if (type === 'accessed') this.counters.set(slug, (this.counters.get(slug) ?? 0) + 1)
  }

  accessCount(slug: string): number {
    return this.counters.get(slug) ?? 0
  }

  all(): readonly SlugEvent[] {
    return this.events
  }
}
