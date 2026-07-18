/**
 * Cache LRU com capacidade fixa e expiração por TTL. Usado pela camada de API para
 * evitar recomputar o slug de títulos frequentes. Evicção pela ordem de inserção;
 * entradas expiradas (mais velhas que o TTL) são descartadas na leitura.
 */
interface Entry<V> {
  value: V
  expiresAt: number
}

export class LruCache<V> {
  private readonly map = new Map<string, Entry<V>>()

  /** @param capacity nº máximo de entradas. @param ttlMs tempo de vida (0 = sem expiração). */
  constructor(private readonly capacity: number, private readonly ttlMs = 0, private readonly now: () => number = Date.now) {}

  get(key: string): V | undefined {
    const entry = this.map.get(key)
    if (entry === undefined) return undefined
    if (this.ttlMs > 0 && this.now() >= entry.expiresAt) {
      this.map.delete(key) // expirou → descarta e trata como miss
      return undefined
    }
    this.map.delete(key)
    this.map.set(key, entry)
    return entry.value
  }

  set(key: string, value: V): void {
    if (this.map.has(key)) this.map.delete(key)
    this.map.set(key, { value, expiresAt: this.ttlMs > 0 ? this.now() + this.ttlMs : Infinity })
    if (this.map.size > this.capacity) {
      const oldest = this.map.keys().next().value
      if (oldest !== undefined) this.map.delete(oldest)
    }
  }

  get size(): number {
    return this.map.size
  }
}
