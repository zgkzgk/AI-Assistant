import { useState, useEffect } from 'react';
import { TrendingUp, Users, ShoppingBag, FileText, CheckCircle, XCircle, Edit2, Trash2, Eye } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import { useDynamicStore } from '../store/dynamicStore';
import { mockProducts, mockOrders, mockUsers } from '../data/mockData';

export default function Admin() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const { dynamics, approveDynamic, deleteDynamic } = useDynamicStore();

  useEffect(() => {
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const pendingDynamics = dynamics.filter(d => !d.isApproved);
  const approvedDynamics = dynamics.filter(d => d.isApproved);

  const stats = [
    { label: '待审核动态', value: pendingDynamics.length, icon: FileText, color: 'bg-yellow-100 text-yellow-600' },
    { label: '商品总数', value: mockProducts.length, icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
    { label: '订单总数', value: mockOrders.length, icon: FileText, color: 'bg-green-100 text-green-600' },
    { label: '用户总数', value: mockUsers.length, icon: Users, color: 'bg-purple-100 text-purple-600' },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN');
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">仪表盘</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-gray-500">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">待审核动态</h3>
        {pendingDynamics.length > 0 ? (
          <div className="space-y-4">
            {pendingDynamics.map((dynamic) => (
              <div key={dynamic.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src={dynamic.userAvatar}
                  alt={dynamic.userName}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{dynamic.userName}</span>
                    <span className="text-sm text-gray-400">{formatDate(dynamic.createdAt)}</span>
                  </div>
                  <p className="text-gray-600 mt-1 line-clamp-2">{dynamic.content}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => approveDynamic(dynamic.id)}
                    className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                    title="通过"
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteDynamic(dynamic.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    title="拒绝"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">暂无待审核动态</div>
        )}
      </div>
    </div>
  );

  const renderDynamics = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">动态管理</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">用户</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">内容</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">状态</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">创建时间</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dynamics.map((dynamic) => (
              <tr key={dynamic.id}>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={dynamic.userAvatar}
                      alt={dynamic.userName}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{dynamic.userName}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <p className="line-clamp-2 text-gray-600">{dynamic.content}</p>
                </td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    dynamic.isApproved ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {dynamic.isApproved ? '已通过' : '待审核'}
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-500 text-sm">
                  {formatDate(dynamic.createdAt)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-500" title="查看">
                      <Eye className="w-5 h-5" />
                    </button>
                    {!dynamic.isApproved && (
                      <button
                        onClick={() => approveDynamic(dynamic.id)}
                        className="p-2 text-gray-400 hover:text-green-500"
                        title="通过"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteDynamic(dynamic.id)}
                      className="p-2 text-gray-400 hover:text-red-500"
                      title="删除"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">商品管理</h2>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          添加商品
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">名称</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">价格</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">打手</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">销量</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">状态</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-4 font-medium">{product.name}</td>
                <td className="px-4 py-4 text-red-500">¥{product.price}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={product.playerAvatar}
                      alt={product.playerName}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{product.playerName}</span>
                  </div>
                </td>
                <td className="px-4 py-4">{product.salesCount}</td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.isOnline ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {product.isOnline ? '上架' : '下架'}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-500" title="编辑">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500" title="删除">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">订单管理</h2>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">订单号</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">客户</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">打手</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">金额</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">状态</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">创建时间</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-4 font-mono text-sm">{order.id}</td>
                <td className="px-4 py-4">{order.customerName}</td>
                <td className="px-4 py-4">{order.playerName}</td>
                <td className="px-4 py-4 text-red-500">¥{order.totalPrice}</td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                    order.status === 'in_progress' ? 'bg-purple-100 text-purple-600' :
                    order.status === 'completed' ? 'bg-green-100 text-green-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {order.status === 'pending' ? '待接单' :
                     order.status === 'in_progress' ? '进行中' :
                     order.status === 'completed' ? '已完成' : '已取消'}
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-500 text-sm">
                  {formatDate(order.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">用户管理</h2>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">用户</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">角色</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">邮箱</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">完成订单</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">认证状态</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">注册时间</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{user.username}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === 'admin' ? 'bg-red-100 text-red-600' :
                    user.role === 'player' ? 'bg-blue-100 text-blue-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {user.role === 'admin' ? '管理员' :
                     user.role === 'player' ? '打手' : '客户'}
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-500">{user.email}</td>
                <td className="px-4 py-4">{user.completedOrders}</td>
                <td className="px-4 py-4">
                  {user.isVerified ? (
                    <span className="text-green-500 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      已认证
                    </span>
                  ) : (
                    <span className="text-yellow-500">待认证</span>
                  )}
                </td>
                <td className="px-4 py-4 text-gray-500 text-sm">{user.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">系统设置</h2>
      
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">平台设置</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600">平台名称</span>
            <span className="font-medium">神武代练平台</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600">客服电话</span>
            <span className="font-medium">400-888-8888</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-gray-600">客服邮箱</span>
            <span className="font-medium">support@swdailian.com</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-gray-600">系统版本</span>
            <span className="font-medium">v1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return renderDashboard();
      case 'dynamics':
        return renderDynamics();
      case 'products':
        return renderProducts();
      case 'orders':
        return renderOrders();
      case 'users':
        return renderUsers();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
    </div>
  );
}
