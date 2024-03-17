# ZONO问卷

## 项目简介

这是一个仿问卷星的低代码问卷编辑系统（GitHub - zo-no/questionnaire-system）。

实现了B端（问卷管理后台）C端（问卷填写、搜集）Mock (模拟请求)。

B端主要使用`react hook`和`ant design`搭配各种库完成，支持：
1. 问卷管理功能，如：标星、删除、恢复
2. 问卷编辑功能，创建、编辑、发布，这是最复杂的部分，实现了低代码编辑问卷，并还有拖拽、工具栏、快捷键等一系列功能。
3. 问卷统计：显示问卷最后结果、图表统计、二维码...

C端使用`nextjs`，实现了问卷的填写、提交、搜集功能。

Mock使用`mockjs`，模拟了问卷的增删改查功能。

> - mock：GitHub - zo-no/questionnaire-mock: 访问卷星项目的mock程序
> - 主程序（B端）：GitHub - zo-no/questionnaire-system: 模仿问卷星的项目
> - c端：GitHub - zo-no/questionnaire-client: 仿问卷星的客户C端项目，使用Nextjs

## 低代码实现逻辑
低代码的实现逻辑
用redux维护一个组件表单的componentList(有点像虚拟DOM)，这是将要渲染到画布上组件的数据表
```js
{
    id: 'xxx',
    title: '标题',
    desc: '描述',
    isStar: false,
    isDeleted: false,
    isPublished: false, // 是否发布
    componentList: [], // 组件列表
}
```
然后componentList中的每个组件都是一个对象，如：
```js
{
    id: 'xxx',
    type: 'questionInfo', // 组件类型，每个组件都固定
    title: '组件标题', // 图层修改标题
    isHidden: false,
    isLocked: false,
    props: {}, // 组件属性，如单选有多少个选项
}
```
可以看到每个组件都有一个对应的type(有点像fiber的tag)，渲染时就根据type找到对应组件，然后渲染到画布上。

## 项目亮点
项目简介：这是一个仿问卷星的低代码问卷编辑系统（GitHub - zo-no/questionnaire-system）, B端使用 react hook和 ant design搭配各种库完成，支持问卷管理功能（标星、删除、恢复），还可以进行问卷编辑（创建、编辑、发布）,发布后还有一个问卷统计页面（跳转C端，显示问卷调查结果）。C端使用 NextJS 实现了问卷填写和搜集功能。并编写了简单的 Mock程序来实现模拟请求后端。

技术栈：React全家桶 、Ant design 、TypeScript、 Nextjs、Scss、Mock、Axios、dnd-kit等

项目亮点：

实现了低代码编辑问卷功能。使用`Redux`维护当前问卷画布需显示的组件列表，并在表示单个组件的对象上，维护一个`type标识`来从组件库中匹配对应组件，放入画布进行渲染。

使用`ant design UI库`和`dnd-kit`封装了可拖拽组件库，并可拓展，只需要保证对应的组件文件夹格式，其中包含`表单显示组件`、`表单属性编辑组件`和`type标识管理`，便可使用问卷编辑页面所有的工具栏功能，此外还可以给每个组件加入`jest`来测试组件是否正常

自定义多个`hooks`。封装`react`、`react route`、和`ahooks`库中的hook，并将hooks分为UI与redux交互、Ajax与redux交互两个部分。

使用`Webpack`打包项目，对项目进行分包，使包体积都小于500kb。

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