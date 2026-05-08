import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Gamepad2 } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { useCartStore } from '../store/cartStore';

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, isLoggedIn, logout } = useUserStore();
  const { items } = useCartStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { label: '首页', path: '/' },
    { label: '商城', path: '/products' },
    { label: '订单', path: '/orders' },
    { label: '动态', path: '/dynamics' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900 via-purple-700 to-amber-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <Gamepad2 className="w-8 h-8 text-amber-400" />
            <span className="text-xl font-bold text-white">神武代练</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="text-white hover:text-amber-300 transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="搜索代练服务..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:bg-white/30"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5 text-white/60" />
              </button>
            </form>

            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 text-white hover:text-amber-300 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="text-white text-sm">{currentUser?.username}</span>
                <button
                  onClick={() => navigate('/profile')}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30"
                >
                  <img
                    src={currentUser?.avatar}
                    alt={currentUser?.username}
                    className="w-full h-full object-cover"
                  />
                </button>
                {currentUser?.role === 'admin' && (
                  <button
                    onClick={() => navigate('/admin')}
                    className="px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors text-sm"
                  >
                    管理后台
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="text-white/70 hover:text-white text-sm"
                >
                  退出
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
              >
                <User className="w-5 h-5" />
                登录
              </button>
            )}
          </div>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-purple-900/95 backdrop-blur-sm">
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-white hover:text-amber-300 py-2"
              >
                {item.label}
              </button>
            ))}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="搜索代练服务..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none"
              />
            </form>
            {isLoggedIn ? (
              <div className="flex items-center gap-3 pt-2">
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.username}
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-white">{currentUser?.username}</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate('/login');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 bg-amber-500 text-white rounded-full"
              >
                登录
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
