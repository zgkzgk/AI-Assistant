import { useState, useEffect } from 'react';
import { Upload, Image, Video } from 'lucide-react';
import DynamicCard from '../components/DynamicCard';
import { useDynamicStore } from '../store/dynamicStore';
import { mockDynamics } from '../data/mockData';

export default function Dynamics() {
  const { dynamics, addDynamic } = useDynamicStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (dynamics.length === 0) {
      mockDynamics.forEach(d => addDynamic(d));
    }
  }, [dynamics.length, addDynamic]);

  const approvedDynamics = dynamics.filter(d => d.isApproved);

  const handleSubmit = () => {
    if (!content.trim()) return;

    const newDynamic = {
      id: `dynamic-${Date.now()}`,
      userId: 'user-4',
      userName: '逍遥玩家',
      userAvatar: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=casual%20gamer%20avatar%20portrait%20young%20man%20relaxed%20style&image_size=square',
      content,
      images: [],
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
      isApproved: true
    };

    addDynamic(newDynamic);
    setContent('');
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">动态广场</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
          >
            <Upload className="w-5 h-5" />
            发布动态
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-amber-500 flex items-center justify-center text-white font-bold">
              用户
            </div>
            <div className="flex-1">
              <textarea
                placeholder="分享你的游戏经历..."
                className="w-full p-4 bg-gray-50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
                onClick={() => setShowCreateModal(true)}
              />
              <div className="flex items-center justify-end gap-4 mt-2">
                <button className="p-2 text-gray-400 hover:text-purple-500 transition-colors">
                  <Image className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-purple-500 transition-colors">
                  <Video className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {approvedDynamics.map((dynamic) => (
            <DynamicCard key={dynamic.id} dynamic={dynamic} />
          ))}
        </div>

        {approvedDynamics.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Image className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">暂无动态</h2>
            <p className="text-gray-500">快来发布第一条动态吧</p>
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">发布动态</h3>
            
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="分享你的游戏经历..."
              className="w-full p-4 bg-gray-50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
              rows={5}
            />
            
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-purple-500 transition-colors">
                  <Image className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-purple-500 transition-colors">
                  <Video className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!content.trim()}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    content.trim() ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  发布
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
