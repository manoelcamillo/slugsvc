import { slugify } from '../core/slugify.js'
import { LruCache } from '../storage/cache.js'

type RouteHandler = (params: URLSearchParams) => unknown

const cache = new LruCache<string>(500)

/**
 * Tabela de rotas do serviço. Cada rota recebe os query params e devolve um
 * objeto serializável. A rota /slug usa cache para títulos repetidos; /batch
 * gera vários slugs de uma vez (títulos separados por vírgula).
 */
export const routes: Record<string, RouteHandler> = {
  '/health': () => ({ status: 'ok' }),
  '/slug': (params) => {
    const title = params.get('title') ?? ''
    const cached = cache.get(title)
    if (cached) return { slug: cached, cached: true }
    const slug = slugify(title)
    cache.set(title, slug)
    return { slug, cached: false }
  },
  '/batch': (params) => {
    const titles = (params.get('titles') ?? '').split(',').map((t) => t.trim()).filter(Boolean)
    return { slugs: titles.map((title) => ({ title, slug: slugify(title) })) }
  },
}
