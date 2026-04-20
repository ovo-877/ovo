import React, { useState } from 'react';

export default function PythonPractice() {
  const [activeTab, setActiveTab] = useState('basic');
  const [code, setCode] = useState('print("Hello, World!")');
  const [output, setOutput] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  // 基础语法练习题目 - 按类别组织
  const basicQuestions = {
    // 1. 变量与数据类型
    variables: [
      {
        question: 'Python中，以下哪个是正确的变量命名？',
        options: ['123abc', 'abc_123', 'abc-123', 'class'],
        correct: 1
      },
      {
        question: 'Python中，以下哪个不是基本数据类型？',
        options: ['int', 'float', 'string', 'array'],
        correct: 3
      },
      {
        question: '将字符串"123"转换为整数的正确方法是？',
        options: ['int("123")', 'str("123")', 'float("123")', 'bool("123")'],
        correct: 0
      },
      {
        question: 'Python中，以下哪个是布尔类型的正确值？',
        options: ['true', 'false', 'True', 'FALSE'],
        correct: 2
      },
      {
        question: '以下哪种数据类型是不可变的？',
        options: ['列表', '字典', '字符串', '集合'],
        correct: 2
      }
    ],
    // 2. 运算符与表达式
    operators: [
      {
        question: 'Python中，以下哪个是取模运算符？',
        options: ['+', '-', '*', '%'],
        correct: 3
      },
      {
        question: '表达式 3 ** 2 的结果是？',
        options: ['5', '6', '9', '8'],
        correct: 2
      },
      {
        question: '逻辑运算符 not 的优先级高于 and 和 or？',
        options: ['是', '否', '不确定', '取决于具体情况'],
        correct: 0
      },
      {
        question: '表达式 10 // 3 的结果是？',
        options: ['3', '3.333', '4', '3.0'],
        correct: 0
      },
      {
        question: '以下哪个运算符用于成员测试？',
        options: ['in', 'is', '==', '!='],
        correct: 0
      }
    ],
    // 3. 控制流
    controlFlow: [
      {
        question: 'Python中，if语句的正确语法是？',
        options: ['if condition:', 'if condition then:', 'if (condition):', 'if condition {'],
        correct: 0
      },
      {
        question: '以下哪个语句用于跳出循环？',
        options: ['continue', 'break', 'pass', 'exit'],
        correct: 1
      },
      {
        question: 'Python中，for循环可以遍历以下哪种数据结构？',
        options: ['列表', '元组', '字典', '以上都是'],
        correct: 3
      },
      {
        question: '以下哪个语句用于跳过当前循环的剩余部分，继续下一次循环？',
        options: ['break', 'continue', 'pass', 'skip'],
        correct: 1
      },
      {
        question: 'Python中，while循环的循环条件是什么类型？',
        options: ['整数', '字符串', '布尔值', '任意类型'],
        correct: 2
      }
    ],
    // 4. 函数
    functions: [
      {
        question: 'Python中，定义函数的关键字是？',
        options: ['function', 'def', 'func', 'define'],
        correct: 1
      },
      {
        question: '函数默认参数应该放在参数列表的？',
        options: ['最前面', '中间', '最后面', '任意位置'],
        correct: 2
      },
      {
        question: 'lambda函数的特点是？',
        options: ['只能有一个表达式', '可以有多个语句', '必须有返回值', '不能接受参数'],
        correct: 0
      },
      {
        question: 'Python中，函数可以返回多个值吗？',
        options: ['可以，返回一个元组', '可以，返回一个列表', '不可以', '只能返回一个值'],
        correct: 0
      },
      {
        question: '以下哪个参数类型允许函数接受任意数量的位置参数？',
        options: ['默认参数', '关键字参数', '*args', '**kwargs'],
        correct: 2
      }
    ],
    // 5. 数据结构
    dataStructures: [
      {
        question: 'Python中，以下哪个是列表的正确定义？',
        options: ['list = (1, 2, 3)', 'list = [1, 2, 3]', 'list = {1, 2, 3}', 'list = {"a": 1, "b": 2}'],
        correct: 1
      },
      {
        question: '字典的键必须是？',
        options: ['可变类型', '不可变类型', '数字类型', '字符串类型'],
        correct: 1
      },
      {
        question: '以下哪个数据结构是不可变的？',
        options: ['列表', '元组', '字典', '集合'],
        correct: 1
      },
      {
        question: '以下哪个方法用于向列表末尾添加元素？',
        options: ['append()', 'extend()', 'insert()', 'add()'],
        correct: 0
      },
      {
        question: '以下哪个数据结构中的元素是唯一的？',
        options: ['列表', '元组', '字典', '集合'],
        correct: 3
      }
    ],
    // 6. 面向对象编程基础
    oop: [
      {
        question: 'Python中，定义类的关键字是？',
        options: ['class', 'def', 'object', 'type'],
        correct: 0
      },
      {
        question: '类的构造方法是？',
        options: ['__init__', '__construct__', 'initialize', 'init'],
        correct: 0
      },
      {
        question: 'Python支持多重继承吗？',
        options: ['是', '否', '仅支持两层', '取决于Python版本'],
        correct: 0
      },
      {
        question: 'Python中，类方法的第一个参数通常命名为？',
        options: ['self', 'this', 'cls', 'instance'],
        correct: 0
      },
      {
        question: '以下哪个方法用于获取对象的字符串表示？',
        options: ['__str__', '__repr__', '__unicode__', '__string__'],
        correct: 0
      }
    ],
    // 7. 模块与包
    modules: [
      {
        question: 'Python中，以下哪个语句用于导入模块？',
        options: ['import module', 'include module', 'require module', 'load module'],
        correct: 0
      },
      {
        question: '从模块中导入特定函数的语法是？',
        options: ['import func from module', 'from module import func', 'import module.func', 'module.import func'],
        correct: 1
      },
      {
        question: 'Python的标准库不包括以下哪个模块？',
        options: ['os', 'sys', 'math', 'numpy'],
        correct: 3
      },
      {
        question: '以下哪个语句用于导入模块的所有内容？',
        options: ['import * from module', 'from module import *', 'import module.*', 'module.import *'],
        correct: 1
      },
      {
        question: 'Python中，包是？',
        options: ['包含__init__.py文件的目录', '单个Python文件', '可执行文件', '配置文件'],
        correct: 0
      }
    ],
    // 8. 文件操作
    fileOperations: [
      {
        question: 'Python中，打开文件的函数是？',
        options: ['open()', 'file()', 'read()', 'write()'],
        correct: 0
      },
      {
        question: '以写入模式打开文件的模式参数是？',
        options: ['r', 'w', 'a', 'b'],
        correct: 1
      },
      {
        question: '使用with语句打开文件的好处是？',
        options: ['代码更简洁', '自动处理异常', '自动关闭文件', '以上都是'],
        correct: 3
      },
      {
        question: '以追加模式打开文件的模式参数是？',
        options: ['r', 'w', 'a', 'x'],
        correct: 2
      },
      {
        question: '以下哪个方法用于读取文件的所有内容？',
        options: ['read()', 'readline()', 'readlines()', 'readall()'],
        correct: 0
      }
    ],
    // 9. 异常处理
    exceptions: [
      {
        question: 'Python中，捕获异常的关键字是？',
        options: ['try', 'except', 'catch', 'finally'],
        correct: 1
      },
      {
        question: '以下哪个不是Python的内置异常？',
        options: ['ValueError', 'TypeError', 'FileNotFoundError', 'CustomError'],
        correct: 3
      },
      {
        question: 'finally语句的执行时机是？',
        options: ['仅当没有异常时', '仅当有异常时', '无论是否有异常', '仅当异常未被捕获时'],
        correct: 2
      },
      {
        question: 'Python中，抛出异常的关键字是？',
        options: ['throw', 'raise', 'except', 'error'],
        correct: 1
      },
      {
        question: '以下哪个异常是当操作或函数应用于不适当类型的对象时引发的？',
        options: ['ValueError', 'TypeError', 'NameError', 'SyntaxError'],
        correct: 1
      }
    ]
  };

  const [activeCategory, setActiveCategory] = useState('variables');

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
            Python基础实战训练营
          </h1>
          <p className="text-xl text-blue-600 mb-8">
            广东科学技术职业学院商学院
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            10个精选实战项目，从入门到进阶，完全在浏览器中运行代码，让你从零开始掌握Python核心技能
          </p>
          
          {/* 特色标签 */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center">
              <span className="text-pink-500 mr-2">📚</span>
              <span className="text-gray-700">基础语法</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center">
              <span className="text-blue-500 mr-2">💻</span>
              <span className="text-gray-700">实时运行代码</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center">
              <span className="text-green-500 mr-2">📈</span>
              <span className="text-gray-700">循序渐进</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center">
              <span className="text-purple-500 mr-2">🎯</span>
              <span className="text-gray-700">实战项目</span>
            </div>
          </div>
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
              onClick={() => setActiveTab('project')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${activeTab === 'project' ? 'bg-orange-500 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-orange-100'}`}
            >
              项目练习
            </button>
          </div>
        </div>

        {/* 练习内容 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          {/* 基础语法练习 */}
          {activeTab === 'basic' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-pink-600">基础语法练习</h2>
              
              {/* 分类选择 */}
              <div className="mb-8 overflow-x-auto">
                <div className="flex space-x-3 pb-2">
                  <button 
                    onClick={() => setActiveCategory('variables')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === 'variables' ? 'bg-pink-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-pink-100 border border-pink-200'}`}
                  >
                    变量与数据类型
                  </button>
                  <button 
                    onClick={() => setActiveCategory('operators')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === 'operators' ? 'bg-pink-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-pink-100 border border-pink-200'}`}
                  >
                    运算符与表达式
                  </button>
                  <button 
                    onClick={() => setActiveCategory('controlFlow')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === 'controlFlow' ? 'bg-pink-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-pink-100 border border-pink-200'}`}
                  >
                    控制流
                  </button>
                  <button 
                    onClick={() => setActiveCategory('functions')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === 'functions' ? 'bg-pink-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-pink-100 border border-pink-200'}`}
                  >
                    函数
                  </button>
                  <button 
                    onClick={() => setActiveCategory('dataStructures')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === 'dataStructures' ? 'bg-pink-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-pink-100 border border-pink-200'}`}
                  >
                    数据结构
                  </button>
                  <button 
                    onClick={() => setActiveCategory('oop')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === 'oop' ? 'bg-pink-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-pink-100 border border-pink-200'}`}
                  >
                    面向对象编程
                  </button>
                  <button 
                    onClick={() => setActiveCategory('modules')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === 'modules' ? 'bg-pink-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-pink-100 border border-pink-200'}`}
                  >
                    模块与包
                  </button>
                  <button 
                    onClick={() => setActiveCategory('fileOperations')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === 'fileOperations' ? 'bg-pink-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-pink-100 border border-pink-200'}`}
                  >
                    文件操作
                  </button>
                  <button 
                    onClick={() => setActiveCategory('exceptions')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === 'exceptions' ? 'bg-pink-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-pink-100 border border-pink-200'}`}
                  >
                    异常处理
                  </button>
                </div>
              </div>
              
              {/* 题目内容 */}
              <div className="space-y-8">
                {basicQuestions[activeCategory as keyof typeof basicQuestions].map((q, index) => (
                  <div key={index} className="border border-pink-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4">问题 {index + 1}</h3>
                    <p className="mb-4 text-gray-700">{q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center">
                          <input
                            type="radio"
                            id={`${activeCategory}_q${index}_opt${optIndex}`}
                            name={`${activeCategory}_q${index}`}
                            checked={answers[index] === optIndex}
                            onChange={() => submitAnswer(index, optIndex)}
                            className="mr-3"
                          />
                          <label htmlFor={`${activeCategory}_q${index}_opt${optIndex}`} className="text-gray-600">
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



          {/* 项目练习 */}
          {activeTab === 'project' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-orange-600">项目练习</h2>
              <div className="space-y-12">
                {/* 项目1: 计算器 */}
                <div className="border border-orange-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">项目 1: 简单计算器</h3>
                  <p className="mb-4 text-gray-700">
                    编写一个简单的计算器程序，能够实现基本的加减乘除运算。
                  </p>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">功能要求:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>接收用户输入的两个数字</li>
                      <li>接收用户选择的运算符</li>
                      <li>执行相应的运算并显示结果</li>
                      <li>处理除数为零的情况</li>
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">示例输入输出:</h4>
                    <pre className="bg-gray-100 p-3 rounded font-mono text-sm">
{`输入第一个数字: 10
输入运算符 (+, -, *, /): +
输入第二个数字: 5
结果: 15`}
                    </pre>
                  </div>
                  <textarea
                    placeholder="请在此编写计算器代码..."
                    className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm mb-4"
                  />
                  <div className="flex justify-end">
                    <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                      提交代码
                    </button>
                  </div>
                </div>

                {/* 项目2: 猜数字游戏 */}
                <div className="border border-orange-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">项目 2: 猜数字游戏</h3>
                  <p className="mb-4 text-gray-700">
                    编写一个猜数字游戏，程序随机生成一个1-100之间的数字，用户需要猜测这个数字。
                  </p>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">功能要求:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>随机生成一个1-100之间的数字</li>
                      <li>提示用户输入猜测的数字</li>
                      <li>告诉用户猜测的数字是偏大还是偏小</li>
                      <li>记录用户的猜测次数</li>
                      <li>当用户猜中时，显示恭喜信息和猜测次数</li>
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">示例运行过程:</h4>
                    <pre className="bg-gray-100 p-3 rounded font-mono text-sm">
{`我已经想好了一个1-100之间的数字，来猜猜看吧！
请输入你的猜测: 50
偏大了！
请输入你的猜测: 25
偏小了！
请输入你的猜测: 37
偏大了！
请输入你的猜测: 31
恭喜你猜中了！你用了4次猜测。`}
                    </pre>
                  </div>
                  <textarea
                    placeholder="请在此编写猜数字游戏代码..."
                    className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm mb-4"
                  />
                  <div className="flex justify-end">
                    <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                      提交代码
                    </button>
                  </div>
                </div>

                {/* 项目3: 学生成绩管理系统 */}
                <div className="border border-orange-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">项目 3: 学生成绩管理系统</h3>
                  <p className="mb-4 text-gray-700">
                    编写一个简单的学生成绩管理系统，能够添加学生信息和成绩，并计算平均分。
                  </p>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">功能要求:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>添加学生姓名和成绩</li>
                      <li>显示所有学生的信息</li>
                      <li>计算并显示所有学生的平均成绩</li>
                      <li>查找特定学生的成绩</li>
                    </ul>
                  </div>
                  <textarea
                    placeholder="请在此编写学生成绩管理系统代码..."
                    className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm mb-4"
                  />
                  <div className="flex justify-end">
                    <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                      提交代码
                    </button>
                  </div>
                </div>
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