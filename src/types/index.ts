export type UserRole = 'customer' | 'player' | 'admin';

export type OrderStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';

export interface User {
  id: string;
  username: string;
  avatar: string;
  role: UserRole;
  phone: string;
  email: string;
  createdAt: string;
  rating: number;
  completedOrders: number;
  isVerified: boolean;
}

export interface Dynamic {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  images: string[];
  orderId?: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
  isApproved: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  type: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedDays: number;
  playerId: string;
  playerName: string;
  playerAvatar: string;
  playerRating: number;
  salesCount: number;
  images: string[];
  tags: string[];
  isOnline: boolean;
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selected: boolean;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  playerId: string;
  playerName: string;
  playerAvatar: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  acceptedAt?: string;
  completedAt?: string;
  dynamicIds: string[];
  remarks: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'order' | 'dynamic' | 'system';
  title: string;
  content: string;
  link: string;
  isRead: boolean;
  createdAt: string;
}
