import { useNavigate } from 'react-router-dom';
import { Star, Clock, ShoppingCart, CheckCircle } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

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

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {product.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
        {product.isOnline && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
            <CheckCircle className="w-3 h-3" />
            在线
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-current" />
            <span className="text-sm font-medium">{product.playerRating}</span>
          </div>
          <span className="text-gray-400">|</span>
          <span className="text-sm text-gray-500">{product.salesCount}单成交</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className={`px-2 py-1 text-xs rounded-full ${difficultyColors[product.difficulty]}`}>
            {difficultyLabels[product.difficulty]}
          </span>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Clock className="w-4 h-4" />
            <span>{product.estimatedDays}天完成</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <img
            src={product.playerAvatar}
            alt={product.playerName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm text-gray-600">{product.playerName}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-red-500">¥{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">¥{product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
