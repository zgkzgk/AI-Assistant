import { useState } from 'react';
import { Heart, MessageCircle, Send, ThumbsUp } from 'lucide-react';
import { Dynamic, Comment } from '../types';
import { useDynamicStore } from '../store/dynamicStore';

interface DynamicCardProps {
  dynamic: Dynamic;
  showOrderLink?: boolean;
}

export default function DynamicCard({ dynamic, showOrderLink = false }: DynamicCardProps) {
  const { likeDynamic, addComment } = useDynamicStore();
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      likeDynamic(dynamic.id);
      setLiked(true);
    }
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      userId: 'user-4',
      userName: '逍遥玩家',
      content: commentText,
      createdAt: new Date().toISOString()
    };
    
    addComment(dynamic.id, newComment);
    setCommentText('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (hours < 1) return '刚刚';
    if (hours < 24) return `${hours}小时前`;
    if (days < 30) return `${days}天前`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <img
            src={dynamic.userAvatar}
            alt={dynamic.userName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800">{dynamic.userName}</h4>
            <p className="text-sm text-gray-500">{formatDate(dynamic.createdAt)}</p>
          </div>
          {showOrderLink && dynamic.orderId && (
            <button className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm hover:bg-purple-200 transition-colors">
              查看订单
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-800 mb-4 leading-relaxed">{dynamic.content}</p>
        
        {dynamic.images.length > 0 && (
          <div className={`grid gap-2 mb-4 ${dynamic.images.length === 1 ? 'grid-cols-1' : dynamic.images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {dynamic.images.map((img, index) => (
              <div
                key={index}
                className={`relative rounded-xl overflow-hidden ${dynamic.images.length === 1 ? 'h-64' : 'h-32'}`}
              >
                <img
                  src={img}
                  alt={`动态图片 ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center gap-6 mb-3">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 transition-colors ${liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
            <span className="text-sm">{dynamic.likes + (liked ? 1 : 0)}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">{dynamic.comments.length}</span>
          </button>
        </div>

        {showComments && dynamic.comments.length > 0 && (
          <div className="space-y-3 mb-3">
            {dynamic.comments.map((comment) => (
              <div key={comment.id} className="flex gap-2">
                <span className="font-medium text-purple-600">{comment.userName}:</span>
                <span className="text-gray-700">{comment.content}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="发表评论..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            onKeyPress={(e) => e.key === 'Enter' && handleComment()}
          />
          <button
            onClick={handleComment}
            className="p-2 text-gray-500 hover:text-purple-500 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
