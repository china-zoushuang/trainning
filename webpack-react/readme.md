# webpack 优化
- 开发优化
  - DllPlugin 动态链接库
  - happypack 多线程打包

- 打包后代码优化
  - tree shaking 只打包被 used 的 export
  - optimization - splitChunks 抽离重复引入项
  - ModuleConcatenationPlugin 模块合并，将引入对模块合并
  - syntax-dynamic-import 懒加载（语法动态引入，在 .babelrc 中配置）