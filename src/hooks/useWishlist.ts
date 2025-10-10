import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistItem {
  productId: string;
  addedAt: number;
}

interface WishlistStore {
  items: WishlistItem[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToWishlist: (productId) => {
        const items = get().items;
        if (!items.find(item => item.productId === productId)) {
          set({ items: [...items, { productId, addedAt: Date.now() }] });
        }
      },
      removeFromWishlist: (productId) => {
        set({ items: get().items.filter(item => item.productId !== productId) });
      },
      isInWishlist: (productId) => {
        return get().items.some(item => item.productId === productId);
      },
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'bhulaxmi-wishlist',
    }
  )
);
