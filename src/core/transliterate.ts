/**
 * Tabela de transliteração: mapeia caracteres acentuados e símbolos comuns para
 * seus equivalentes ASCII, para que o slugify produza saída estável em URLs.
 */
const CHAR_MAP: Record<string, string> = {
  á: 'a', à: 'a', ã: 'a', â: 'a', ä: 'a',
  é: 'e', è: 'e', ê: 'e', ë: 'e',
  í: 'i', ì: 'i', î: 'i', ï: 'i',
  ó: 'o', ò: 'o', õ: 'o', ô: 'o', ö: 'o',
  ú: 'u', ù: 'u', û: 'u', ü: 'u',
  ç: 'c', ñ: 'n',
  '&': ' e ', '@': ' at ', '€': ' euro ', $: ' dollar ',
}

export function transliterate(input: string): string {
  let out = ''
  for (const ch of input) {
    const lower = ch.toLowerCase()
    const mapped = CHAR_MAP[lower]
    if (mapped === undefined) {
      out += ch
    } else if (ch === lower) {
      out += mapped
    } else {
      out += mapped.toUpperCase()
    }
  }
  return out
}
