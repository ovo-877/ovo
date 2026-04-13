import React from 'react';

export default function LearningSpace() {
  const courses = [
    {
      id: 1,
      name: 'Python基础',
      color: 'bg-pink-100 text-pink-600 border-pink-200',
      icon: '🐍',
      content: [
        'Python语法基础',
        '数据类型与操作',
        '控制流与函数',
        '面向对象编程',
        '模块与包管理'
      ]
    },
    {
      id: 2,
      name: '数据分析技术',
      color: 'bg-blue-100 text-blue-600 border-blue-200',
      icon: '📊',
      content: [
        '数据可视化',
        '统计分析方法',
        '数据挖掘基础',
        'Pandas库应用',
        'NumPy库应用'
      ]
    },
    {
      id: 3,
      name: '数据采集与处理',
      color: 'bg-green-100 text-green-600 border-green-200',
      icon: '🌐',
      content: [
        '网络爬虫技术',
        '数据清洗方法',
        '正则表达式应用',
        'API数据获取',
        '数据预处理技术'
      ]
    },
    {
      id: 4,
      name: '供应链数据分析',
      color: 'bg-purple-100 text-purple-600 border-purple-200',
      icon: '🚚',
      content: [
        '供应链管理基础',
        '库存数据分析',
        '物流成本分析',
        '供应链优化模型',
        '需求预测分析'
      ]
    },
    {
      id: 5,
      name: '数据库原理与应用',
      color: 'bg-yellow-100 text-yellow-600 border-yellow-200',
      icon: '🗄️',
      content: [
        '数据库基本概念',
        'SQL语言基础',
        '数据模型设计',
        '数据库管理',
        'NoSQL数据库简介'
      ]
    },
    {
      id: 6,
      name: '企业财务数据分析',
      color: 'bg-orange-100 text-orange-600 border-orange-200',
      icon: '💰',
      content: [
        '财务报表分析',
        '财务指标计算',
        '成本分析方法',
        '财务预测模型',
        '投资决策分析'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 text-gray-800">
      {/* 顶部装饰 */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-pink-200 to-blue-200 rounded-b-3xl -z-10"></div>
      
      {/* 主内容 */}
      <div className="container mx-auto px-4 py-16">
        {/* 页面标题 */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-pink-600">
            七七大王的学习空间
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-600">
            广东科学技术职业学院商学院
          </p>
          <p className="text-lg text-blue-500 mb-12">
            商务数据分析与应用专业
          </p>
        </section>

        {/* 课程列表 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-pink-600">
            专业课程
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div 
                key={course.id} 
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 ${course.color.split(' ')[2]}`}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-14 h-14 rounded-full ${course.color.split(' ')[0]} ${course.color.split(' ')[1]} flex items-center justify-center mr-4`}>
                    <span className="text-2xl">{course.icon}</span>
                  </div>
                  <h3 className={`text-xl font-bold ${course.color.split(' ')[1]}`}>{course.name}</h3>
                </div>
                <ul className="space-y-2">
                  {course.content.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-pink-400 mr-2">•</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 学习目标 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-pink-600">
            学习目标
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-pink-600 mb-2">掌握数据分析核心技能</h3>
                  <p className="text-gray-600">通过学习Python、数据分析技术等课程，掌握数据处理和分析的核心能力</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-600 mb-2">培养商务分析思维</h3>
                  <p className="text-gray-600">结合供应链和财务数据分析，培养从数据中提取商业价值的能力</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-600 mb-2">提升实践应用能力</h3>
                  <p className="text-gray-600">通过项目实践，将理论知识应用到实际商务场景中</p>
                </div>
              </div>
            </div>
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
            <span className="text-2xl">📚</span>
          </div>
        </div>
      </div>
      
      {/* 底部 */}
      <footer className="bg-gradient-to-r from-pink-200 to-blue-200 py-6 rounded-t-3xl">
        <div className="container mx-auto px-4 text-center text-gray-700">
          <p>七七大王的学习空间 © 2026</p>
        </div>
      </footer>
    </div>
  );
}