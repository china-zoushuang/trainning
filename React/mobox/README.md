## mobox vs redux

- mobox 学习成本低，是性能更好的解决方案
- 开发难度低
- 开发代码量小
- 渲染性能好：只会渲染对应的组件

## 原理

`把普通对象数据变成可观察的数据`

- Object.defineProperty：不支持监控数组、只能监控已有属性
- Proxy ES7 语法：更强大，可以监控数组

```js
new Proxy(
  {
    name: "zs",
  },
  {
    set(target, key, value) {
      handler(); // 数据变化后的操作
      return Reflect.set(target, key, value);
    },
    get(target, key) {
      return Reflect.get(target, key);
    },
  }
);
```

## 应用

```js
import { obserable, autorun } from "mobox";
let obj = obserable({
  name: "zs",
});
autorun(() => {
  console.log(obj.name);
});
```

## autorun

### 原理: autorun, middleware, observerable

```js
// autorun

import Middleware from "./Middleware";

autorun(handler);

function autorun(handler) {
  Middleware.start(handler);
  handler();
  Middleware.end();
}
```

```js
// Middleware
let count = 0;
let nowfn = null;
class Middleware {
  constructor() {
    this.id = ++count;
    this.store = {};
  }

  dispatchGet() {
    if (nowfn) {
      this.store[this.id].push(nowfn);
    }
  }

  dispatchSet() {
    this.store[this.id].forEach((fn) => fn());
  }

  start(handler) {
    nowfn = handler;
  }
  end() {
    nowfn = null;
  }
}
```

```js
// observerable

import Middleware from "./Middleware";

function deepProxy(obj) {
  // 只有在这里才需要 new Middleware，autorun 中用到时不需要new，因为这里是需要用到对应的 this
  let middleware = new Middleware();
  new Proxy(obj, {
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver);
      middleware.dispatchSet();
    },
    get(target, key, receiver) {
      let res = Reflect.get(target, key, receiver);
      middleware.dispatchGet();
      return res;
    },
  });
}
```
