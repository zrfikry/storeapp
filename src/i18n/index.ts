import en from './locales/en.json'

export type Messages = typeof en

// Flatten dotted key access for simplicity
export type MessageKey =
  | `common.${keyof Messages['common']}`
  | `home.${keyof Messages['home']}`
  | `product.${keyof Messages['product']}`
  | `cart.${keyof Messages['cart']}`

const dict: Messages = en

/**
 * Interpolate params in a message string using {param} placeholders.
 */
function interpolate(str: string, params?: Record<string, string | number>): string {
  if (!params) return str
  return str.replace(/\{(.*?)\}/g, (_, k) => String(params[k] ?? `{${k}}`))
}

/**
 * Translate a dotted key using the English dictionary. Supports basic interpolation.
 * Since only English is supported for now, there is no runtime locale switching.
 */
export const t = (key: MessageKey, params?: Record<string, string | number>): string => {
  const [ns, k] = key.split('.') as [keyof Messages, string]
  const section = (dict as never)[ns] as Record<string, string> | undefined
  const template = section?.[k]
  return interpolate(template ?? key, params)
}
