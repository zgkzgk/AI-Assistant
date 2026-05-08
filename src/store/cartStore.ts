import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleSelect: (id: string) => void;
  selectAll: () => void;
  clearCart: () => void;
  getSelectedItems: () => CartItem[];
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (product) => set((state) => {
    const existingItem = state.items.find(item => item.productId === product.id);
    if (existingItem) {
      return {
        items: state.items.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    }
    return {
      items: [...state.items, {
        id: `${product.id}-${Date.now()}`,
        productId: product.id,
        product,
        quantity: 1,
        selected: true
      }]
    };
  }),
  
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  
  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    )
  })),
  
  toggleSelect: (id) => set((state) => ({
    items: state.items.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    )
  })),
  
  selectAll: () => set((state) => ({
    items: state.items.map(item => ({ ...item, selected: true }))
  })),
  
  clearCart: () => set({ items: [] }),
  
  getSelectedItems: () => get().items.filter(item => item.selected),
  
  getTotalPrice: () => get().items
    .filter(item => item.selected)
    .reduce((total, item) => total + item.product.price * item.quantity, 0)
}));
