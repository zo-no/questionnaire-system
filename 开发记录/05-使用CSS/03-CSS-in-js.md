# CSS-in-js

- 在 JS 中（组件代码中）写 CSS
- 不用担心 CSS class 重名的问题
- CSS-in-js 是一个解决方案，并不是一个工具的名称

PS：CSS-in-js 并不是内联 style （重要！！！），它会经过工具的编译处理，生成 CSS class 的形式。

## Styled-components

https://styled-components.com/

代码演示，参考 `components/Button3.tsx`

## 6.7 Styled-jsx和emotion(了解其他css-in-js方案)

https://github.com/vercel/styled-jsx#getting-started

## 优点

CSS-in-js 能更灵活的支持动态样式，直接在 JS 中完成计算和样式切换。这比 css-module 更好。

## 缺点
JSX 中写 CSS 会让代码变得更加复杂，不利于维护。