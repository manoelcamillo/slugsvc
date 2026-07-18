import { createServer, IncomingMessage, ServerResponse } from 'node:http'
import { routes } from './routes.js'

/**
 * Servidor HTTP mínimo que expõe o slugificador. Faz o dispatch das requisições
 * para a tabela de rotas e serializa a resposta como JSON.
 */
export function startServer(port = 3000): ReturnType<typeof createServer> {
  const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    const url = new URL(req.url ?? '/', `http://${req.headers.host}`)
    const handler = routes[url.pathname]
    if (!handler) {
      res.writeHead(404, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ error: 'not found' }))
      return
    }
    const result = handler(url.searchParams)
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify(result))
  })
  server.listen(port)
  return server
}
