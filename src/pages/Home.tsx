import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 text-gray-800">
      {/* 顶部装饰 */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-pink-200 to-blue-200 rounded-b-3xl -z-10"></div>
      
      {/* 主内容 */}
      <div className="container mx-auto px-4 py-16">
        {/* 个人介绍 */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-pink-600">
            你好！我是七七大王
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-600">
            商务数据分析与应用专业的大学生
          </p>
          <div className="flex justify-center mb-12">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-300 to-blue-300 flex items-center justify-center shadow-lg">
              <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center">
                <span className="text-4xl font-bold text-pink-500">七七</span>
              </div>
            </div>
          </div>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            我喜欢可爱的风格，特别喜欢轻松熊IP，同时对AI编程充满热情。在课余时间，我喜欢打洛克王国和玩王者荣耀，享受游戏带来的乐趣。
          </p>
        </section>

        {/* 兴趣爱好 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-pink-600">
            兴趣爱好
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI编程 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-pink-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-xl text-blue-600">🤖</span>
                </div>
                <h3 className="text-xl font-bold text-blue-600">AI编程</h3>
              </div>
              <p className="text-gray-600">
                我对AI编程充满热情，喜欢探索人工智能的各种应用，包括机器学习、自然语言处理等领域。
              </p>
            </div>
            
            {/* 轻松熊 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mr-4">
                  <span className="text-xl text-pink-600">🧸</span>
                </div>
                <h3 className="text-xl font-bold text-pink-600">轻松熊</h3>
              </div>
              <p className="text-gray-600">
                我特别喜欢轻松熊IP，喜欢它可爱的形象和治愈的风格，生活中也会收集相关周边。
              </p>
            </div>
          </div>
        </section>

        {/* 游戏爱好 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-pink-600">
            游戏爱好
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 洛克王国 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-green-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <span className="text-xl text-green-600">🎮</span>
                </div>
                <h3 className="text-xl font-bold text-green-600">洛克王国</h3>
              </div>
              <p className="text-gray-600">
                我喜欢在课余时间打洛克王国，享受收集宠物和挑战关卡的乐趣。
              </p>
            </div>
            
            {/* 王者荣耀 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-purple-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                  <span className="text-xl text-purple-600">⚔️</span>
                </div>
                <h3 className="text-xl font-bold text-purple-600">王者荣耀</h3>
              </div>
              <p className="text-gray-600">
                我也喜欢玩王者荣耀，享受团队合作和竞技的乐趣。
              </p>
            </div>
          </div>
        </section>

        {/* 技能展示 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-pink-600">
            技能展示
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: '数据分析', icon: '📊', color: 'bg-blue-100 text-blue-600' },
              { name: '编程', icon: '💻', color: 'bg-green-100 text-green-600' },
              { name: 'AI技术', icon: '🤖', color: 'bg-purple-100 text-purple-600' },
              { name: '商务分析', icon: '📈', color: 'bg-pink-100 text-pink-600' },
            ].map((skill, index) => (
              <div key={index} className="bg-white rounded-xl p-4 text-center shadow hover:shadow-md transition-shadow">
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full ${skill.color} flex items-center justify-center`}>
                  <span className="text-2xl">{skill.icon}</span>
                </div>
                <p className="font-medium text-gray-700">{skill.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 轻松熊装饰元素 */}
        <div className="fixed bottom-8 right-8 z-10">
          <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
            <span className="text-4xl">🧸</span>
          </div>
        </div>
        
        <div className="fixed top-20 left-8 z-10 hidden md:block">
          <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
            <span className="text-2xl">🎀</span>
          </div>
        </div>
      </div>
      
      {/* 底部 */}
      <footer className="bg-gradient-to-r from-pink-200 to-blue-200 py-6 rounded-t-3xl">
        <div className="container mx-auto px-4 text-center text-gray-700">
          <p>七七大王的个人网页 © 2026</p>
        </div>
      </footer>
    </div>
  );
}