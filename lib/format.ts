/** Woo Store API prices arrive in minor units ("5000" = EUR 50.00). */
export function formatPrice(minor: string | number): string {
  const value = Number(minor) / 100;
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}
