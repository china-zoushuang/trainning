# 原理： import(file)

```js
document.onClick = function () {
  // 每一个 import 就会天然的生成一个代码块
  import("./click.js").then((mod) => {
    // mod 是 click.js 的模块
    mod.default(); // 执行模块返回的函数
  });
};
```

- ## 构建 Promise

- ## 构建 head 和 script 标签

```js
let script = document.createElement("script");
scrpt.src = filePath;
```

- ## 指定回调

```js
script.onerror = function () {
  reject();
};
script.onload = function () {
  resolve();
};
```

- ## 执行

```js
head.appendChild(script);
```
