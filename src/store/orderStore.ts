import { create } from 'zustand';
import { Order, OrderStatus } from '../types';

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addDynamicToOrder: (orderId: string, dynamicId: string) => void;
  getOrdersByStatus: (status?: OrderStatus) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  
  addOrder: (order) => set((state) => ({
    orders: [...state.orders, order]
  })),
  
  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map(order =>
      order.id === orderId
        ? { ...order, status, [status === 'accepted' ? 'acceptedAt' : status === 'completed' ? 'completedAt' : 'createdAt']: new Date().toISOString() }
        : order
    )
  })),
  
  addDynamicToOrder: (orderId, dynamicId) => set((state) => ({
    orders: state.orders.map(order =>
      order.id === orderId
        ? { ...order, dynamicIds: [...order.dynamicIds, dynamicId] }
        : order
    )
  })),
  
  getOrdersByStatus: (status) => {
    if (!status) return get().orders;
    return get().orders.filter(order => order.status === status);
  },
  
  getOrderById: (orderId) => get().orders.find(order => order.id === orderId)
}));
