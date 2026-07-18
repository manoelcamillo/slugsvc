import { transliterate } from './transliterate.js'

export interface SlugifyOptions {
  separator?: string
  lowercase?: boolean
  maxLength?: number
}

const DEFAULTS: Required<SlugifyOptions> = {
  separator: '-',
  lowercase: true,
  maxLength: 120,
}

/**
 * Converte um título arbitrário num slug seguro para URL: translitera acentos,
 * remove pontuação, colapsa separadores e trunca no limite de comprimento.
 */
export function slugify(input: string, options: SlugifyOptions = {}): string {
  const opts = { ...DEFAULTS, ...options }
  let s = transliterate(input)
  if (opts.lowercase) s = s.toLowerCase()
  s = s.replace(/[^a-zA-Z0-9]+/g, opts.separator)
  s = collapseSeparators(s, opts.separator)
  s = trimSeparators(s, opts.separator)
  if (s.length > opts.maxLength) {
    // Trunca sem cortar no meio de uma palavra: recua até o último separador.
    s = s.slice(0, opts.maxLength)
    const lastSep = s.lastIndexOf(opts.separator)
    if (lastSep > 0) s = s.slice(0, lastSep)
  }
  return trimSeparators(s, opts.separator)
}

function collapseSeparators(s: string, sep: string): string {
  const escaped = sep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return s.replace(new RegExp(`${escaped}{2,}`, 'g'), sep)
}

function trimSeparators(s: string, sep: string): string {
  const escaped = sep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return s.replace(new RegExp(`^${escaped}+|${escaped}+$`, 'g'), '')
}
