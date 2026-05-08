import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, TrendingUp, Clock, ArrowRight, Sparkles } from 'lucide-react';
import DynamicCard from '../components/DynamicCard';
import ProductCard from '../components/ProductCard';
import { useDynamicStore } from '../store/dynamicStore';
import { mockProducts, mockDynamics, mockUsers } from '../data/mockData';

export default function Home() {
  const navigate = useNavigate();
  const { dynamics, addDynamic } = useDynamicStore();
  const [showDynamics, setShowDynamics] = useState(false);

  useEffect(() => {
    if (dynamics.length === 0) {
      mockDynamics.forEach(d => addDynamic(d));
    }
    setTimeout(() => setShowDynamics(true), 100);
  }, [dynamics.length, addDynamic]);

  const topPlayers = mockUsers.filter(u => u.role === 'player').slice(0, 3);
  const trendingProducts = mockProducts.filter(p => p.tags.includes('热门')).slice(0, 4);
  const approvedDynamics = dynamics.filter(d => d.isApproved).slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-amber-50">
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-purple-700 to-amber-600 opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span className="text-white/90 text-sm">专业代练 · 安全可靠</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              神武游戏代练平台
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              连接专业打手与游戏玩家，打造透明化代练服务体验
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/products')}
                className="px-8 py-3 bg-amber-500 text-white rounded-full font-semibold hover:bg-amber-600 transition-all hover:scale-105 shadow-lg"
              >
                浏览代练服务
              </button>
              <button
                onClick={() => navigate('/dynamics')}
                className="px-8 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                查看打手动态
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">热门打手</h2>
              <p className="text-gray-500">专业认证，信誉保障</p>
            </div>
            <button className="flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium">
              查看更多 <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topPlayers.map((player) => (
              <div
                key={player.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => navigate(`/profile/${player.id}`)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={player.avatar}
                      alt={player.username}
                      className="w-16 h-16 rounded-full object-cover group-hover:scale-110 transition-transform"
                    />
                    {player.isVerified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-white fill-current" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{player.username}</h3>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm">{player.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-around py-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600">{player.completedOrders}</div>
                    <div className="text-xs text-gray-500">完成订单</div>
                  </div>
                  <div className="w-px bg-gray-200" />
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">{player.rating}</div>
                    <div className="text-xs text-gray-500">信誉评分</div>
                  </div>
                  <div className="w-px bg-gray-200" />
                  <div className="text-center">
                    <div className="text-xl font-bold text-amber-600">98%</div>
                    <div className="text-xs text-gray-500">好评率</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">动态广场</h2>
              <p className="text-gray-500">实时查看打手工作状态</p>
            </div>
            <button
              onClick={() => navigate('/dynamics')}
              className="flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium"
            >
              查看全部 <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {approvedDynamics.map((dynamic) => (
              <DynamicCard key={dynamic.id} dynamic={dynamic} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">热门代练服务</h2>
              <p className="text-gray-500">精选优质代练商品</p>
            </div>
            <button
              onClick={() => navigate('/products')}
              className="flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium"
            >
              更多商品 <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-purple-600 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">加入我们</h2>
          <p className="text-white/80 mb-8">
            成为专业打手，开启你的代练事业；或发布需求，找到最适合你的代练服务
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register?role=player')}
              className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition-all"
            >
              成为打手
            </button>
            <button
              onClick={() => navigate('/register?role=customer')}
              className="px-8 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              发布需求
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
