import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Alert, Snackbar } from '@mui/material';

export default function PythonPractice() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [codeSuggestions, setCodeSuggestions] = useState<string[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // 代码输入处理，添加代码提示功能
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    
    // 简单的代码提示功能
    const lines = newCode.split('\n');
    const lastLine = lines[lines.length - 1].trim();
    
    if (lastLine.startsWith('import ')) {
      setCodeSuggestions(['pandas as pd', 'numpy as np', 'matplotlib.pyplot as plt']);
    } else if (lastLine.includes('pd.')) {
      setCodeSuggestions(['DataFrame()', 'read_csv()', 'head()', 'describe()', 'groupby()']);
    } else if (lastLine.includes('np.')) {
      setCodeSuggestions(['array()', 'mean()', 'std()', 'median()', 'random.rand()']);
    } else if (lastLine.includes('print')) {
      setCodeSuggestions(['("hello")', '("world")', '(variable)', '("Value: ", variable)']);
    } else if (lastLine.includes('for')) {
      setCodeSuggestions(['i in range(10):', 'item in list:', 'key, value in dict.items():']);
    } else if (lastLine.includes('if')) {
      setCodeSuggestions(['condition:', 'x > 5:', 'x == 0:']);
    } else {
      setCodeSuggestions([]);
    }
    
    // 简单的语法错误检查
    let currentError = null;
    
    // 检查Python 2风格的print语句
    if (newCode.includes('print ') && !newCode.includes('print(')) {
      currentError = 'Python 3中print是函数，需要使用括号：print("hello")';
    }
    // 检查for循环缺少冒号
    else if (newCode.includes('for ') && !newCode.includes(':')) {
      currentError = 'for循环缺少冒号';
    }
    // 检查if语句缺少冒号
    else if (newCode.includes('if ') && !newCode.includes(':')) {
      currentError = 'if语句缺少冒号';
    }
    // 检查print函数缺少右括号
    else if (newCode.includes('print(') && !newCode.includes(')')) {
      currentError = 'print函数缺少右括号';
    }
    // 检查print函数缺少引号
    else if (newCode.includes('print(') && newCode.includes(')')) {
      const printContent = newCode.substring(newCode.indexOf('print(') + 6, newCode.indexOf(')'));
      if (!printContent.includes('"') && !printContent.includes("'")) {
        currentError = 'print函数缺少引号';
      }
    }
    
    setError(currentError);
  };

  // 运行代码
  const runCode = () => {
    setIsLoading(true);
    setOutput('');
    setError(null);
    
    // 模拟代码运行
    setTimeout(() => {
      // 检查代码是否正确
      if (code.trim() === '') {
        setError('代码不能为空');
        setOutput('请输入代码后再运行');
      } else if (code.includes('print ') && !code.includes('print(')) {
        // 检测Python 2风格的print语句
        setError('Python 3中print是函数，需要使用括号：print("hello")');
        setOutput('代码运行失败，请检查语法');
      } else if (code.includes('for') && !code.includes(':')) {
        // 检测for循环缺少冒号
        setError('for循环缺少冒号');
        setOutput('代码运行失败，请检查语法');
      } else if (code.includes('if') && !code.includes(':')) {
        // 检测if语句缺少冒号
        setError('if语句缺少冒号');
        setOutput('代码运行失败，请检查语法');
      } else if (code.includes('print(') && !code.includes(')')) {
        // 检测print函数缺少右括号
        setError('print函数缺少右括号');
        setOutput('代码运行失败，请检查语法');
      } else if (code.includes('print(') && code.includes(')')) {
        // 处理正确的print语句
        setOutput('代码运行成功！\n\n输出结果：\nHello, World!');
      } else if (code.includes('import pandas as pd') || code.includes('import numpy as np')) {
        // 处理数据分析相关代码
        setOutput('代码运行成功！\n\n模拟输出结果：\n- 数据处理完成\n- 分析结果已生成');
      } else {
        // 其他代码
        setOutput('代码运行成功！\n\n模拟输出结果：\n代码执行完成');
      }
      setIsLoading(false);
      setSnackbarOpen(true);
    }, 1500);
  };

  // 关闭提示
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" className="text-purple-700 font-bold mb-4">
                  代码编辑器
                </Typography>
                <div className="mb-4">
                  <div className="flex space-x-2 mb-2">
                    <Button 
                      size="small" 
                      variant="outlined" 
                      onClick={() => setCode(code + 'import pandas as pd\n')}
                      sx={{ borderColor: '#4c1d95', color: '#4c1d95' }}
                    >
                      导入pandas
                    </Button>
                    <Button 
                      size="small" 
                      variant="outlined" 
                      onClick={() => setCode(code + 'import numpy as np\n')}
                      sx={{ borderColor: '#4c1d95', color: '#4c1d95' }}
                    >
                      导入numpy
                    </Button>
                  </div>
                  
                  {/* 代码提示 */}
                  {codeSuggestions.length > 0 && (
                    <div className="mb-2 p-2 bg-purple-50 border border-purple-200 rounded-md">
                      <Typography variant="body2" className="text-purple-700 font-medium mb-1">
                        代码提示：
                      </Typography>
                      <div className="flex flex-wrap gap-2">
                        {codeSuggestions.map((suggestion, index) => (
                          <Button 
                            key={index}
                            size="small" 
                            variant="text" 
                            onClick={() => {
                              if (code.includes('import ')) {
                                setCode(code + suggestion);
                              } else {
                                setCode(code + suggestion);
                              }
                            }}
                            sx={{ color: '#4c1d95' }}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* 错误提示 */}
                  {error && (
                    <Alert severity="error" className="mb-2">
                      {error}
                    </Alert>
                  )}
                  
                  <textarea
                    value={code}
                    onChange={handleCodeChange}
                    className="w-full h-64 p-4 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm"
                    placeholder="在此编写代码..."
                  />
                </div>
                <Button 
                  variant="contained" 
                  onClick={runCode}
                  disabled={isLoading}
                  sx={{
                    backgroundColor: '#4c1d95',
                    '&:hover': {
                      backgroundColor: '#3c1a7d',
                    },
                  }}
                >
                  {isLoading ? '运行中...' : '运行代码'}
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" className="text-purple-700 font-bold mb-4">
                  运行结果
                </Typography>
                <div className="p-4 bg-gray-50 rounded-md min-h-[150px]">
                  <pre className="font-mono text-sm whitespace-pre-wrap">
                    {output || '运行代码查看结果...'}
                  </pre>
                </div>
              </CardContent>
            </Card>
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
      
      {/* 运行结果提示 */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={error ? 'error' : 'success'} 
          sx={{ width: '100%' }}
        >
          {error ? error : '代码运行成功！'}
        </Alert>
      </Snackbar>
    </div>
  );
}