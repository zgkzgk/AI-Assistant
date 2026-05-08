import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Minus, Plus, CreditCard, Truck, Shield } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useOrderStore } from '../store/orderStore';
import { useUserStore } from '../store/userStore';

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, toggleSelect, selectAll, clearCart, getSelectedItems, getTotalPrice } = useCartStore();
  const { addOrder } = useOrderStore();
  const { currentUser, isLoggedIn } = useUserStore();
  const [remarks, setRemarks] = useState('');

  const selectedItems = getSelectedItems();
  const totalPrice = getTotalPrice();
  const allSelected = items.length > 0 && items.every(item => item.selected);

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (selectedItems.length === 0) return;

    const newOrder = {
      id: `order-${Date.now()}`,
      customerId: currentUser?.id || '',
      customerName: currentUser?.username || '',
      customerAvatar: currentUser?.avatar || '',
      playerId: selectedItems[0].product.playerId,
      playerName: selectedItems[0].product.playerName,
      playerAvatar: selectedItems[0].product.playerAvatar,
      items: selectedItems.map(item => ({
        id: `item-${Date.now()}-${item.id}`,
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      })),
      totalPrice,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      dynamicIds: [],
      remarks
    };

    addOrder(newOrder);
    clearCart();
    navigate('/orders');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">购物车是空的</h2>
            <p className="text-gray-500 mb-6">快去挑选心仪的代练服务吧</p>
            <button
              onClick={() => navigate('/products')}
              className="px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors"
            >
              去购物
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">购物车</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                <button
                  onClick={selectAll}
                  className={`w-5 h-5 rounded border-2 transition-colors ${
                    allSelected ? 'bg-purple-600 border-purple-600' : 'border-gray-300'
                  }`}
                />
                <span className="font-medium text-gray-800">全选</span>
                <span className="text-gray-500">({items.length}件商品)</span>
                <button
                  onClick={clearCart}
                  className="ml-auto text-gray-500 hover:text-red-500 text-sm"
                >
                  清空购物车
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex gap-4 p-4 rounded-xl transition-colors ${
                      item.selected ? 'bg-purple-50' : 'bg-gray-50'
                    }`}
                  >
                    <button
                      onClick={() => toggleSelect(item.id)}
                      className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-8 transition-colors ${
                        item.selected ? 'bg-purple-600 border-purple-600' : 'border-gray-300'
                      }`}
                    />
                    
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-800 mb-2 line-clamp-1">{item.product.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{item.product.playerName}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-red-500">¥{item.product.price}</span>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-1 min-w-[40px] text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="font-semibold text-gray-800 mb-4">结算信息</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>商品数量</span>
                  <span>{selectedItems.reduce((sum, item) => sum + item.quantity, 0)}件</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>商品总价</span>
                  <span>¥{totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>运费</span>
                  <span className="text-green-600">免运费</span>
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">应付金额</span>
                    <span className="text-xl font-bold text-red-500">¥{totalPrice}</span>
                  </div>
                </div>
              </div>

              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="备注信息（选填）"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                rows={3}
              />

              <button
                onClick={handleCheckout}
                disabled={selectedItems.length === 0}
                className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                  selectedItems.length > 0
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                结算 ({selectedItems.length}件)
              </button>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <CreditCard className="w-4 h-4" />
                  <span>安全支付</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Truck className="w-4 h-4" />
                  <span>准时交付</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Shield className="w-4 h-4" />
                  <span>平台保障</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
