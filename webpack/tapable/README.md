# 1. tapable

webpack 本质上是一种事件流的机制，它的功罪流程就是将各个插件串联起来，而实现这一切的核心就是 Tapable，webpack 中最核心的负责便宜的 Compiler 和负责创建 bundles 的 Complication 都是 Tapable 的实例

# 2. tapable 用法

```js
// bail 保险丝：防止内存过大，过量则立马 “断电”
// waterfall 瀑布：数据流动性，承接上级“注册事件”的返回值
// parallel 并行
const {
  // 同步类型 hooks
  SyncHook, // 同步串行执行，不关心返回值

  SyncBailhook, // 同步串行执行，有一个返回值不为 null，则跳过剩下的逻辑

  SyncWaterfallHook, // 数据流动性，承接上级“注册事件” task 执行后的返回值

  SyncLoopHook, // 函数返回值为 true，表示继续循环，返回 undefined

  // 异步类型 hooks：为了按照一定顺序执行
  // 注册：支持 tap、tapPromise、tapAsync
  // 调用：支持 call、promise、callAsync
  AsyncParallelHook, // 异步并行执行

  AsyncParallelBailHook, // 等价于 SyncBailhook

  AsyncSeriesHook, // 异步串行执行，通过 next 执行下一步事件，无则断开

  AsyncSeriesBailHook,

  AsyncSeriesWaterfallHook,
} = require("tapable");
```

xxx.tap('', task) // 注册事件
xxx.call('') // 执行

tapAsync callAsync
tapPromise promise
