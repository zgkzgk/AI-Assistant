import { User, Dynamic, Product, Order } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    username: '游戏达人小王',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=professional%20gamer%20avatar%20portrait%20young%20man%20with%20headphones%20gaming%20style&image_size=square',
    role: 'player',
    phone: '138****8888',
    email: 'player@example.com',
    createdAt: '2024-01-15',
    rating: 4.9,
    completedOrders: 328,
    isVerified: true
  },
  {
    id: 'user-2',
    username: '神武小王子',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=anime%20style%20gamer%20avatar%20portrait%20young%20man%20with%20sword&image_size=square',
    role: 'player',
    phone: '139****9999',
    email: 'player2@example.com',
    createdAt: '2024-02-20',
    rating: 4.8,
    completedOrders: 156,
    isVerified: true
  },
  {
    id: 'user-3',
    username: '代练大师',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=serious%20gamer%20avatar%20portrait%20man%20with%20glasses%20professional&image_size=square',
    role: 'player',
    phone: '137****7777',
    email: 'player3@example.com',
    createdAt: '2023-12-10',
    rating: 4.7,
    completedOrders: 421,
    isVerified: true
  },
  {
    id: 'user-4',
    username: '逍遥玩家',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=casual%20gamer%20avatar%20portrait%20young%20man%20relaxed%20style&image_size=square',
    role: 'customer',
    phone: '136****6666',
    email: 'customer@example.com',
    createdAt: '2024-03-01',
    rating: 0,
    completedOrders: 0,
    isVerified: true
  },
  {
    id: 'user-5',
    username: '管理员',
    avatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=administrator%20avatar%20portrait%20professional%20man&image_size=square',
    role: 'admin',
    phone: '135****5555',
    email: 'admin@example.com',
    createdAt: '2023-11-01',
    rating: 0,
    completedOrders: 0,
    isVerified: true
  }
];

export const mockDynamics: Dynamic[] = [
  {
    id: 'dynamic-1',
    userId: 'user-1',
    userName: '游戏达人小王',
    userAvatar: mockUsers[0].avatar,
    content: '今天帮客户完成了100级突破任务！用时3小时，效率杠杠的！客户非常满意~',
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=game%20screen%20shot%20RPG%20level%20100%20achievement%20celebration&image_size=landscape_16_9',
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=game%20character%20stats%20powerful%20warrior&image_size=landscape_16_9'
    ],
    orderId: 'order-1',
    createdAt: '2024-01-15T14:30:00Z',
    likes: 128,
    comments: [
      { id: 'c1', userId: 'user-4', userName: '逍遥玩家', content: '厉害！', createdAt: '2024-01-15T14:35:00Z' }
    ],
    isApproved: true
  },
  {
    id: 'dynamic-2',
    userId: 'user-2',
    userName: '神武小王子',
    userAvatar: mockUsers[1].avatar,
    content: '日常代练中，今天的目标是帮客户提升装备等级~',
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=game%20equipment%20upgrade%20interface%20shiny%20items&image_size=landscape_16_9'
    ],
    createdAt: '2024-01-15T10:20:00Z',
    likes: 89,
    comments: [],
    isApproved: true
  },
  {
    id: 'dynamic-3',
    userId: 'user-3',
    userName: '代练大师',
    userAvatar: mockUsers[2].avatar,
    content: '周末加班接单中，效率第一，信誉至上！有需要的老板随时联系~',
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=game%20battle%20scene%20action%20combat%20fantasy&image_size=landscape_16_9',
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=game%20victory%20screen%20golden%20trophy&image_size=landscape_16_9',
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=game%20character%20profile%20high%20level&image_size=landscape_16_9'
    ],
    createdAt: '2024-01-14T16:45:00Z',
    likes: 156,
    comments: [
      { id: 'c2', userId: 'user-4', userName: '逍遥玩家', content: '支持！', createdAt: '2024-01-14T17:00:00Z' },
      { id: 'c3', userId: 'user-1', userName: '游戏达人小王', content: '同行加油！', createdAt: '2024-01-14T17:30:00Z' }
    ],
    isApproved: true
  },
  {
    id: 'dynamic-4',
    userId: 'user-1',
    userName: '游戏达人小王',
    userAvatar: mockUsers[0].avatar,
    content: '深夜赶工中，帮客户刷副本材料！',
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=game%20dungeon%20crawl%20dark%20fantasy%20scene&image_size=landscape_16_9'
    ],
    orderId: 'order-2',
    createdAt: '2024-01-13T23:15:00Z',
    likes: 67,
    comments: [],
    isApproved: true
  },
  {
    id: 'dynamic-5',
    userId: 'user-2',
    userName: '神武小王子',
    userAvatar: mockUsers[1].avatar,
    content: '刚完成一个高难度任务，客户奖励了好评！开心~',
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=game%20achievement%20unlocked%20golden%20stars&image_size=landscape_16_9',
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=game%20chat%20interface%20positive%20feedback&image_size=landscape_16_9'
    ],
    createdAt: '2024-01-13T15:00:00Z',
    likes: 203,
    comments: [
      { id: 'c4', userId: 'user-3', userName: '代练大师', content: '恭喜！', createdAt: '2024-01-13T15:30:00Z' }
    ],
    isApproved: true
  },
  {
    id: 'dynamic-pending',
    userId: 'user-1',
    userName: '游戏达人小王',
    userAvatar: mockUsers[0].avatar,
    content: '新动态等待审核...',
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=game%20screenshot%20waiting%20review&image_size=landscape_16_9'
    ],
    createdAt: '2024-01-15T18:00:00Z',
    likes: 0,
    comments: [],
    isApproved: false
  }
];

