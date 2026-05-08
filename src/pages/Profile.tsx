import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User, Mail, Phone, Calendar, Star, Edit, Settings, ChevronRight, Upload, Image } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { useDynamicStore } from '../store/dynamicStore';
import { mockUsers } from '../data/mockData';
import DynamicCard from '../components/DynamicCard';

export default function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser, updateUser } = useUserStore();
  const { dynamics } = useDynamicStore();
  const [activeTab, setActiveTab] = useState('overview');

  const profileUser = id ? mockUsers.find(u => u.id === id) : currentUser;

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-lg mb-4">用户不存在</div>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-purple-600 text-white rounded-full"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const userDynamics = dynamics.filter(d => d.userId === profileUser.id);
  const isOwnProfile = !id || id === currentUser?.id;

  const roleLabels = {
    customer: '客户',
    player: '打手',
    admin: '管理员'
  };

  const stats = [
    { label: '完成订单', value: profileUser.completedOrders, color: 'text-purple-600' },
    { label: '信誉评分', value: profileUser.rating, color: 'text-green-600' },
    { label: '好评率', value: '98%', color: 'text-amber-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-purple-600 to-amber-500 rounded-2xl p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={profileUser.avatar}
                alt={profileUser.username}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white/30"
              />
              {profileUser.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                  <Star className="w-5 h-5 text-white fill-current" />
                </div>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-2xl font-bold">{profileUser.username}</h1>
                {isOwnProfile && (
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <Edit className="w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {roleLabels[profileUser.role]}
                </span>
                {profileUser.role === 'player' && (
                  <span className="text-sm text-white/80">
                    <Star className="w-4 h-4 inline fill-current" />
                    {profileUser.rating}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-4 text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'overview' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600'
            }`}
          >
            个人资料
          </button>
          <button
            onClick={() => setActiveTab('dynamics')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'dynamics' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600'
            }`}
          >
            我的动态 ({userDynamics.length})
          </button>
          {isOwnProfile && (
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === 'settings' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600'
              }`}
            >
              设置
            </button>
          )}
        </div>

        {activeTab === 'overview' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-4">基本信息</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-500">用户名</span>
                </div>
                <span className="font-medium">{profileUser.username}</span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-500">邮箱</span>
                </div>
                <span>{profileUser.email}</span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-500">手机号</span>
                </div>
                <span>{profileUser.phone}</span>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-500">注册时间</span>
                </div>
                <span>{profileUser.createdAt}</span>
              </div>
            </div>

            {profileUser.role === 'player' && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4">打手资质</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-green-600 font-bold mb-1">已认证</div>
                    <div className="text-sm text-gray-500">实名认证</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-blue-600 font-bold mb-1">专业</div>
                    <div className="text-sm text-gray-500">技能认证</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'dynamics' && (
          <div className="space-y-4">
            {userDynamics.length > 0 ? (
              userDynamics.map((dynamic) => (
                <DynamicCard key={dynamic.id} dynamic={dynamic} />
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">暂无动态</h3>
                <p className="text-gray-500 mb-4">快来发布第一条动态吧</p>
                {isOwnProfile && (
                  <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors mx-auto">
                    <Upload className="w-5 h-5" />
                    发布动态
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && isOwnProfile && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-6">账户设置</h2>
            
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Edit className="w-5 h-5 text-gray-400" />
                  <span>修改个人信息</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              
              <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-400" />
                  <span>账号安全</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              
              <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span>通知设置</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
