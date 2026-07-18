/**
 * Cota de criação de slugs por usuário. Regra de negócio que limita quantos slugs
 * um usuário pode criar dentro de uma janela de tempo (proteção contra abuso).
 */
export interface QuotaPolicy {
  maxPerUser: number
  windowHours: number
}

export const DEFAULT_QUOTA: QuotaPolicy = { maxPerUser: 100, windowHours: 24 }

/** Verifica se o usuário ainda está dentro da cota, dado quantos já criou na janela. */
export function withinQuota(createdInWindow: number, policy: QuotaPolicy = DEFAULT_QUOTA): boolean {
  return createdInWindow < policy.maxPerUser
}
