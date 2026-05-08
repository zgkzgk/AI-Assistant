import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, Shield, CheckCircle, ShoppingCart, MessageSquare, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useCartStore } from '../store/cartStore';
import { mockProducts } from '../data/mockData';

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCartStore();
  const [activeImage, setActiveImage] = useState(0);

  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-lg mb-4">商品不存在</div>
          <button className="px-6 py-2 bg-purple-600 text-white rounded-full">
            返回商城
          </button>
        </div>
      </div>
    );
  }

  const relatedProducts = mockProducts.filter(p => p.type === product.type && p.id !== id).slice(0, 4);

  const difficultyColors = {
    easy: 'bg-green-100 text-green-600',
    medium: 'bg-yellow-100 text-yellow-600',
    hard: 'bg-red-100 text-red-600'
  };

  const difficultyLabels = {
    easy: '简单',
    medium: '中等',
    hard: '困难'
  };

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      activeImage === index ? 'border-purple-500' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-amber-400 fill-current" />
                    <span className="font-semibold">{product.playerRating}</span>
                    <span className="text-gray-400">({product.salesCount}条评价)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-red-500">¥{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">¥{product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <span className="px-2 py-1 bg-red-100 text-red-600 text-sm rounded-full">
                    省¥{product.originalPrice - product.price}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-600">预计 {product.estimatedDays} 天完成</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${difficultyColors[product.difficulty]}`}>
                    {difficultyLabels[product.difficulty]}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-2">服务保障</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">安全保障</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-600">准时交付</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3">服务介绍</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  加入购物车
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors">
                  立即购买
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">打手信息</h2>
            <button className="flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium">
              查看主页 <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-6">
            <img
              src={product.playerAvatar}
              alt={product.playerName}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 text-lg">{product.playerName}</h3>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span>{product.playerRating}</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">{product.salesCount}单成交</span>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-purple-600 text-purple-600 rounded-full hover:bg-purple-50 transition-colors">
              <MessageSquare className="w-5 h-5" />
              咨询
            </button>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">同类推荐</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
