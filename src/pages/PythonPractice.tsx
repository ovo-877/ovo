import React, { useState } from 'react';

export default function PythonPractice() {
  const [activeTab, setActiveTab] = useState('basic');
  const [code, setCode] = useState('print("Hello, World!")');
  const [output, setOutput] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  // 基础语法练习题目
  const basicQuestions = [
    {
      question: 'Python中，以下哪个是正确的变量命名？',
      options: ['123abc', 'abc_123', 'abc-123', 'class'],
      correct: 1
    },
    {
      question: 'Python中，以下哪个语句用于导入模块？',
      options: ['import module', 'include module', 'require module', 'load module'],
      correct: 0
    },
    {
      question: 'Python中，以下哪个是列表的正确定义？',
      options: ['list = (1, 2, 3)', 'list = [1, 2, 3]', 'list = {1, 2, 3}', 'list = {"a": 1, "b": 2}'],
      correct: 1
    }
  ];

  // 函数设计练习
  const functionExercises = [
    {
      title: '计算两数之和',
      description: '编写一个函数add(a, b)，返回a和b的和。',
      example: 'add(3, 5) 应该返回 8',
      template: 'def add(a, b):\n    # 请在这里编写代码\n    pass'
    },
    {
      title: '判断奇偶性',
      description: '编写一个函数is_even(n)，如果n是偶数返回True，否则返回False。',
      example: 'is_even(4) 应该返回 True\nis_even(5) 应该返回 False',
      template: 'def is_even(n):\n    # 请在这里编写代码\n    pass'
    }
  ];

  // 调试练习
  const debugExercises = [
    {
      title: '修复循环问题',
      code: 'for i in range(5)\n    print(i)',
      issue: '缺少冒号',
      solution: 'for i in range(5):\n    print(i)'
    },
    {
      title: '修复变量名错误',
      code: 'my_var = 10\nprint(my_vr)',
      issue: '变量名拼写错误',
      solution: 'my_var = 10\nprint(my_var)'
    }
  ];

  // 模拟代码执行
  const runCode = () => {
    // 这里只是模拟执行，实际项目中需要后端支持
    setOutput('执行结果: Hello, World!');
  };

  // 提交答案
  const submitAnswer = (questionIndex: number, selectedOption: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selectedOption;
    setAnswers(newAnswers);
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
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            欢迎同学们！通过以下练习，你可以巩固Python基础语法知识，提升编程能力。
            请选择下方的练习类型开始学习。
          </p>
        </section>

        {/* 练习类型标签页 */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setActiveTab('basic')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${activeTab === 'basic' ? 'bg-pink-500 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-pink-100'}`}
            >
              基础语法练习
            </button>
            <button 
              onClick={() => setActiveTab('code')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${activeTab === 'code' ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-blue-100'}`}
            >
              代码编写练习
            </button>
            <button 
              onClick={() => setActiveTab('function')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${activeTab === 'function' ? 'bg-green-500 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-green-100'}`}
            >
              函数设计练习
            </button>
            <button 
              onClick={() => setActiveTab('debug')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${activeTab === 'debug' ? 'bg-purple-500 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-purple-100'}`}
            >
              调试练习
            </button>
          </div>
        </div>

        {/* 练习内容 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          {/* 基础语法练习 */}
          {activeTab === 'basic' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-pink-600">基础语法练习</h2>
              <div className="space-y-8">
                {basicQuestions.map((q, index) => (
                  <div key={index} className="border border-pink-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4">问题 {index + 1}</h3>
                    <p className="mb-4 text-gray-700">{q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center">
                          <input
                            type="radio"
                            id={`q${index}_opt${optIndex}`}
                            name={`q${index}`}
                            checked={answers[index] === optIndex}
                            onChange={() => submitAnswer(index, optIndex)}
                            className="mr-3"
                          />
                          <label htmlFor={`q${index}_opt${optIndex}`} className="text-gray-600">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                    {answers[index] !== undefined && (
                      <div className={`mt-4 p-3 rounded-lg ${answers[index] === q.correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {answers[index] === q.correct ? '回答正确！' : `回答错误，正确答案是：${q.options[q.correct]}`}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 代码编写练习 */}
          {activeTab === 'code' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-blue-600">代码编写练习</h2>
              <div className="space-y-6">
                <div className="border border-blue-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">在线代码编辑器</h3>
                  <p className="mb-4 text-gray-700">请在下方编写Python代码，然后点击运行查看结果。</p>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm mb-4"
                    placeholder="请输入Python代码..."
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={runCode}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      运行代码
                    </button>
                  </div>
                  {output && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg font-mono text-sm">
                      {output}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 函数设计练习 */}
          {activeTab === 'function' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-green-600">函数设计练习</h2>
              <div className="space-y-8">
                {functionExercises.map((exercise, index) => (
                  <div key={index} className="border border-green-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-2">练习 {index + 1}: {exercise.title}</h3>
                    <p className="mb-2 text-gray-700">{exercise.description}</p>
                    <p className="mb-4 text-gray-600 text-sm bg-gray-50 p-2 rounded">
                      示例: {exercise.example}
                    </p>
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">代码模板:</h4>
                      <pre className="bg-gray-100 p-3 rounded font-mono text-sm">{exercise.template}</pre>
                    </div>
                    <textarea
                      placeholder="请在此编写函数代码..."
                      className="w-full h-40 p-4 border border-gray-300 rounded-lg font-mono text-sm mb-4"
                    />
                    <div className="flex justify-end">
                      <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                        提交代码
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 调试练习 */}
          {activeTab === 'debug' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-purple-600">调试练习</h2>
              <div className="space-y-8">
                {debugExercises.map((exercise, index) => (
                  <div key={index} className="border border-purple-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4">练习 {index + 1}: {exercise.title}</h3>
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">有问题的代码:</h4>
                      <pre className="bg-red-50 p-3 rounded font-mono text-sm border border-red-200">{exercise.code}</pre>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">问题:</h4>
                      <p className="text-gray-700">{exercise.issue}</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">修复后的代码:</h4>
                      <pre className="bg-green-50 p-3 rounded font-mono text-sm border border-green-200">{exercise.solution}</pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 轻松熊装饰元素 */}
        <div className="fixed bottom-8 right-8 z-10">
          <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
            <span className="text-4xl">🧸</span>
          </div>
        </div>
        
        <div className="fixed top-20 left-8 z-10 hidden md:block">
          <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
            <span className="text-2xl">🐍</span>
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