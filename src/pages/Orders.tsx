import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import OrderCard from '../components/OrderCard';
import { useOrderStore } from '../store/orderStore';
import { mockOrders } from '../data/mockData';

export default function Orders() {
  const navigate = useNavigate();
  const { orders, addOrder } = useOrderStore();
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (orders.length === 0) {
      mockOrders.forEach(o => addOrder(o));
    }
  }, [orders.length, addOrder]);

  const tabs = [
    { id: 'all', label: '全部', icon: Package },
    { id: 'pending', label: '待接单', icon: Clock },
    { id: 'in_progress', label: '进行中', icon: Clock },
    { id: 'completed', label: '已完成', icon: CheckCircle },
    { id: 'cancelled', label: '已取消', icon: AlertCircle },
  ];

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">我的订单</h1>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const count = tab.id === 'all' ? orders.length : orders.filter(o => o.status === tab.id).length;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
                {count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">暂无订单</h2>
            <p className="text-gray-500 mb-6">快去挑选心仪的代练服务吧</p>
            <button
              onClick={() => navigate('/products')}
              className="px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors"
            >
              去购物
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
