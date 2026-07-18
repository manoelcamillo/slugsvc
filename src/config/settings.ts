/**
 * Configurações do serviço, carregadas do ambiente com valores padrão. Centraliza
 * os parâmetros operacionais (porta, tamanho do cache, TTL) para que o resto do
 * código não leia process.env diretamente.
 */
export interface Settings {
  port: number
  cacheCapacity: number
  cacheTtlMs: number
}

const DEFAULTS: Settings = {
  port: 3000,
  cacheCapacity: 500,
  cacheTtlMs: 0,
}

function num(value: string | undefined, fallback: number): number {
  const n = value != null ? Number(value) : NaN
  return Number.isFinite(n) ? n : fallback
}

export function loadSettings(env: Record<string, string | undefined> = process.env): Settings {
  return {
    port: num(env.PORT, DEFAULTS.port),
    cacheCapacity: num(env.CACHE_CAPACITY, DEFAULTS.cacheCapacity),
    cacheTtlMs: num(env.CACHE_TTL_MS, DEFAULTS.cacheTtlMs),
  }
}
