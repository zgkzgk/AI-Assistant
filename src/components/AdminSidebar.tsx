import { LayoutDashboard, Users, ShoppingBag, FileText, Image, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminSidebarProps {
  activeMenu: string;
  onMenuChange: (menu: string) => void;
}

export default function AdminSidebar({ activeMenu, onMenuChange }: AdminSidebarProps) {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: '仪表盘', icon: LayoutDashboard },
    { id: 'dynamics', label: '动态管理', icon: Image },
    { id: 'products', label: '商品管理', icon: ShoppingBag },
    { id: 'orders', label: '订单管理', icon: FileText },
    { id: 'users', label: '用户管理', icon: Users },
    { id: 'settings', label: '系统设置', icon: Settings },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-purple-900 to-purple-800 min-h-screen p-4">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
          <Settings className="w-6 h-6 text-white" />
        </div>
        <span className="text-white font-bold text-lg">管理后台</span>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onMenuChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeMenu === item.id
                  ? 'bg-purple-700 text-white'
                  : 'text-gray-300 hover:bg-purple-700/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-purple-700/50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>退出登录</span>
        </button>
      </div>
    </div>
  );
}
