# DLL 动态连接库

**_最有效的性能优化方式_**
**_二进制数据，没有代码_**

- DllPlugin

  > 把基础固定模块分离出来打包如动态连接库，这样就不会每次都进行打包操作了

- DllReferencePlugin // 引用动态连接库

```javascript
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

```javascript
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

> webpack.config.dll.js 编译成功后需要手动修改 dist/index.html 的引用

```html
<script src="react.dll.js"></script>
<script src="react-dom.dll.js"></script>
```

# optimization // webpack 内置属性

- splitChunks

```javascript
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

```javascript
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

# ModuleConcatenationPlugin // 使模块内联

> 优势：减少声明模块次数，少实例函数，更快了

```javascript
const ModuleConcatenationPlugin = reuqire(
  "webpack/lib/optimize/ModuleConcatenationPlugin"
);

module.exports = {
  // ...
  plugins: [new ModuleConcatenationPlugin()],
  // ...
};
```

# 动态导入 + 懒加载

- import('') // 函数 import ES7 的语法

```javascript
let im = import("./hello.js"); // 返回值时 promise
promise.then((mod) => {
  mod.default(); // 同 ES6 的 export/import
});
```

> 原理：
