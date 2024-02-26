# 10-12 loading优化体验
开发顺序：1.编写mock 2.编写调用接口的代码 3.抽象出自定义hooks 4.优化loading体验
- [x] 发现useLoadQuestionData再多个地方都有用到，所以可以抽离出来

# 10-13 统一处理loading和error
- [x] 这里用ahooks的useRequest优化了useLoadQuestionData

https://ahooks.js.org/zh-CN/hooks/use-request/index#%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B
限制：
- 传入函数返回的是promise


# 10-14 
- [x] 10-14 编写mock——获取（查询）问卷列表
编写并调用，把之前的fack数据改成mock数据，请求也是实验useRequest的返回值

实验spin来代替loading

# 10-15 封装请求列表到自定义hooks
- [x] 请求时，会取出key来搜索，同时也要把mock进行修改，能处理key

- typyscript的Partial泛型，可以把所有属性都变成可选的

# 11-1
-[]再10-15的基础上添加page和pageSize两个查询字符串
# 11-2
- [] 使用antd组件<Pagination>
- [] 把该组件进行封装
  - [] url和组件进行联动
    - []
