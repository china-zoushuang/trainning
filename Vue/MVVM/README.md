## 数据劫持、代理

## vue 2.x 使用 Object.defineProperty

> 缺陷：无法监听数组变化、只能坚挺已有属性

```js
Object.defineProperty(target, key, {
  set() {},
  get() {},
});
```

## vue 3.x 使用 Proxy 代理对象

> 优势：Proxy 可以对目标对象的读取、函数调用等操作进行拦截

```js
function draw() {
  console.log("触发试图更新");
}

function toProxy(target) {
  let handlers = {
      set(target, key, value, receiver) {
          Reflect.get(target, key, value, receiver)
          draw()
      }
      get(target, key, receiver) {
          let res = Reflect.get(target, key, receiver)
          if (typeof res === 'object') {
              return toProxy(res)
          }
          return res
      }
      deleteProperty() {

      }
  }

  let observer = new Proxy(target, handlers);
  return observer;
}

let model = { name: "zs" };
let p = toProxy(model);

p.name = "zs2";
```

## 文档碎片：解决直接修改 dom 从而导致页面回流，dom 重新渲染，影响性能；

1. 遍历存取文档碎片

```js
const fragment = document.createDocumentFragment();
fragment.appendChild();
...

ele.appendChild(fragment)
```

2. 根据 nodeType 判断 node 节点是标签【1】、还是文本【3】；
3. 获取标签节点上的 attributes，并根据 attribute 的 name 是否包含 “v-” 进行节点筛选；
4. 根据 “{{}}” 筛选文本节点

定义 getValue, setValue, update

```js
function ViewModel(data) {
  this.data = data;
  this.nodes = [];
}
// 更新视图
ViewModel.prototype.update = () => {};
ViewModel.prototype.setValue = (newValue) => {};
ViewModel.prototype.getValue = () => {};
const model = {
  name: new ViewModel("zs"),
};
```
