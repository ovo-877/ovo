import React, { useState } from 'react';

export default function PythonPractice() {
  const [code, setCode] = useState('print("Hello, World!")');
  const [output, setOutput] = useState('');

  // 模拟代码执行
  const runCode = () => {
    // 这里只是模拟执行，实际项目中需要后端支持
    setOutput('执行结果: Hello, World!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 text-gray-800">
      {/* 顶部装饰 */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-pink-200 to-blue-200 rounded-b-3xl -z-10"></div>
      
      {/* 主内容 */}
      <div className="container mx-auto px-4 py-16">
        {/* 页面标题 */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-pink-600">
            Python基础练习
          </h1>
          <p className="text-xl text-blue-600 mb-8">
            广东科学技术职业学院商学院
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            在线编写并运行Python代码，提升编程实践能力！
          </p>
          
          {/* 特色标签 */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center">
              <span className="text-blue-500 mr-2">💻</span>
              <span className="text-gray-700">实时运行代码</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center">
              <span className="text-pink-500 mr-2">📚</span>
              <span className="text-gray-700">友好界面</span>
            </div>
          </div>
        </section>

        {/* 代码编辑器 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h2 className="text-2xl font-bold mb-6 text-blue-600">代码编辑器</h2>
          <div className="space-y-6">
            <div className="border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">在下方编写Python代码：</h3>
              <p className="mb-4 text-gray-700">您可以编写任意Python代码，然后点击运行按钮查看结果。</p>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm mb-4"
                placeholder="请输入Python代码..."
              />
              <div className="flex justify-end">
                <button 
                  onClick={runCode}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
                >
                  运行代码
                </button>
              </div>
              {output && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg font-mono text-sm border border-gray-300">
                  <p className="text-blue-600 font-bold mb-2">执行结果：</p>
                  <p>{output}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 轻松熊装饰元素 */}
        <div className="fixed bottom-8 right-8 z-10">
          <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
            <span className="text-4xl">🧸</span>
          </div>
        </div>
        
        <div className="fixed top-20 left-8 z-10 hidden md:block">
          <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
            <span className="text-2xl">💻</span>
          </div>
        </div>
      </div>
      
      {/* 底部 */}
      <footer className="bg-gradient-to-r from-pink-200 to-blue-200 py-6 rounded-t-3xl">
        <div className="container mx-auto px-4 text-center text-gray-700">
          <p>Python基础练习 © 2026</p>
        </div>
      </footer>
    </div>
  );
}