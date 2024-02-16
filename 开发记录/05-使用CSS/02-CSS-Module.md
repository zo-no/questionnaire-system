# CSS Module

## 普通 CSS 的问题

- React 使用组件化
- 多个组件，对应多个 CSS
- 多个 CSS 就会造成命名重复，不好管理

## 6.3 CSS Module
以前css BEM


- 每个 CSS 都是一个独立的模块，命名 `xxx.module.css`
- 每个模块中的 className 都不一样
- CRA 原生支持 CSS Module
- 使用：`import styles from './xxx.module.css'`然后`<div className={styles.xxx}></div>`或者`<div className={styles['xxx']}></div>`
代码演示，参考 `components/Button2.tsx`

## 6.4 使用 Sass

- CSS 写法比较原始
- 一般使用 Sass less 等预处理语言
  - 嵌套
  - 变量
  - 函数
  - 模块化
  - ...
- CRA 支持 Sass Module ，把后缀改为 `.scss` 即可

代码演示
