/**
 * Política de slugs reservados. Regras de negócio que definem quais slugs são
 * PROIBIDOS (rotas do sistema, termos bloqueados) e como sugerir uma alternativa
 * quando o slug pedido colide com um reservado. Aplicada antes de persistir.
 */
const SYSTEM_ROUTES = ['admin', 'api', 'login', 'logout', 'settings', 'health', 'new', 'edit']
const BLOCKED_TERMS = ['spam', 'phishing']

export interface ReservationResult {
  allowed: boolean
  reason?: 'rota-do-sistema' | 'termo-bloqueado'
  suggestion?: string
}

/** Decide se um slug pode ser usado. Reservado por rota do sistema ganha sufixo numérico. */
export function checkReserved(slug: string): ReservationResult {
  if (SYSTEM_ROUTES.includes(slug)) {
    return { allowed: false, reason: 'rota-do-sistema', suggestion: `${slug}-1` }
  }
  if (BLOCKED_TERMS.some((t) => slug.includes(t))) {
    return { allowed: false, reason: 'termo-bloqueado' }
  }
  return { allowed: true }
}
