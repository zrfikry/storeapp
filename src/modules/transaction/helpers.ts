import type { Product } from "_/modules/product/dto";

export type CartItem = {
  product: Product;
  qty: number;
};

/**
 * Format a numeric amount into a localized currency string.
 * @param amount The amount to format.
 * @param locale Optional BCP 47 locale string (default: en-US).
 * @param currency Optional ISO 4217 currency code (default: USD).
 * @returns The formatted currency string.
 */
export function formatCurrency(amount: number, locale = "en-US", currency = "USD"): string {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
  } catch {
    // Fallback simple formatting
    return `$${amount.toFixed(2)}`;
  }
}

/**
 * Calculate the cart subtotal as the sum of price x qty for all items.
 * @param items The cart items.
 * @returns The subtotal amount.
 */
export function calcSubtotal(items: CartItem[]): number {
  return items.reduce((sum, it) => sum + it.product.price * it.qty, 0);
}

/**
 * Calculate the total payable amount. Currently equals subtotal (no taxes/shipping).
 * @param items The cart items.
 * @returns The total amount.
 */
export function calcTotal(items: CartItem[]): number {
  return calcSubtotal(items);
}

/**
 * Find the index of an item in the cart by product id.
 * @param items The cart items.
 * @param productId The product id to search for.
 * @returns The index in the array or -1 if not found.
 */
export function findItemIndex(items: CartItem[], productId: number): number {
  return items.findIndex((it) => it.product.id === productId);
}
