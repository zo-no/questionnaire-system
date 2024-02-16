## 3.安装环境cra
- 安装环境
  - 安装git、nodejs、npm、vscode等
  - 使用create-react-app创建和启动react项目
```shell
npx create-react-app my-app --template typescript
cd my-app
npm start
```
 - 使用vite创建和启动react项目
 - 
## 3.6.安装prettier(3.6)
```shell
npm install prettier eslint-config-prettier eslint-plugin-prettier -save-dev
```
配置.eslintrc.js
```js
module.exports = {
  //加入一行extends
  extends: ['react-app', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
  },
};
```
安装prettier的vscode插件，加入format命令入package.json
```json
"scripts": {
  //无法使用单引号，只能使用双引号，不知道原因 
  //QUER  "format": "prettier --write 'src/**/*.+(js|ts|jsx|tsx)' "
  "format": "prettier --write \"src/**/*.+(js|ts|jsx|tsx)\""
}
```
这样就可以使用npm run format命令格式化代码了
配置插件，这样保存文件就能自动格式化代码
```json
//创建.vscode/settings.json文件
{
  // "editor.defaultFormatter": "esbenp.prettier-vscode",
  // "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```
也可以配置.prettierrc文件
```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all"
}
```
## 3.7 代码管理
## 3.8 流程化管理
使用husky，按照文档更快捷的配置git hooks
https://typicode.github.io/husky/get-started.html
安装
```shell
npx husky init
```
配置
```shell
# <!-- .husky/pre-commit文件中加入 -->
npm run lint
npm run format
git add .

```
## 3.9使用commit-lint
安装
```shell
npm install -save-dev  @commitlint/cli @commitlint/config-conventional
```
配置
```shell
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg #用于限制commit提交信息
```
修改commit-msg
```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit 
```
如此，commit时要求格式为`主题: 描述`

| 主题     | 内容     | 其他 |
| -------- | -------- | ---- |
| build    | 构建     |
| chore    | 日常事务 |
| ci       | 持续集成 |
| docs     | 文档     |
| feat     | 新功能   |
| fix      | 修复     |
| perf     | 性能优化 |
| refactor | 重构     |
| revert   | 撤销     |
| style    | 样式     |
| test     | 测试     |
### 遇见的问题
1. 配置后，commit时报错
```shell
error: pathspec 'ci:install' did not match any file(s) known to git
```
原因：commit命令行写错了
2. 修改后继续报错
```
[error] Invalid configuration for file "D:\workspace\web\questionnaire-system\src\App.tsx":
[error] module is not defined in ES module scope
[error] This file is being treated as an ES module because it has a '.js' file extension and 'D:\workspace\web\questionnaire-system\package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
husky - pre-commit script failed (code 2)
```
- 原因：package.json中有"type": "module"，这是es6的模块化语法，而commit-lint不支持es6的模块化语法
- 解决办法：删除"type": "module",
## （加餐）webpack和vite中EsModule的区别
vite和webpack是竞争对手
vite和create-react-app都是基于esbuild的，也是竞争对手
cra和webpack则是合作伙伴
### vite的特点
- 快速冷启动
- 使用EsModule语法