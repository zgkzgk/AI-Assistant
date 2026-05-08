import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, MessageSquare, Phone, Star, ChevronRight } from 'lucide-react';
import DynamicCard from '../components/DynamicCard';
import { useOrderStore } from '../store/orderStore';
import { useDynamicStore } from '../store/dynamicStore';
import { useUserStore } from '../store/userStore';
import { useOrderStore as OrderStore } from '../store/orderStore';

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useOrderStore();
  const { dynamics } = useDynamicStore();
  const { currentUser } = useUserStore();

  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-lg mb-4">订单不存在</div>
          <button
            onClick={() => navigate('/orders')}
            className="px-6 py-2 bg-purple-600 text-white rounded-full"
          >
            返回订单列表
          </button>
        </div>
      </div>
    );
  }

  const orderDynamics = dynamics.filter(d => d.orderId === order.id);

  const statusConfig = {
    pending: { label: '待接单', color: 'bg-yellow-100 text-yellow-600' },
    accepted: { label: '已接单', color: 'bg-blue-100 text-blue-600' },
    in_progress: { label: '进行中', color: 'bg-purple-100 text-purple-600' },
    completed: { label: '已完成', color: 'bg-green-100 text-green-600' },
    cancelled: { label: '已取消', color: 'bg-gray-100 text-gray-600' }
  };

  const status = statusConfig[order.status];

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAcceptOrder = () => {
    if (currentUser?.role === 'player' && order.playerId === currentUser.id) {
      updateOrderStatus(order.id, 'in_progress');
    }
  };

  const handleCompleteOrder = () => {
    if (currentUser?.role === 'player' && order.playerId === currentUser.id) {
      updateOrderStatus(order.id, 'completed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/orders')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">订单详情</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-gray-500">订单号:</span>
              <span className="ml-2 font-medium">{order.id}</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${status.color}`}>
              {status.label}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">客户信息</h3>
              <div className="flex items-center gap-4">
                <img
                  src={order.customerAvatar}
                  alt={order.customerName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">{order.customerName}</div>
                  <div className="text-sm text-gray-500">{order.customerId}</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">打手信息</h3>
              <div className="flex items-center gap-4">
                <img
                  src={order.playerAvatar}
                  alt={order.playerName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">{order.playerName}</div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="text-sm">4.9</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">订单商品</h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <span>{item.productName}</span>
                <div className="flex items-center gap-4">
                  <span className="text-gray-500">x{item.quantity}</span>
                  <span className="font-medium">¥{item.price}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
            <div className="text-right">
              <div className="text-gray-500">订单总价</div>
              <div className="text-2xl font-bold text-red-500">¥{order.totalPrice}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">时间线</h3>
          <div className="relative pl-6">
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200" />
            
            <div className="relative mb-6">
              <div className="absolute -left-5 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
              <div className="text-gray-600">订单创建</div>
              <div className="text-sm text-gray-400">{formatDate(order.createdAt)}</div>
            </div>

            {order.acceptedAt && (
              <div className="relative mb-6">
                <div className="absolute -left-5 w-5 h-5 bg-blue-500 rounded-full border-2 border-white" />
                <div className="text-gray-600">打手接单</div>
                <div className="text-sm text-gray-400">{formatDate(order.acceptedAt)}</div>
              </div>
            )}

            {order.completedAt && (
              <div className="relative">
                <div className="absolute -left-5 w-5 h-5 bg-purple-500 rounded-full border-2 border-white" />
                <div className="text-gray-600">订单完成</div>
                <div className="text-sm text-gray-400">{formatDate(order.completedAt)}</div>
              </div>
            )}
          </div>
        </div>

        {orderDynamics.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="font-semibold text-gray-800 mb-4">工作动态</h3>
            <div className="space-y-4">
              {orderDynamics.map((dynamic) => (
                <DynamicCard key={dynamic.id} dynamic={dynamic} showOrderLink={false} />
              ))}
            </div>
          </div>
        )}

        {order.remarks && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">备注信息</h3>
            <p className="text-gray-600">{order.remarks}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-4">操作</h3>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <MessageSquare className="w-5 h-5" />
              联系对方
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Phone className="w-5 h-5" />
              拨打电话
            </button>
            
            {currentUser?.role === 'player' && order.playerId === currentUser.id && order.status === 'pending' && (
              <button
                onClick={handleAcceptOrder}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <CheckCircle className="w-5 h-5" />
                接单
              </button>
            )}
            
            {currentUser?.role === 'player' && order.playerId === currentUser.id && order.status === 'in_progress' && (
              <button
                onClick={handleCompleteOrder}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <CheckCircle className="w-5 h-5" />
                完成订单
              </button>
            )}

            {currentUser?.role === 'customer' && order.status === 'completed' && (
              <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
                <Star className="w-5 h-5" />
                评价打手
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
