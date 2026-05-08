import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight, CheckCircle, Clock2, AlertCircle } from 'lucide-react';
import { Order } from '../types';

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const navigate = useNavigate();

  const statusConfig = {
    pending: { label: '待接单', color: 'bg-yellow-100 text-yellow-600', icon: Clock2 },
    accepted: { label: '已接单', color: 'bg-blue-100 text-blue-600', icon: Clock },
    in_progress: { label: '进行中', color: 'bg-purple-100 text-purple-600', icon: Clock },
    completed: { label: '已完成', color: 'bg-green-100 text-green-600', icon: CheckCircle },
    cancelled: { label: '已取消', color: 'bg-gray-100 text-gray-600', icon: AlertCircle }
  };

  const status = statusConfig[order.status];
  const StatusIcon = status.icon;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => navigate(`/orders/${order.id}`)}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500">订单号: {order.id}</span>
          <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${status.color}`}>
            <StatusIcon className="w-4 h-4" />
            {status.label}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <span className="text-gray-800">{item.productName}</span>
              <span className="text-gray-600">x{item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src={order.playerAvatar}
              alt={order.playerName}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-gray-600">{order.playerName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-red-500">¥{order.totalPrice}</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {order.dynamicIds.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">最新动态更新</span>
              <span className="text-sm text-purple-600 font-medium">查看进度 →</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
