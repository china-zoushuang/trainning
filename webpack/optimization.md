## 1. DLL 动态链接库 // 最有效的性能优化方式，二进制数据，没有代码

- ### DllPlugin

> 把基础固定模块分离出来打包如动态链接库，这样就不会每次都进行打包操作了

```js
// webpack.config.dll.js
const DllPlugin = require('webpack/lib/DllPlugin')

module.exports = (env, argv) => {
    entry: ['react','react-dom'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        ilename: '[name].dll.js',
        library: '_dll_[name]'
    },
    plugins: [
        // 生成清单
        new DllPlugin({
            name: '_dll_[name]', // 匹配已打包的文件
            path: path.resolve(__dirname, 'dist', '[name].manifest.json'),
        }),
    ]
}
```

- ### DllReferencePlugin // 引用动态链接库

```js
// webpack.config.js
const DllPlugin = require('webpack/lib/DllPlugin')

module.exports = (env, argv) => {
    ...
    plugins: [
        // 在编译时，会查看 manifest 文件，如果存在，则不再编译
        new DllReferencePlugin({
            path: path.resolve(__dirname, 'dist/react.manifest.json')
        })
    ]
    ...
}
```

> webpack.config.dll.js 编译成功后需要手动修改 dist/index.html 的引用

```html
<script src="react.dll.js"></script>
<script src="react-dom.dll.js"></script>
```

---

## 2. optimization // webpack 内置属性

- ### splitChunks

```js
module.exports = {
  optimization: {
    splitChunks: {
      // 缓存，提高效率
      cacheGroups: {
        // 把公共第三方模块单独打包到 vendor.js 中
        vendor: {
          name: "vendor",
          test: /node_modules/, // 模块路径匹配规则
          chunks: "initial",
        },
        // 把多个页面之间的公共模块单独打包到 common.js 中
        commons: {
          chunks: "initial",
          minChunks: 2, // 达标最小引用次数，就得提取
          minSize: 0,
        },
      },
    },
  },
};
```

> 注意：打包成功后的 commons 的 chunks 需要配合 HtmlWebpackPlugin 的 chunks 配置，这样才能有效的针对性引入所需的 common chunks

```js
module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "pageA.html",
      chunks: ["pageA"], // 当多入口时，只引入自身的 js
    }),
  ],
  // ...
};
```

---

## 3. ModuleConcatenationPlugin // 使模块内联

> 优势：减少声明模块次数，少实例函数，更快了

```js
const ModuleConcatenationPlugin = reuqire(
  "webpack/lib/optimize/ModuleConcatenationPlugin"
);

module.exports = {
  // ...
  plugins: [new ModuleConcatenationPlugin()],
  // ...
};
```

---

## 4. webpack.HotModuleReplacementPlugin // HMR 模块热更新

> 优势：不同于一般的热更新会刷新整个页面，HMD 是针对被修改的模块进行替换更新

- ### 原理：注入代理客户端（websocket 服务），用于链接 devServer 和浏览器

```js
// webpack.config.js
module.exports = (mod, argv) => {
    devServer: {
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
```

- ### 流程：
  1. 模块更新了
  2. devServer 通过 websocket 携带[pre-hash].hot-update.json 和 [pre-has].hot-update.js 补丁文件通知浏览器
  3. 执行 [pre-hash].hot-update.js 中的 webpackHotUpdate 函数，进行模块替换

```js
// name.id.hot-update.js
window.webpackHotUpdate(moduleName, module);
```

- ### 机制：冒泡更新机制，若中间 chain（链）没有拦截，直至浏览器整体刷新

---

## 5. 按需加载

- ### import('') // 函数 import ES7 的语法

```js
let im = import("./hello.js"); // 返回值时 promise
promise.then((mod) => {
  mod.default(); // 同 ES6 的 export/import
});
```
