import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types/models';

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantidade: number) => void;
  clearCart: () => void;
  getTotalValue: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product: Product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.product.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantidade: item.quantidade + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { product, quantidade: 1 }] });
        }
      },

      removeFromCart: (productId: number) => {
        set({ items: get().items.filter((item) => item.product.id !== productId) });
      },

      updateQuantity: (productId: number, quantidade: number) => {
        if (quantidade <= 0) {
          get().removeFromCart(productId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.product.id === productId ? { ...item, quantidade } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalValue: () => {
        return get().items.reduce(
          (total, item) => total + item.product.preco * item.quantidade,
          0
        );
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantidade, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
