/**
 * Cache LRU simples com capacidade fixa. Usado pela camada de API para evitar
 * recomputar o slug de títulos frequentes. Evicção pela ordem de inserção.
 */
export class LruCache<V> {
  private readonly map = new Map<string, V>()

  constructor(private readonly capacity: number) {}

  get(key: string): V | undefined {
    const value = this.map.get(key)
    if (value === undefined) return undefined
    this.map.delete(key)
    this.map.set(key, value)
    return value
  }

  set(key: string, value: V): void {
    if (this.map.has(key)) this.map.delete(key)
    this.map.set(key, value)
    if (this.map.size > this.capacity) {
      const oldest = this.map.keys().next().value
      if (oldest !== undefined) this.map.delete(oldest)
    }
  }

  get size(): number {
    return this.map.size
  }
}