export const mockProducts: Product[] = [
  {
    id: 'product-1',
    name: '等级代练 1-100级',
    description: '专业代练团队，快速安全完成等级提升。全程直播可查，安全可靠。',
    price: 299,
    originalPrice: 399,
    type: '等级代练',
    difficulty: 'medium',
    estimatedDays: 3,
    playerId: 'user-1',
    playerName: '游戏达人小王',
    playerAvatar: mockUsers[0].avatar,
    playerRating: 4.9,
    salesCount: 156,
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=game%20character%20level%20progression%20from%201%20to%20100&image_size=landscape_16_9',
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=game%20experience%20bar%20full%20level%20up&image_size=landscape_16_9'
    ],
    tags: ['热门', '快速'],
    isOnline: true,
    createdAt: '2024-01-10'
  },
  {
    id: 'product-2',
    name: '装备强化 +15套装',
    description: '顶级装备强化服务，专业垫刀技术，成功率高。',
    price: 599,
    originalPrice: 799,
    type: '装备强化',
    difficulty: 'hard',
    estimatedDays: 5,
    playerId: 'user-2',
    playerName: '神武小王子',
    playerAvatar: mockUsers[1].avatar,
    playerRating: 4.8,
    salesCount: 89,
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=game%20equipment%20enhancement%20level%2015%20glowing&image_size=landscape_16_9'
    ],
    tags: ['精品', '高成功率'],
    isOnline: true,
    createdAt: '2024-01-08'
  },
  {
    id: 'product-3',
    name: '副本通关服务',
    description: '全副本通关代练，包括普通、困难、英雄模式。',
    price: 199,
    type: '副本代练',
    difficulty: 'easy',
    estimatedDays: 1,
    playerId: 'user-3',
    playerName: '代练大师',
    playerAvatar: mockUsers[2].avatar,
    playerRating: 4.7,
    salesCount: 234,
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=game%20dungeon%20boss%20defeat%20treasure%20loot&image_size=landscape_16_9'
    ],
    tags: ['高效'],
    isOnline: true,
    createdAt: '2024-01-05'
  },
  {
    id: 'product-4',
    name: '金币代刷 100万',
    description: '安全金币代刷，手工采集，不使用外挂。',
    price: 128,
    type: '资源代刷',
    difficulty: 'easy',
    estimatedDays: 2,
    playerId: 'user-1',
    playerName: '游戏达人小王',
    playerAvatar: mockUsers[0].avatar,
    playerRating: 4.9,
    salesCount: 456,
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=game%20gold%20coins%20pile%20treasure%20wealth&image_size=landscape_16_9'
    ],
    tags: ['热门', '安全'],
    isOnline: true,
    createdAt: '2024-01-03'
  },
  {
    id: 'product-5',
    name: '宠物养成 完美资质',
    description: '帮你培养完美资质宠物，技能搭配最优方案。',
    price: 358,
    originalPrice: 458,
    type: '宠物代练',
    difficulty: 'medium',
    estimatedDays: 4,
    playerId: 'user-2',
    playerName: '神武小王子',
    playerAvatar: mockUsers[1].avatar,
    playerRating: 4.8,
    salesCount: 67,
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=game%20pet%20companion%20cute%20powerful%20stats&image_size=landscape_16_9'
    ],
    tags: ['精品'],
    isOnline: true,
    createdAt: '2024-01-01'
  },
  {
    id: 'product-6',
    name: '日常任务托管',
    description: '每日任务、活动、副本全包，省心省力。',
    price: 50,
    type: '日常托管',
    difficulty: 'easy',
    estimatedDays: 7,
    playerId: 'user-3',
    playerName: '代练大师',
    playerAvatar: mockUsers[2].avatar,
    playerRating: 4.7,
    salesCount: 123,
    images: [
      'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=game%20daily%20quests%20checklist%20completed&image_size=landscape_16_9'
    ],
    tags: ['包月优惠'],
    isOnline: true,
    createdAt: '2023-12-28'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'order-1',
    customerId: 'user-4',
    customerName: '逍遥玩家',
    customerAvatar: mockUsers[3].avatar,
    playerId: 'user-1',
    playerName: '游戏达人小王',
    playerAvatar: mockUsers[0].avatar,
    items: [
      { id: 'item-1', productId: 'product-1', productName: '等级代练 1-100级', price: 299, quantity: 1 }
    ],
    totalPrice: 299,
    status: 'in_progress',
    createdAt: '2024-01-14T10:00:00Z',
    acceptedAt: '2024-01-14T10:30:00Z',
    dynamicIds: ['dynamic-1'],
    remarks: ''
  },
  {
    id: 'order-2',
    customerId: 'user-4',
    customerName: '逍遥玩家',
    customerAvatar: mockUsers[3].avatar,
    playerId: 'user-1',
    playerName: '游戏达人小王',
    playerAvatar: mockUsers[0].avatar,
    items: [
      { id: 'item-2', productId: 'product-4', productName: '金币代刷 100万', price: 128, quantity: 2 }
    ],
    totalPrice: 256,
    status: 'completed',
    createdAt: '2024-01-10T15:00:00Z',
    acceptedAt: '2024-01-10T15:30:00Z',
    completedAt: '2024-01-12T20:00:00Z',
    dynamicIds: ['dynamic-4'],
    remarks: '加急完成，非常满意！'
  },
  {
    id: 'order-3',
    customerId: 'user-4',
    customerName: '逍遥玩家',
    customerAvatar: mockUsers[3].avatar,
    playerId: 'user-2',
    playerName: '神武小王子',
    playerAvatar: mockUsers[1].avatar,
    items: [
      { id: 'item-3', productId: 'product-2', productName: '装备强化 +15套装', price: 599, quantity: 1 }
    ],
    totalPrice: 599,
    status: 'pending',
    createdAt: '2024-01-15T09:00:00Z',
    dynamicIds: [],
    remarks: ''
  }
];
