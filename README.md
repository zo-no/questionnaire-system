# ZONO问卷

这是一个仿问卷星的问卷编辑系统, 采用低代码的方式，通过拖拽和各种工具来编辑问卷，支持问卷管理、星标、回收站恢复、问卷的统计等功能。
> - mock：GitHub - zo-no/questionnaire-mock: 访问卷星项目的mock程序
> - 主程序（B端）：GitHub - zo-no/questionnaire-system: 模仿问卷星的项目
> - c端：GitHub - zo-no/questionnaire-client: 仿问卷星的客户C端项目，使用Nextjs

## 项目技术栈
```c
- react
- redux
- react-router-dom

- antd
- SCSS
- CssModule

- typescript
- mockjs
- axios
- dnd-kit
...
```

## 项目启动
建议和mock库一起运行，由于登录会验证是否已经登录，调用接口，所以需要mock库的支持
```bash
# npm也行
yarn install
yarn start
```


## 页面对应的功能与路由

### 首页 `/`
1. 加入炫酷字体

### 用户
1. 登录 `/login`
2. 注册 `/register`
3. 基于（JWT）、有表单校验

### 问卷管理
- 问卷的增删改查、星标、回收站恢复
1. 我的问卷 `/manage/list`
2. 星标问卷 `/manage/star`
  > 划到底部更新数据（loadmore）
3. 回收站 `/manage/trash`

###  编辑问卷 `/question/edit/:id`
顶部栏
1. 左（修改问卷名、返回）
2. 中（工具栏）
> - 删除
> - 隐藏
> - 锁定
> - 复制，粘贴
> - 上移，下移
> - 撤销，重做
1. 右（保存、发布）
> - 自动保存
PS:🎈都有快捷键

三栏布局（组件库|图层+画布+单个表单设置|问卷信息编辑）
1. 左
> - 组件库（可以从组件库拖拽组件到画布）
> - 图层（与画布的同步的拖拽修改组件状态、顺序）
2. 中
> - 画布（画布上的组件可以拖拽、修改）
3. 右
> - 单个表单属性设置（单个表单的属性设置）
> - 问卷信息编辑
>   - 标题，描述
>   - 可以加入css、js

### 问卷统计 `/question/stat/:id`
顶部栏
> - 显示url并可以复制、二维码
1. 左侧 问卷最终样式的展示
2. 中间 问卷统计的结果显示
3. 右侧 图表统计
### 404

## 项目结构

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

## 开发记录

### 项目初始化

- [x] 使用cra初始化项目
- [x] 安装配置eslint、prettier
- [x] 创建git仓库并加入husky、commitlint来管理提交规范
- [x] 加入ahooks、immer、axios等库
- [x] 配置redux、react-router-dom基本结构
- [x] 安装CssModule（cra支持）、classnames、antd、scss等库

### 初始化mock(看另一个库)

- [x] 设计路由
  - [x] 页面对应的路由
  - [x] Layout 模板(src\layouts)
  > - MainLayout(主要布局：上下栏)
  - [x] 右侧：用户信息组件
  - [x] 左侧：logo组件
  > - ManageLayout（问卷管理布局）
  > - QuestionLayout（问卷设计布局）

### 开发登录注册页面

  - [x] UI
  - [x] 表单校验
  - [x] 调用接口使用JWT
### 开发问卷管理页面
  - [x] 通用组件
    - [x] 问卷信息卡片组件(src\components\QuestionCard.tsx)
  - [x] 页面（layout）
    - [x] 我的问卷页面
    - [x] 星标问卷页面
    - [x] 回收站页面
  - [x] 调用接口 
  - 功能
    - [x] 分页、搜索  
    - [x] leadMore(下滑加载更多)

### 编写Ajax

  - [x] 使用axios配置拦截器等
  - [x] 配置代理
  - [x] 使用Ahooks的useRequest

### Redux
  - [x] 配置redux
  - [x] 设计数据结构

### 问卷编辑页面

- [x] 顶部栏
  - [x] 左（修改问卷名、返回）
  - [x] 中（工具栏）
  - [x] 右（保存、发布）
  - [x] 快捷键
  - [x] 自动保存
- [x] 三栏布局（组件库|图层+画布+单个表单设置|问卷信息编辑）

### 问卷统计页面

- [x] 顶部栏
  - [x] 显示url并可以复制、二维码
- [x] 左侧 组件列表
- [x] 中间 答卷列表
- [x] 右侧 图表统计

### c端
> 见c端库

难点与低代码的解决方案写在飞书