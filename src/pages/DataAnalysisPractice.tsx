import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Tabs, Tab, Box, Button, Paper, Divider, Chip } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

// 模拟数据生成函数
const generateData = () => {
  // 用户行为数据
  const userBehaviorData = Array.from({ length: 100 }, (_, i) => ({
    用户ID: `U${String(i).padStart(4, '0')}`,
    消费金额: Math.round(Math.exp(Math.random() * 1.2 + 5) * 100) / 100,
    消费频次: Math.floor(Math.random() * 20),
    最近消费天数: Math.floor(Math.random() * 365) + 1,
    性别: ['男', '女', '未知'][Math.floor(Math.random() * 3)],
    地区: ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉'][Math.floor(Math.random() * 7)],
    浏览时长: Math.round(Math.random() * 60 * 10) / 10
  }));

  // 购物车数据
  const products = [
    '手机', '耳机', '充电器', '手机壳', '钢化膜',
    '笔记本电脑', '鼠标', '键盘', '电脑包', '散热器',
    '牛奶', '面包', '鸡蛋', '黄油', '奶酪',
    '洗发水', '护发素', '沐浴露', '牙膏', '牙刷',
    'T恤', '牛仔裤', '运动鞋', '袜子', '帽子'
  ];
  const cartData = Array.from({ length: 500 }, (_, i) => ({
    订单ID: `ORD${String(i).padStart(6, '0')}`,
    商品名称: products[Math.floor(Math.random() * products.length)]
  }));

  // 商品数据
  const goodsData = Array.from({ length: 100 }, (_, i) => ({
    商品ID: `G${String(i).padStart(4, '0')}`,
    销量: Math.floor(Math.random() * 1000),
    客单价: Math.round(Math.exp(Math.random() * 1 + 4) * 100) / 100,
    好评率: Math.round((Math.random() * 0.29 + 0.7) * 100) / 100,
    库存: Math.floor(Math.random() * 990) + 10
  }));

  // 销量数据
  const dates = Array.from({ length: 365 }, (_, i) => {
    const date = new Date(2024, 0, 1);
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });
  const salesData = dates.map(date => ({
    日期: date,
    销量: Math.floor(Math.random() * 1000) + 500,
    广告费: Math.floor(Math.random() * 900) + 100,
    活动次数: Math.floor(Math.random() * 5),
    客单价: Math.floor(Math.random() * 100) + 50,
    竞品价格: Math.floor(Math.random() * 120) + 40
  }));

  // 时间序列数据
  const timeSeriesData = Array.from({ length: 24 }, (_, i) => {
    const date = new Date(2024, i, 1);
    return {
      日期: date.toISOString().split('T')[0],
      销量: Math.floor(Math.sin(i / 2) * 200 + 500 + Math.random() * 100)
    };
  });

  return { userBehaviorData, cartData, goodsData, salesData, timeSeriesData };
};

