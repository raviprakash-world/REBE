import type { CartItem } from '@/types/cart';

export interface CartGroup {
  seller: string;
  items: CartItem[];
}

/** Marketplace carts: one block per seller, Rebe's own catalog first, then sellers in the order they were added. */
export function groupBySeller(items: CartItem[]): CartGroup[] {
  const groups = new Map<string, CartItem[]>();
  for (const item of items) {
    const seller = item.sellerName?.trim() || 'Rebe';
    groups.set(seller, [...(groups.get(seller) ?? []), item]);
  }
  return [...groups.entries()]
    .map(([seller, list]) => ({ seller, items: list }))
    .sort((a, b) => Number(b.seller === 'Rebe') - Number(a.seller === 'Rebe'));
}

/** What the shopper saves against the original prices, for lines that recorded one. */
export function cartSavings(items: CartItem[]): number {
  return items.reduce((sum, i) => (i.compareAtPrice && i.compareAtPrice > i.price ? sum + (i.compareAtPrice - i.price) * i.quantity : sum), 0);
}
