import { create } from 'zustand';
import { Dynamic, Comment } from '../types';

interface DynamicStore {
  dynamics: Dynamic[];
  addDynamic: (dynamic: Dynamic) => void;
  updateDynamic: (id: string, dynamic: Partial<Dynamic>) => void;
  deleteDynamic: (id: string) => void;
  approveDynamic: (id: string) => void;
  addComment: (dynamicId: string, comment: Comment) => void;
  likeDynamic: (id: string) => void;
  getDynamicsByOrderId: (orderId: string) => Dynamic[];
  getApprovedDynamics: () => Dynamic[];
}

export const useDynamicStore = create<DynamicStore>((set, get) => ({
  dynamics: [],
  
  addDynamic: (dynamic) => set((state) => ({
    dynamics: [...state.dynamics, dynamic]
  })),
  
  updateDynamic: (id, dynamic) => set((state) => ({
    dynamics: state.dynamics.map(d =>
      d.id === id ? { ...d, ...dynamic } : d
    )
  })),
  
  deleteDynamic: (id) => set((state) => ({
    dynamics: state.dynamics.filter(d => d.id !== id)
  })),
  
  approveDynamic: (id) => set((state) => ({
    dynamics: state.dynamics.map(d =>
      d.id === id ? { ...d, isApproved: true } : d
    )
  })),
  
  addComment: (dynamicId, comment) => set((state) => ({
    dynamics: state.dynamics.map(d =>
      d.id === dynamicId
        ? { ...d, comments: [...d.comments, comment] }
        : d
    )
  })),
  
  likeDynamic: (id) => set((state) => ({
    dynamics: state.dynamics.map(d =>
      d.id === id ? { ...d, likes: d.likes + 1 } : d
    )
  })),
  
  getDynamicsByOrderId: (orderId) =>
    get().dynamics.filter(d => d.orderId === orderId),
  
  getApprovedDynamics: () =>
    get().dynamics.filter(d => d.isApproved).sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
}));
