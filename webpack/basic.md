# Plugins

### 外部

- webpackDevMiddleware // 往 express 中嵌入 webpack 的中间件，实现监听资源并更自动打包，一旦文件改变，middleware 不会请求旧资源，而是延迟请求，等待新的文件编译完成，通过 webpack-hot-middleware 实现热加载
  > 优势：因为 webpackDevMiddleware 是通过内存方式，所以相较于 webpack 的 watch 要编译速度更快

```javascript
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const config = require("./webpack.config.js");
let compiler = webpack(config);
let app = express();
app.use(webpackDevMiddleware(compiler));
app.listen(3000);
```

- HtmlWebpackPlugin // 设置 html 模版

```javascript
new HtmlWebpackPlugin({
  template: "./public/index.html",
  filename: "login.html",
  chunks: ["login"], // 当多入口时，只引入自身的 js
  minify: {
    key: "value",
  },
});
new HtmlWebpackPlugin({
  template: "./public/index.html",
  filename: "main.html",
  chunks: ["main"], // 当多入口时，只引入自身的 js
});
```

- MiniCssExtractPlugin // 分离 css

- UglyfyjsWebpackPlugin // 压缩 js

```javascript
new UglyfyJsWebpackPlugin({
  cache: true, // 是否启用缓存
  sourceMap: true, // 生成资源映射文件，用于调试
  parallel: true, // 是否并行压缩
});
```

- OptimizeCssAssetsPlugin // 压缩 css
- CopyWebpackPlugin // 拷贝资源到指定文件夹中，一般用于将未引用的静态资源拷贝到打包的文件夹中

```javascript
new CopyWebpackPlugin({
  from: path.resolve(__dirname, "static"),
  to: path.resolve(__dirname, "dist/static"),
});
```

### 内部

- webpack/lib/DllPlugin
- webpack/lib/DllReserverPlugin
- webpack/lib/optimize/ModuleConcatenationPlugin // 使模块内联

- webpack.ProviderPlugin // 不需要再通过 import \_ from 'lodash' 引入

> 弊端：provide 的是局部变量，需要用 expose-loader 将其改编成全局变量，这样依赖其的插件才能正常运行

```javascript
webpack.ProviderPlugin({
  _: "lodash",
  $: "jquery",
});
```

- webpack.DefinePlugin // 定义全局 **_常量_**

```javascript
webpack.DefinePlugin({
  VERSION: 1.0,
  env: process.env.NODE_ENV, // 取值 webpack 配置的 mode
});
```

# loaders

- less-loader

- sass-loader

- postcss-loader // 处理 css3 属性前缀:-webkit/-moz/-ms

```javascript
// 新建 postcss.config.js，由它真正的处理
const autoprefixer = require("autoprefixer");
module.exports = {
  plugins: [autoprefixer],
};
```

```
// 新建 .browserslistrc 配置兼容版本
iOS >= 7
Android > 4.1
Firefox > 20
last 100 versions
```

- babel-loader // ES6/ES7/ES8/JSX => ES5

  - babel-core
  - babel-preset-env // ES6 => ES5
  - babel-preset-stage-0 // 最新语法 => ES5
  - babel-preset-react // jsx => ES5
  - babel-plugin-transform-decorators-legacy // 装饰器语法 => ES5

```javascript
{
    test: /\.jsx?$/,
    use: [
        {
            loader: 'babel-loader',
            options: {
                presets: ['env', 'stage-0', 'react'],
                plugins: ['transform-decorators-legacy']
            }
        }
    ]
}
```

- eslint-loader

  - eslint
  - babel-eslint
  - standard

- url-loader

  > 优势：配置 options.limit 可以将小图图片转 base64

- file-loader

# devtool：推荐 eval-source-map

- source-map // 定位到列
- cheap-module-source-map // 定位到行
- eval-source-map // 不会生成 .map 文件，直接内嵌源代码中

# library

```javascript
module.exports = {
  library: "myLibrary",
  libraryTarget: "var", // var, commonjs, commonjs2, this, windows, global, 默认 var（全局变量）
};
```

- var

```javascript
// bundle.js
var myLibrary = (function () {})();
```

- commonjs

```javascript
// bundle.js
exports["myLibrary"] = (function () {})();
```

- commonjs2

```javascript
// bundle.js
module.exports = (function () {})();
```
