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
## 3.7代码管理