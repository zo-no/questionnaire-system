# ZONO问卷

这是一个仿问卷星的问卷编辑系统
建议和mock库一起运行，由于登录会验证是否已经登录，所以需要mock库的支持

```c
//src是工作目录
src
├── components -- 组件库
│   ├── QuestionComponents -- 问卷组件，用于编辑问卷（可拓展）
│   |   └── index.tsx -- 低代码实现寻找对应组件的逻辑主要在这里
│   ├── DragSortable -- 拖拽组件库
│   └── other -- 其他组件
├── constant -- 常量
├── hooks -- 自定义hooks
|   ├── useGet... -- UI与redux交互
|   ├── useLoad... -- ajax与redux交互
|   └── useBindCanvasKeyPress -- 控制redux的状态，来控制画布的状态（快捷键）
├── layout -- 布局
├── pages -- 页面 
|   ├── manage -- 问卷管理
|   ├── question -- 问卷设计
|   |   ├── Edit -- 编辑页
|   |   └── Stat -- 统计页
|   └── other -- 其他页面
├── router -- 路由
├── store -- redux
├── story -- storybook可视化测试
└── utils -- 工具库（token管理）
```

## 项目启动

```bash
yarn install
yarn start
```