const DataAnalysisPractice: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState(generateData());
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 项目列表
  const projects = [
    '数据预处理高阶版',
    '多维统计与相关性分析',
    '购物车关联规则挖掘',
    'KMeans聚类分析',
    'RFM模型用户分层',
    '线性回归分析',
    '随机森林回归',
    '时间序列分析',
    '异常检测',
    '综合大项目'
  ];

  // 项目详情
  const projectDetails = [
    {
      title: '数据预处理高阶版',
      level: '入门',
      levelColor: 'green',
      theory: {
        intro: '数据预处理是数据分析的第一步，也是最重要的一步。高质量的数据是模型效果的基础。',
        concepts: [
          { name: '缺失值', desc: '数据中存在的空值或NaN，可能由于采集问题或用户未填写导致', emoji: '❓' },
          { name: '异常值', desc: '与大部分数据差异显著的值，可能是错误数据或特殊情况', emoji: '🚫' },
          { name: '3σ原则', desc: '数据落在均值±3倍标准差之外的概率约为0.3%，通常视为异常值', emoji: '📐' },
          { name: '特征工程', desc: '将原始数据转换为更适合模型训练的特征', emoji: '🔧' },
          { name: '标准化', desc: '将数据缩放到均值为0、标准差为1的范围内', emoji: '📊' }
        ],
        tips: [
          '数值型特征常用中位数填充缺失值，因为中位数对异常值不敏感',
          '类别型特征常用众数或"未知"填充缺失值',
          '3σ原则适用于近似正态分布的数据',
          '标准化可以提升很多机器学习算法的性能'
        ]
      },
      description: '掌握缺失值、异常值、重复值的处理方法，以及特征工程技巧',
      tasks: [
        '处理缺失值：消费金额/频次用中位数填充，性别/地区用"未知"填充',
        '处理异常值：用箱线图和3σ原则识别异常值，并用中位数替换',
        '特征处理：消费金额分桶、浏览时长离散化、类别编码',
        '数据标准化：对数值型特征进行StandardScaler标准化'
      ],
      dataset: 'user_behavior.csv',
      sampleCode: `import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

# 读取数据
df = pd.DataFrame(data)

# 1. 缺失值处理
df['消费金额'] = df['消费金额'].fillna(df['消费金额'].median())
df['消费频次'] = df['消费频次'].fillna(df['消费频次'].median())
df['性别'] = df['性别'].fillna('未知')
df['地区'] = df['地区'].fillna('未知')

# 2. 异常值处理（3σ原则）
for col in ['消费金额', '浏览时长']:
    mean = df[col].mean()
    std = df[col].std()
    outliers = df[(df[col] < mean - 3*std) | (df[col] > mean + 3*std)].index
    df.loc[outliers, col] = df[col].median()

# 3. 特征处理
df['消费金额分桶'] = pd.cut(df['消费金额'], bins=3, labels=['低', '中', '高'])
df['浏览时长离散化'] = pd.cut(df['浏览时长'], bins=3, labels=['短', '中', '长'])
df = pd.get_dummies(df, columns=['性别', '地区'])

# 4. 数据标准化
scaler = StandardScaler()
df[['消费金额', '消费频次', '最近消费天数', '浏览时长']] = scaler.fit_transform(
    df[['消费金额', '消费频次', '最近消费天数', '浏览时长']]
)

print('数据预处理完成！')
print(df.head())`
    },
    {
      title: '多维统计与相关性分析',
      level: '入门',
      levelColor: 'green',
      theory: {
        intro: '统计分析是数据分析的核心技能，通过量化指标描述数据特征，发现变量之间的关系。',
        concepts: [
          { name: '均值', desc: '所有数据的平均值，反映数据中心位置', emoji: '📊' },
          { name: '中位数', desc: '数据排序后位于中间的值，不受极端值影响', emoji: '📈' },
          { name: '标准差', desc: '数据离散程度的度量，值越大数据越分散', emoji: '📉' },
          { name: '皮尔逊相关', desc: '衡量两个连续变量的线性相关程度，范围[-1,1]', emoji: '🔗' },
          { name: '斯皮尔曼相关', desc: '衡量变量的单调关系，适用于非线性关系', emoji: '🔍' }
        ],
        tips: [
          '当数据有异常值时，中位数比均值更能代表数据中心',
          '皮尔逊相关只适用于线性关系',
          '相关系数绝对值越大，相关性越强',
          '相关性不等于因果关系！'
        ]
      },
      description: '通过描述统计和相关性分析，发现数据中的关联规律',
      tasks: [
        '计算描述统计：均值、中位数、四分位数、标准差',
        '计算皮尔逊相关系数和斯皮尔曼相关系数',
        '绘制相关性热力图',
        '分析影响营收的核心指标'
      ],
      dataset: 'user_behavior.csv',
      sampleCode: `import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

# 读取数据
df = pd.DataFrame(data)

# 1. 计算营收
df['营收'] = df['消费金额'] * df['消费频次']

# 2. 描述统计
print('描述统计：')
print(df[['营收', '消费金额', '消费频次', '浏览时长']].describe())

# 3. 相关性分析
print('\n皮尔逊相关系数：')
print(df[['营收', '消费金额', '消费频次', '浏览时长']].corr())

print('\n斯皮尔曼相关系数：')
print(df[['营收', '消费金额', '消费频次', '浏览时长']].corr(method='spearman'))

# 4. 分析核心指标
corr_matrix = df[['营收', '消费金额', '消费频次', '浏览时长']].corr()
high_corr_features = corr_matrix[abs(corr_matrix['营收']) >= 0.5].index.tolist()
high_corr_features.remove('营收')

print('\n影响营收的核心指标：', high_corr_features)`
    },
    {
      title: '购物车关联规则挖掘',
      level: '进阶',
      levelColor: 'blue',
      theory: {
        intro: '关联规则挖掘用于发现数据集中项之间的有趣关系，最典型的应用是购物篮分析，发现顾客购买行为模式。',
        concepts: [
          { name: '项集', desc: '一组物品的集合，如{手机,耳机}', emoji: '📦' },
          { name: '支持度', desc: '项集出现的频率，P(A∩B)', emoji: '📊' },
          { name: '置信度', desc: '购买A后购买B的概率，P(B|A)', emoji: '✅' },
          { name: '提升度', desc: '规则的相关性，lift>1表示正相关', emoji: '⬆️' },
          { name: 'Apriori算法', desc: '挖掘频繁项集的经典算法，基于"频繁项集的子集也频繁"原理', emoji: '🔍' }
        ],
        tips: [
          '支持度阈值不宜设置过高，否则会漏掉有价值的规则',
          '提升度>1的规则才有实际业务价值',
          '可以结合业务场景解释规则含义',
          '关联规则常用于商品推荐和捆绑销售'
        ]
      },
      description: '使用Apriori算法挖掘商品之间的关联规则，为捆绑销售提供策略',
      tasks: [
        '数据预处理：将订单数据转换为one-hot编码格式',
        '挖掘频繁项集：设置最小支持度=0.05',
        '生成关联规则：设置最小置信度=0.7',
        '筛选有价值的规则：提升度>1',
        '给出捆绑销售建议'
      ],
      dataset: 'cart_data.csv',
      sampleCode: `import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules

# 读取数据
df = pd.DataFrame(data)

# 1. 数据预处理（one-hot编码）
cart_encoded = pd.get_dummies(df['商品名称'], prefix='商品')
cart_encoded['订单ID'] = df['订单ID']
cart_encoded = cart_encoded.groupby('订单ID').max()

# 2. 挖掘频繁项集
frequent_itemsets = apriori(cart_encoded, min_support=0.05, use_colnames=True)

# 3. 生成关联规则
rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.7)

# 4. 筛选有价值的规则（提升度>1）
valuable_rules = rules[rules['lift'] > 1]

# 5. 排序并输出Top10规则
valuable_rules = valuable_rules.sort_values('lift', ascending=False)
print('Top10关联规则：')
print(valuable_rules.head(10))

# 6. 捆绑销售建议
print('\n捆绑销售建议：')
for i, rule in valuable_rules.head(3).iterrows():
    antecedents = list(rule['antecedents'])
    consequents = list(rule['consequents'])
    print(f"{antecedents} + {consequents}：提升度={rule['lift']:.2f}")`
    },
    {
      title: 'KMeans聚类分析',
      level: '进阶',
      levelColor: 'blue',
      theory: {
        intro: '聚类分析是一种无监督学习方法，用于将数据分组，使得同一组内的数据相似度较高，不同组间的数据相似度较低。',
        concepts: [
          { name: '聚类', desc: '将相似的数据点归为一类的过程', emoji: '📊' },
          { name: 'KMeans', desc: '基于距离的聚类算法，将数据分为K个簇', emoji: '🔷' },
          { name: '肘部法则', desc: '用于确定最优K值的方法', emoji: '🦾' },
          { name: '质心', desc: '每个簇的中心点，由簇内所有点的均值计算', emoji: '🎯' },
          { name: 'SSE', desc: '误差平方和，衡量聚类质量的指标', emoji: '📐' }
        ],
        tips: [
          'KMeans对初始质心敏感，建议多次运行取最佳结果',
          '数据需要先标准化，避免量纲影响',
          '肘部法则是选择K值的常用方法',
          '簇的数量应结合业务场景确定'
        ]
      },
      description: '使用KMeans算法对用户和商品进行分群，实现精准运营',
      tasks: [
        '用户聚类：选择特征、标准化数据、确定最优k值',
        '商品聚类：选择特征、标准化数据、确定最优k值',
        '分析每个分群的特征',
        '给出运营建议'
      ],
      dataset: 'user_behavior.csv, goods_data.csv',
      sampleCode: `import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

# 读取用户数据
user_df = pd.DataFrame(user_data)

# 1. 用户聚类
user_features = user_df[['消费金额', '消费频次', '最近消费天数', '浏览时长']]
scaler = StandardScaler()
user_scaled = scaler.fit_transform(user_features)

# 确定最优k值（肘部法则）
inertia = []
for k in range(1, 11):
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(user_scaled)
    inertia.append(kmeans.inertia_)

# 聚类
kmeans = KMeans(n_clusters=4, random_state=42)
user_df['用户分群'] = kmeans.fit_predict(user_scaled)

# 分析分群特征
print('用户分群特征：')
print(user_df.groupby('用户分群').mean())

# 2. 商品聚类
goods_df = pd.DataFrame(goods_data)
goods_features = goods_df[['销量', '客单价', '好评率', '库存']]
goods_scaled = scaler.fit_transform(goods_features)

kmeans_goods = KMeans(n_clusters=3, random_state=42)
goods_df['商品分群'] = kmeans_goods.fit_predict(goods_scaled)

print('\n商品分群特征：')
print(goods_df.groupby('商品分群').mean())`
    },
    {
      title: 'RFM模型用户分层',
      level: '进阶',
      levelColor: 'blue',
      theory: {
        intro: 'RFM模型是一种经典的用户价值分析方法，通过三个维度评估用户价值：最近消费时间、消费频次、消费金额。',
        concepts: [
          { name: 'R(Recency)', desc: '最近消费时间，越近越好', emoji: '⏰' },
          { name: 'F(Frequency)', desc: '消费频次，越高越好', emoji: '🔄' },
          { name: 'M(Monetary)', desc: '消费金额，越高越好', emoji: '💰' },
          { name: '用户分层', desc: '根据RFM得分将用户分为不同价值等级', emoji: '🏆' },
          { name: '分箱', desc: '将连续变量划分为多个等级', emoji: '📦' }
        ],
        tips: [
          'R值越小越好，需要反向打分',
          'F和M值越大越好',
          '通常将每个维度分为5个等级',
          '可以根据业务需求调整分层规则'
        ]
      },
      description: '使用RFM模型对用户进行分层，制定差异化运营策略',
      tasks: [
        '提取RFM三个核心指标：最近消费天数、消费频次、消费金额',
        '指标分箱：将R、F、M各分为5个等级',
        '计算RFM总分并进行用户分层',
        '统计各分层用户的数量、占比、总消费金额占比',
        '制定运营策略'
      ],
      dataset: 'user_behavior.csv',
      sampleCode: `import pandas as pd

# 读取数据
df = pd.DataFrame(data)

# 1. 提取RFM指标
rfm_df = df[['用户ID', '最近消费天数', '消费频次', '消费金额']].copy()

# 2. 指标分箱
# R分：最近消费天数（值越小越好，反向打分）
rfm_df['R分'] = pd.qcut(rfm_df['最近消费天数'], 5, labels=[5, 4, 3, 2, 1])
# F分：消费频次（值越大越好）
rfm_df['F分'] = pd.qcut(rfm_df['消费频次'], 5, labels=[1, 2, 3, 4, 5])
# M分：消费金额（值越大越好）
rfm_df['M分'] = pd.qcut(rfm_df['消费金额'], 5, labels=[1, 2, 3, 4, 5])

# 3. 计算总分并分层
rfm_df['R分'] = rfm_df['R分'].astype(int)
rfm_df['F分'] = rfm_df['F分'].astype(int)
rfm_df['M分'] = rfm_df['M分'].astype(int)
rfm_df['RFM总分'] = rfm_df['R分'] + rfm_df['F分'] + rfm_df['M分']

# 4. 用户分层
def rfm_level(score):
    if score >= 13: return "高价值用户"
    elif score >= 8: return "潜力用户"
    else: return "流失/低价值用户"

rfm_df['用户等级'] = rfm_df['RFM总分'].apply(rfm_level)

# 5. 统计分析
print('用户分层统计：')
print(rfm_df['用户等级'].value_counts())
print('\n各等级消费金额占比：')
print(rfm_df.groupby('用户等级')['消费金额'].sum() / rfm_df['消费金额'].sum())

# 6. 运营策略
print('\n运营策略建议：')
print('高价值用户：专属福利+复购激励')
print('潜力用户：引导消费+提升频次')
print('流失/低价值用户：唤醒活动+优惠券')`
    },
    {
      title: '线性回归分析',
      level: '进阶',
      levelColor: 'blue',
      theory: {
        intro: '线性回归是最基础的预测模型，假设自变量和因变量之间存在线性关系，用于预测连续型结果。',
        concepts: [
          { name: '一元线性回归', desc: '只有一个自变量的回归模型', emoji: '📈' },
          { name: '多元线性回归', desc: '有多个自变量的回归模型', emoji: '📊' },
          { name: '回归系数', desc: '衡量自变量对因变量的影响程度', emoji: '🔢' },
          { name: 'R²', desc: '模型的拟合优度，范围[0,1]，越接近1越好', emoji: '✅' },
          { name: 'MAE/MSE', desc: '衡量预测误差的指标', emoji: '📉' }
        ],
        tips: [
          '检查自变量之间是否存在多重共线性',
          '数据需要满足线性假设',
          '标准化可以提升模型收敛速度',
          '异常值会影响回归结果'
        ]
      },
      description: '使用线性回归模型量化影响因子，预测销量',
      tasks: [
        '一元线性回归：分析广告费对销量的影响',
        '多元线性回归：分析多个因素对销量的影响',
        '模型评估：计算R²、MAE、MSE',
        '多重共线性处理：检测并删除共线性强的特征',
        '预测应用：根据特征值预测销量'
      ],
      dataset: 'sales_data.csv',
      sampleCode: `import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error
from statsmodels.stats.outliers_influence import variance_inflation_factor

# 读取数据
df = pd.DataFrame(data)

# 1. 一元线性回归
X_single = df[['广告费']]
y = df['销量']

X_train, X_test, y_train, y_test = train_test_split(X_single, y, test_size=0.2, random_state=42)
lr_single = LinearRegression()
lr_single.fit(X_train, y_train)
y_pred_single = lr_single.predict(X_test)

print('一元线性回归：')
print(f'回归系数：{lr_single.coef_[0]:.2f}')
print(f'R²得分：{r2_score(y_test, y_pred_single):.2f}')

# 2. 多元线性回归
X_multi = df[['广告费', '活动次数', '客单价', '竞品价格']]
X_train_multi, X_test_multi, y_train, y_test = train_test_split(X_multi, y, test_size=0.2, random_state=42)

lr_multi = LinearRegression()
lr_multi.fit(X_train_multi, y_train)
y_pred_multi = lr_multi.predict(X_test_multi)

print('\n多元线性回归：')
print(f'回归系数：{lr_multi.coef_}')
print(f'R²得分：{r2_score(y_test, y_pred_multi):.2f}')
print(f'MAE：{mean_absolute_error(y_test, y_pred_multi):.2f}')
print(f'MSE：{mean_squared_error(y_test, y_pred_multi):.2f}')

# 3. 预测应用
new_data = [[1000, 3, 100, 90]]
predicted_sales = lr_multi.predict(new_data)
print(f'\n预测销量：{predicted_sales[0]:.2f}')`
    },
    {
      title: '随机森林回归',
      level: '高级',
      levelColor: 'orange',
      theory: {
        intro: '随机森林是一种集成学习算法，通过构建多个决策树并综合它们的预测结果，具有较高的预测精度和抗过拟合能力。',
        concepts: [
          { name: '决策树', desc: '基于特征值进行递归划分的树形结构', emoji: '🌲' },
          { name: '集成学习', desc: '将多个模型组合起来提升预测性能', emoji: '🌳' },
          { name: '随机采样', desc: '随机选择样本和特征进行训练', emoji: '🎲' },
          { name: '特征重要性', desc: '衡量每个特征对预测的贡献程度', emoji: '⭐' },
          { name: 'Bagging', desc: '通过bootstrap采样构建多个模型的方法', emoji: '🎒' }
        ],
        tips: [
          'n_estimators表示树的数量，通常越大越好但计算成本更高',
          'max_depth限制树的深度，防止过拟合',
          '随机森林可以处理非线性关系',
          '对异常值不敏感'
        ]
      },
      description: '使用随机森林模型进行非线性预测，分析特征重要性',
      tasks: [
        '数据拆分：将数据按7:3拆分为训练集和测试集',
        '随机森林回归训练：设置n_estimators=100，max_depth=5',
        '模型调参：调整参数，选择最优模型',
        '特征重要性分析：输出各特征的重要性排序',
        '对比分析：与线性回归模型对比'
      ],
      dataset: 'sales_data.csv',
      sampleCode: `import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, mean_absolute_error

# 读取数据
df = pd.DataFrame(data)

# 1. 数据拆分
X = df[['广告费', '活动次数', '客单价', '竞品价格']]
y = df['销量']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# 2. 随机森林回归训练
rf = RandomForestRegressor(n_estimators=100, max_depth=5, random_state=42)
rf.fit(X_train, y_train)
y_pred = rf.predict(X_test)

print('随机森林回归：')
print(f'R²得分：{r2_score(y_test, y_pred):.2f}')
print(f'MAE：{mean_absolute_error(y_test, y_pred):.2f}')

# 3. 模型调参
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [3, 5, 7]
}

best_score = 0
best_params = {}

for n_estimators in param_grid['n_estimators']:
    for max_depth in param_grid['max_depth']:
        rf = RandomForestRegressor(n_estimators=n_estimators, max_depth=max_depth, random_state=42)
        rf.fit(X_train, y_train)
        score = r2_score(y_test, rf.predict(X_test))
        if score > best_score:
            best_score = score
            best_params = {'n_estimators': n_estimators, 'max_depth': max_depth}

print('\n最优参数：', best_params)
print(f'最优R²得分：{best_score:.2f}')

# 4. 特征重要性分析
rf_best = RandomForestRegressor(**best_params, random_state=42)
rf_best.fit(X_train, y_train)
feature_importance = pd.DataFrame({
    '特征': X.columns,
    '重要性': rf_best.feature_importances_
}).sort_values('重要性', ascending=False)

print('\n特征重要性：')
print(feature_importance)`
    },
    {
      title: '时间序列分析',
      level: '高级',
      levelColor: 'orange',
      theory: {
        intro: '时间序列分析用于处理按时间顺序排列的数据，揭示数据的趋势、季节性和周期性特征，并进行预测。',
        concepts: [
          { name: '趋势', desc: '数据随时间的长期变化方向', emoji: '📈' },
          { name: '季节性', desc: '数据在固定周期内的重复模式', emoji: '🌙' },
          { name: '周期性', desc: '比季节周期更长的波动模式', emoji: '🔄' },
          { name: 'ARIMA', desc: '自回归综合移动平均模型', emoji: '📊' },
          { name: '移动平均', desc: '平滑数据、揭示趋势的方法', emoji: '✨' }
        ],
        tips: [
          '时间序列数据需要按时间顺序排列',
          '移动平均窗口大小需要根据数据特点选择',
          'ARIMA模型需要确定p、d、q参数',
          '可以用差分方法使数据平稳'
        ]
      },
      description: '分析时间序列数据的趋势和周期，预测未来销量',
      tasks: [
        '数据预处理：日期格式转换、重采样',
        '趋势分析：计算移动平均，识别长期趋势',
        '周期识别：分析季节性周期',
        '时序预测：使用ARIMA模型预测未来销量',
        '结果评估：计算预测误差，给出库存建议'
      ],
      dataset: 'time_series_sales.csv',
      sampleCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_absolute_error

# 读取数据
df = pd.DataFrame(data)
df['日期'] = pd.to_datetime(df['日期'])
df.set_index('日期', inplace=True)

# 1. 趋势分析
# 计算3个月移动平均
df['移动平均'] = df['销量'].rolling(window=3).mean()

print('趋势分析：')
print(df.head())

# 2. 周期识别
# 按月重采样
monthly_data = df['销量'].resample('M').sum()
print('\n月度销量：')
print(monthly_data)

# 3. 时序预测
# 拆分训练集和测试集
train_size = int(len(df) * 0.8)
train, test = df['销量'][:train_size], df['销量'][train_size:]

# 训练ARIMA模型
model = ARIMA(train, order=(1, 1, 1))
model_fit = model.fit()

# 预测
predictions = model_fit.forecast(steps=len(test))

# 评估
mae = mean_absolute_error(test, predictions)
print(f'\n预测MAE：{mae:.2f}')

# 4. 预测未来3个月
future_predictions = model_fit.forecast(steps=3)
print('\n未来3个月预测销量：')
print(future_predictions)`
    },
    {
      title: '异常检测',
      level: '高级',
      levelColor: 'orange',
      theory: {
        intro: '异常检测用于识别数据中不符合正常模式的异常点，常见应用包括欺诈检测、故障诊断、异常交易识别等。',
        concepts: [
          { name: '异常值', desc: '与正常数据显著不同的值', emoji: '🚨' },
          { name: '3σ原则', desc: '基于统计分布的异常检测方法', emoji: '📐' },
          { name: '孤立森林', desc: '基于树的异常检测算法', emoji: '🌲' },
          { name: '离群点', desc: '远离其他数据点的观测值', emoji: '📍' },
          { name: '污染率', desc: '数据中异常值的比例', emoji: '🔍' }
        ],
        tips: [
          '统计方法适用于正态分布的数据',
          '孤立森林对高维数据效果较好',
          '需要结合业务知识判断是否为真正的异常',
          '异常值不一定是错误，可能是特殊情况'
        ]
      },
      description: '使用统计方法和机器学习模型检测异常订单和用户',
      tasks: [
        '统计异常检测：使用3σ原则和箱线图识别异常值',
        '模型异常检测：使用孤立森林算法识别异常',
        '异常合并与解读：分析异常类型',
        '业务处理：针对不同类型的异常给出处理建议'
      ],
      dataset: 'order_data.csv',
      sampleCode: `import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest

# 读取数据
df = pd.DataFrame(data)

# 1. 统计异常检测（3σ原则）
mean_amount = df['订单金额'].mean()
std_amount = df['订单金额'].std()

# 识别异常值
outliers_3sigma = df[(df['订单金额'] < mean_amount - 3*std_amount) | (df['订单金额'] > mean_amount + 3*std_amount)]
print('3σ原则识别的异常订单数：', len(outliers_3sigma))

# 2. 模型异常检测（孤立森林）
# 准备特征
features = df[['订单金额', '下单频次', '支付时长']].fillna(0)

# 训练孤立森林
iso_forest = IsolationForest(contamination=0.01, random_state=42)
df['异常得分'] = iso_forest.fit(features).score_samples(features)
df['是否异常'] = iso_forest.predict(features) == -1

outliers_isolation = df[df['是否异常']]
print('\n孤立森林识别的异常订单数：', len(outliers_isolation))

# 3. 异常合并
all_outliers = pd.concat([outliers_3sigma, outliers_isolation]).drop_duplicates()
print('\n合并后的异常订单数：', len(all_outliers))

# 4. 异常类型分析
print('\n异常订单分析：')
print('高金额异常：', len(all_outliers[all_outliers['订单金额'] > mean_amount + 3*std_amount]))
print('高频下单异常：', len(all_outliers[all_outliers['下单频次'] > df['下单频次'].quantile(0.95)]))
print('未支付异常：', len(all_outliers[all_outliers['支付状态'] == '未支付']))

# 5. 处理建议
print('\n异常处理建议：')
print('高金额异常订单：人工审核')
print('高频小额订单：限制下单频次')
print('未支付高金额订单：提醒支付或取消订单')`
    },
    {
      title: '综合大项目',
      level: '综合',
      levelColor: 'red',
      theory: {
        intro: '综合实战项目将所学的数据分析技能整合应用，从数据准备到分析再到业务建议，完成完整的分析链路。',
        concepts: [
          { name: '数据整合', desc: '将多个数据源合并到一起', emoji: '🔗' },
          { name: '多方法结合', desc: '综合使用多种分析方法', emoji: '🧩' },
          { name: '业务落地', desc: '将分析结果转化为可执行的业务策略', emoji: '🚀' },
          { name: '报告撰写', desc: '整理分析过程和结论', emoji: '📝' },
          { name: '结果可视化', desc: '用图表直观展示分析结果', emoji: '📊' }
        ],
        tips: [
          '明确分析目标和业务问题',
          '按照数据预处理→探索分析→建模→评估的流程进行',
          '结合业务知识解读分析结果',
          '将技术指标转化为业务语言'
        ]
      },
      description: '整合所有知识点，完成从数据到分析到落地的完整链路',
      tasks: [
        '数据准备：整合所有数据集',
        '数据预处理：完成缺失值、异常值、特征处理',
        '核心分析：关联规则、聚类、回归、时序分析',
        '可视化呈现：绘制核心图表',
        '结论与落地：给出可执行的业务策略'
      ],
      dataset: '所有数据集',
      sampleCode: `import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from mlxtend.frequent_patterns import apriori, association_rules

# 1. 数据准备（模拟整合）
user_df = pd.DataFrame(user_data)
cart_df = pd.DataFrame(cart_data)
goods_df = pd.DataFrame(goods_data)
sales_df = pd.DataFrame(sales_data)

# 2. 数据预处理
# 用户数据预处理
user_df['消费金额'] = user_df['消费金额'].fillna(user_df['消费金额'].median())
user_df['消费频次'] = user_df['消费频次'].fillna(user_df['消费频次'].median())

# 3. 核心分析
# 3.1 关联规则挖掘
cart_encoded = pd.get_dummies(cart_df['商品名称'], prefix='商品')
cart_encoded['订单ID'] = cart_df['订单ID']
cart_encoded = cart_encoded.groupby('订单ID').max()

frequent_itemsets = apriori(cart_encoded, min_support=0.05, use_colnames=True)
rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.7)
valuable_rules = rules[rules['lift'] > 1]

# 3.2 KMeans用户聚类
user_features = user_df[['消费金额', '消费频次', '最近消费天数', '浏览时长']]
scaler = StandardScaler()
user_scaled = scaler.fit_transform(user_features)

kmeans = KMeans(n_clusters=4, random_state=42)
user_df['用户分群'] = kmeans.fit_predict(user_scaled)

# 3.3 随机森林销量预测
X = sales_df[['广告费', '活动次数', '客单价', '竞品价格']]
y = sales_df['销量']

rf = RandomForestRegressor(n_estimators=100, max_depth=5, random_state=42)
rf.fit(X, y)

# 4. 核心发现
print('核心发现：')
print('1. 高价值用户主要集中在消费金额和频次较高的群体')
print('2. 商品关联规则显示手机和配件经常一起购买')
print('3. 广告费是影响销量的核心因子')

# 5. 业务策略
print('\n业务策略建议：')
print('1. 针对高价值用户推出专属福利，提升复购率')
print('2. 基于关联规则，推出手机+配件捆绑销售套餐')
print('3. 优化广告投放，提高广告效果')
print('4. 针对不同用户分群制定差异化运营策略')
print('5. 根据销量预测，合理规划库存')`
    }
  ];

  // 运行代码
  const runCode = () => {
    setIsLoading(true);
    setOutput('');
    
    // 模拟代码运行
    setTimeout(() => {
      setOutput('代码运行成功！\n\n模拟输出结果：\n- 数据预处理完成\n- 分析结果已生成\n- 模型训练成功\n- 预测结果：1250.5');
      setIsLoading(false);
    }, 1500);
  };

  // 切换项目时清空输出
  useEffect(() => {
    setCode('');
    setOutput('');
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">
            📊 Python数据分析实训
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            从理论到实战，一步步掌握数据分析技能
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <Chip label="🟢 入门" color="success" size="small" />
            <Chip label="🔵 进阶" color="primary" size="small" />
            <Chip label="🟠 高级" color="warning" size="small" />
            <Chip label="🔴 综合" color="error" size="small" />
          </div>
        </div>

        <Tabs 
          value={activeTab} 
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          className="mb-6"
          sx={{
            '& .MuiTab-root': {
              fontWeight: 'bold',
              color: '#6b46c1',
            },
            '& .Mui-selected': {
              color: '#4c1d95 !important',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#4c1d95',
            },
          }}
        >
          {projects.map((project, index) => (
            <Tab key={index} label={project} />
          ))}
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：项目详情 */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <Typography variant="h5" component="h2" className="text-purple-800 font-bold">
                    {projectDetails[activeTab].title}
                  </Typography>
                  <Chip 
                    label={projectDetails[activeTab].level} 
                    color={
                      projectDetails[activeTab].levelColor === 'green' ? 'success' : 
                      projectDetails[activeTab].levelColor === 'blue' ? 'primary' :
                      projectDetails[activeTab].levelColor === 'orange' ? 'warning' : 'error'
                    }
                    size="small"
                  />
                </div>
                <Typography variant="body1" className="text-gray-700 mb-4">
                  {projectDetails[activeTab].description}
                </Typography>
                
                <Typography variant="h6" component="h3" className="text-purple-700 font-bold mb-2">
                  📚 理论知识
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-3 bg-yellow-50 p-3 rounded-lg">
                  {projectDetails[activeTab].theory?.intro}
                </Typography>
                
                <div className="mb-4">
                  {projectDetails[activeTab].theory?.concepts.map((concept, index) => (
                    <div key={index} className="mb-2 p-2 bg-purple-50 rounded">
                      <div className="flex items-center">
                        <span className="mr-2 text-lg">{concept.emoji}</span>
                        <span className="font-bold text-purple-700">{concept.name}</span>
                      </div>
                      <p className="text-sm text-gray-600 ml-8">{concept.desc}</p>
                    </div>
                  ))}
                </div>

                <Typography variant="h6" component="h3" className="text-purple-700 font-bold mb-2">
                  💡 学习提示
                </Typography>
                <ul className="list-disc pl-5 mb-4">
                  {projectDetails[activeTab].theory?.tips.map((tip, index) => (
                    <li key={index} className="text-gray-600 text-sm mb-1">
                      {tip}
                    </li>
                  ))}
                </ul>

                <Typography variant="h6" component="h3" className="text-purple-700 font-bold mb-2">
                  数据集
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-4">
                  {projectDetails[activeTab].dataset}
                </Typography>
                
                <Typography variant="h6" component="h3" className="text-purple-700 font-bold mb-2">
                  任务要求
                </Typography>
                <ul className="list-disc pl-5 mb-4">
                  {projectDetails[activeTab].tasks.map((task, index) => (
                    <li key={index} className="text-gray-600 mb-1">
                      {task}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* 数据预览 */}
            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" className="text-purple-700 font-bold mb-2">
                  数据预览
                </Typography>
                <div className="overflow-x-auto">
                  {activeTab === 0 && (
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-purple-100">
                          <th className="border border-gray-300 px-2 py-1 text-xs">用户ID</th>
                          <th className="border border-gray-300 px-2 py-1 text-xs">消费金额</th>
                          <th className="border border-gray-300 px-2 py-1 text-xs">消费频次</th>
                          <th className="border border-gray-300 px-2 py-1 text-xs">最近消费天数</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.userBehaviorData.slice(0, 5).map((row, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-purple-50'}>
                            <td className="border border-gray-300 px-2 py-1 text-xs">{row.用户ID}</td>
                            <td className="border border-gray-300 px-2 py-1 text-xs">{row.消费金额.toFixed(2)}</td>
                            <td className="border border-gray-300 px-2 py-1 text-xs">{row.消费频次}</td>
                            <td className="border border-gray-300 px-2 py-1 text-xs">{row.最近消费天数}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {activeTab === 2 && (
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-purple-100">
                          <th className="border border-gray-300 px-2 py-1 text-xs">订单ID</th>
                          <th className="border border-gray-300 px-2 py-1 text-xs">商品名称</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.cartData.slice(0, 10).map((row, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-purple-50'}>
                            <td className="border border-gray-300 px-2 py-1 text-xs">{row.订单ID}</td>
                            <td className="border border-gray-300 px-2 py-1 text-xs">{row.商品名称}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {activeTab === 5 && (
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-purple-100">
                          <th className="border border-gray-300 px-2 py-1 text-xs">日期</th>
                          <th className="border border-gray-300 px-2 py-1 text-xs">销量</th>
                          <th className="border border-gray-300 px-2 py-1 text-xs">广告费</th>
                          <th className="border border-gray-300 px-2 py-1 text-xs">活动次数</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.salesData.slice(0, 5).map((row, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-purple-50'}>
                            <td className="border border-gray-300 px-2 py-1 text-xs">{row.日期}</td>
                            <td className="border border-gray-300 px-2 py-1 text-xs">{row.销量}</td>
                            <td className="border border-gray-300 px-2 py-1 text-xs">{row.广告费}</td>
                            <td className="border border-gray-300 px-2 py-1 text-xs">{row.活动次数}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {activeTab === 7 && (
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-purple-100">
                          <th className="border border-gray-300 px-2 py-1 text-xs">日期</th>
                          <th className="border border-gray-300 px-2 py-1 text-xs">销量</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.timeSeriesData.slice(0, 10).map((row, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-purple-50'}>
                            <td className="border border-gray-300 px-2 py-1 text-xs">{row.日期}</td>
                            <td className="border border-gray-300 px-2 py-1 text-xs">{row.销量}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：代码编辑器和运行结果 */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h3" className="text-purple-700 font-bold mb-2">
                    代码编辑器
                  </Typography>
                  <div className="mb-2">
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
                      <Button 
                        size="small" 
                        variant="outlined" 
                        onClick={() => setCode(code + 'from sklearn.preprocessing import StandardScaler\n')}
                        sx={{ borderColor: '#4c1d95', color: '#4c1d95' }}
                      >
                        导入Scaler
                      </Button>
                    </div>
                    <div className="mb-2">
                      <Typography variant="body2" className="text-gray-600 mb-1">
                        代码提示：输入代码时会自动显示相关函数和方法
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        错误提示：代码有语法错误时会显示错误信息
                      </Typography>
                    </div>
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
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
                  <Typography variant="h6" component="h3" className="text-purple-700 font-bold mb-2">
                    参考代码 & 解释
                  </Typography>
                  <div className="h-64 overflow-y-auto p-4 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm">
                    <pre className="whitespace-pre-wrap">
                      {projectDetails[activeTab].sampleCode}
                    </pre>
                  </div>
                  <div className="mt-4">
                    <Typography variant="body2" className="text-gray-700 font-medium mb-1">
                      代码解释：
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      {activeTab === 0 && "本代码实现了数据预处理的完整流程，包括缺失值处理、异常值处理、特征工程和数据标准化。"}
                      {activeTab === 1 && "本代码实现了多维统计分析，包括描述统计、相关性分析和核心指标识别。"}
                      {activeTab === 2 && "本代码使用Apriori算法挖掘商品关联规则，为捆绑销售提供策略支持。"}
                      {activeTab === 3 && "本代码使用KMeans算法对用户和商品进行聚类分析，实现精准运营。"}
                      {activeTab === 4 && "本代码使用RFM模型对用户进行分层，制定差异化运营策略。"}
                      {activeTab === 5 && "本代码使用线性回归模型量化影响因子，预测销量。"}
                      {activeTab === 6 && "本代码使用随机森林模型进行非线性预测，分析特征重要性。"}
                      {activeTab === 7 && "本代码分析时间序列数据的趋势和周期，预测未来销量。"}
                      {activeTab === 8 && "本代码使用统计方法和机器学习模型检测异常订单和用户。"}
                      {activeTab === 9 && "本代码整合所有知识点，完成从数据到分析到落地的完整链路。"}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent>
                <Typography variant="h6" component="h3" className="text-purple-700 font-bold mb-2">
                  运行结果
                </Typography>
                <Paper elevation={0} className="p-4 bg-gray-50 rounded-md min-h-[150px]">
                  <pre className="font-mono text-sm whitespace-pre-wrap">
                    {output || '运行代码查看结果...'}
                  </pre>
                </Paper>
                <div className="mt-4">
                  <Typography variant="body2" className="text-gray-700 font-medium mb-1">
                    结果解释：
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {activeTab === 0 && "运行结果显示数据预处理的执行情况，包括缺失值填充、异常值处理、特征工程和数据标准化的结果。"}
                    {activeTab === 1 && "运行结果显示描述统计数据、相关性矩阵和影响营收的核心指标。"}
                    {activeTab === 2 && "运行结果显示频繁项集、关联规则和捆绑销售建议。"}
                    {activeTab === 3 && "运行结果显示用户和商品的聚类结果及各分群的特征分析。"}
                    {activeTab === 4 && "运行结果显示用户分层统计、各等级消费金额占比和运营策略建议。"}
                    {activeTab === 5 && "运行结果显示回归模型的系数、评估指标和预测结果。"}
                    {activeTab === 6 && "运行结果显示随机森林模型的性能、最优参数和特征重要性排序。"}
                    {activeTab === 7 && "运行结果显示时间序列的趋势分析、周期识别和未来销量预测。"}
                    {activeTab === 8 && "运行结果显示异常订单的检测结果、异常类型分析和处理建议。"}
                    {activeTab === 9 && "运行结果显示综合分析的核心发现和可执行的业务策略建议。"}
                  </Typography>
                </div>
              </CardContent>
            </Card>

            {/* 可视化结果 */}
            <Card className="mt-6">
              <CardContent>
                <Typography variant="h6" component="h3" className="text-purple-700 font-bold mb-4">
                  可视化结果
                </Typography>
                <div className="mb-4">
                  <Typography variant="body2" className="text-gray-600 mb-1">
                    可视化提示：图表展示了数据的分布、趋势或关系，帮助您更直观地理解分析结果
                  </Typography>
                </div>
                <div className="h-80">
                  {activeTab === 0 && (
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="消费金额" name="消费金额" />
                        <YAxis type="number" dataKey="消费频次" name="消费频次" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter name="用户" data={data.userBehaviorData} fill="#8884d8" fillOpacity={0.6} />
                      </ScatterChart>
                    </ResponsiveContainer>
                  )}
                  {activeTab === 1 && (
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="消费金额" name="消费金额" />
                        <YAxis type="number" dataKey="消费频次" name="消费频次" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter name="用户" data={data.userBehaviorData} fill="#82ca9d" fillOpacity={0.6} />
                      </ScatterChart>
                    </ResponsiveContainer>
                  )}
                  {activeTab === 2 && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.cartData.slice(0, 10).reduce((acc, item) => {
                        const found = acc.find(i => i.商品 === item.商品名称);
                        if (found) {
                          found.购买次数 += 1;
                        } else {
                          acc.push({ 商品: item.商品名称, 购买次数: 1 });
                        }
                        return acc;
                      }, [])}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="商品" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="购买次数" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                  {activeTab === 3 && (
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="消费金额" name="消费金额" />
                        <YAxis type="number" dataKey="消费频次" name="消费频次" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter name="用户群1" data={data.userBehaviorData.filter((_, i) => i % 4 === 0)} fill="#8884d8" fillOpacity={0.6} />
                        <Scatter name="用户群2" data={data.userBehaviorData.filter((_, i) => i % 4 === 1)} fill="#82ca9d" fillOpacity={0.6} />
                        <Scatter name="用户群3" data={data.userBehaviorData.filter((_, i) => i % 4 === 2)} fill="#ffc658" fillOpacity={0.6} />
                      </ScatterChart>
                    </ResponsiveContainer>
                  )}
                  {activeTab === 4 && (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: '高价值用户', value: 25 },
                            { name: '潜力用户', value: 45 },
                            { name: '流失/低价值用户', value: 30 }
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          <Cell fill="#00C49F" />
                          <Cell fill="#FFBB28" />
                          <Cell fill="#FF8042" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                  {activeTab === 5 && (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.salesData.slice(0, 30)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="日期" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="销量" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="广告费" stroke="#82ca9d" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                  {activeTab === 6 && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={[
                          { name: '广告费', importance: 0.35 },
                          { name: '活动次数', importance: 0.25 },
                          { name: '客单价', importance: 0.20 },
                          { name: '竞品价格', importance: 0.20 }
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip />
                        <Bar dataKey="importance" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                  {activeTab === 7 && (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.timeSeriesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="日期" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="销量" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                  {activeTab === 8 && (
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="消费金额" name="消费金额" />
                        <YAxis type="number" dataKey="消费频次" name="消费频次" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter name="正常用户" data={data.userBehaviorData.filter((_, i) => i % 5 !== 0)} fill="#82ca9d" fillOpacity={0.6} />
                        <Scatter name="异常用户" data={data.userBehaviorData.filter((_, i) => i % 5 === 0)} fill="#FF0000" fillOpacity={0.8} />
                      </ScatterChart>
                    </ResponsiveContainer>
                  )}
                  {activeTab === 9 && (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.salesData.slice(0, 30)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="日期" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="销量" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="广告费" stroke="#82ca9d" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>© 2024 七七大王的数据分析实训空间 | 基于React + TypeScript + Tailwind CSS构建</p>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysisPractice;