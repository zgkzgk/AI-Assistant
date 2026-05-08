import { Gamepad2, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 className="w-8 h-8 text-amber-400" />
              <span className="text-xl font-bold">神武代练</span>
            </div>
            <p className="text-gray-400 mb-4">
              神武游戏代练平台，专业、安全、高效的游戏代练服务。我们致力于为玩家提供最优质的代练体验，让您轻松提升游戏实力。
            </p>
            <div className="flex items-center gap-4 text-gray-400">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                400-888-8888
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                support@swdailian.com
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">快速链接</h3>
            <ul className="space-y-2 text-gray-400">
              <li><button className="hover:text-amber-400 transition-colors">首页</button></li>
              <li><button className="hover:text-amber-400 transition-colors">商城</button></li>
              <li><button className="hover:text-amber-400 transition-colors">订单</button></li>
              <li><button className="hover:text-amber-400 transition-colors">动态</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">帮助中心</h3>
            <ul className="space-y-2 text-gray-400">
              <li><button className="hover:text-amber-400 transition-colors">常见问题</button></li>
              <li><button className="hover:text-amber-400 transition-colors">服务条款</button></li>
              <li><button className="hover:text-amber-400 transition-colors">隐私政策</button></li>
              <li><button className="hover:text-amber-400 transition-colors">联系我们</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 神武代练平台 版权所有
          </p>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <MapPin className="w-4 h-4" />
            北京市朝阳区游戏大厦
          </div>
        </div>
      </div>
    </footer>
  );
}
