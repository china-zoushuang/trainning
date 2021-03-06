# Redux 状态管理器

## 整个应用仅一个 store 便于数据管理

## 安全机制

> 只能允许通过 dispatch 派发操作修改 state，不允许直接改动 state

### `原理：局部变量 + 闭包`

### 1. 创建“仓库”，使 state 成为 function 的局部变量

### 2. 在“仓库”内定义 getState，dispatch 实现闭包

### 3. 暴露 getState, dispatch 用于读写 state

```js
/*
 * 根据自定义的 reducer 创建 store
 */
function createStore(reducer) {
  let state;
  let listeners = [];

  function getState() {
    return state;
  }

  // 发布
  function dispatch(action) {
    state = reducer(state, action);

    listeners.forEach((handler) => handler());
  }

  // 订阅（监听） state，存储操作，dispatch 时才执行操作
  function subscribe(handler) {
    listener.push(handler);

    // 返回取消订阅函数，若执行 return，则删除订阅
    return () => {
      listeners.filter((item) => item !== handler);
    };
  }

  // 初始化 state
  dispatch();

  return { getState, dispatch, subscribe };
}

return createStore;
```

## 定义 state 和 reducer 处理器

```js
const initState = {
    name: 'zs',
    age: 20
}
// 接收的 state 是 oldState，返回 newState
function reducer (state, action) {
    switch case(action.type) {
        case 'name':
            return {...state, name: action.payload}
        case 'age':
            return {...state, age: action.payload}
        default:
            return state
    }
}
```

## 通信：订阅、发布（即 dispatch）

```js
let store = createStore(reducer);

let callback = () => {
  let name = store.getState().name;
  console.log("newName", name);
};

// 订阅（监听）state
// 一旦 state 改变，则执行 callback
store.subscribe(callback);

// 取消订阅（监听）
// 因为 subscribe 的返回值是取消订阅（监听）函数
let unSubscribe = store.subscribe(callback);
unSubscribe();
```

## react 中渲染页面

> 订阅 state，然后 setState 触发页面渲染

```jsx
let handler = () => {
  this.setState({
    ...store.getState(),
  });
};
store.subscribe(handler);
```

## Provider 和 connect

```jsx
import {Provider} fron 'redux'
// App
<Provider store={store}>
  <Child />
</Provider>
```

```jsx
import {connect} fron 'redux'
// Child
class Child extends Component {
  constructor(props) {
    super(props);
    // 因为 connect 了，所以 props 包含 store
  }
}
export default connect(...args)(Child);
```
