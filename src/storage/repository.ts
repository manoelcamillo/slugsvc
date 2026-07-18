/**
 * Repositório de slugs persistidos. Abstrai o armazenamento durável dos mapeamentos
 * título → slug, garantindo unicidade do slug via sufixo incremental em colisão.
 */
export interface SlugRecord {
  title: string
  slug: string
  createdAt: string
}

export interface SlugStore {
  find(slug: string): SlugRecord | undefined
  save(record: SlugRecord): void
  all(): SlugRecord[]
}

export class InMemorySlugStore implements SlugStore {
  private readonly bySlug = new Map<string, SlugRecord>()

  find(slug: string): SlugRecord | undefined {
    return this.bySlug.get(slug)
  }

  save(record: SlugRecord): void {
    let unique = record.slug
    let n = 2
    while (this.bySlug.has(unique)) {
      unique = `${record.slug}-${n}`
      n++
    }
    this.bySlug.set(unique, { ...record, slug: unique })
  }

  all(): SlugRecord[] {
    return [...this.bySlug.values()]
  }
}
