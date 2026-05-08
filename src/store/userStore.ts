import { create } from 'zustand';
import { User, UserRole } from '../types';

interface UserStore {
  currentUser: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  switchRole: (role: UserRole) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  isLoggedIn: false,
  
  login: (user) => set({ currentUser: user, isLoggedIn: true }),
  
  logout: () => set({ currentUser: null, isLoggedIn: false }),
  
  updateUser: (user) => set((state) => ({
    currentUser: state.currentUser ? { ...state.currentUser, ...user } : null
  })),
  
  switchRole: (role) => set((state) => ({
    currentUser: state.currentUser ? { ...state.currentUser, role } : null
  }))
}));
