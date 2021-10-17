# dva

**_`一个基于 redux 和 redux-saga 的数据流方案`_**

## 1. 初始化 dva

```js
import dva from "dva";

// 1. Initialize
const app = dva({
  history: createHistory(),
  onError: (/* error, dispatch */) => {
    // 防止错误继续上抛
  },
});
```

## 2. 引入 dva-loading

```js
import createLoading from "dva-loading";
app.use(createLoading());
```

## 3. 创建 model

```js
app.model({
  // 命名空间
  namespace: "userInfo",
  // 数据池
  state: {},
  // 映射 reducer 中的方法
  actions: {},
  // 数据处理器，同步更新 state
  reducer: {
    updateName(state, action) {
      return {
        ...state,
        name: action.payload,
      };
    },
  },
  // 用来执行副作用操作，例如异步操作
  effects: {
    // * 是指 generator 生成器，可以用 yield 异步操作
    *fetchName(action, { call, put }) {
      try {
        let res = yield call(promise);
        // 触发对应的 dispatch
        yield put({
          type: "updateName",
          payload: res,
        });
      } catch (e) {}
    },
  },
});
```

## 4. 挂载

```js
// Router：类似 react-redux 的 Provider
app.router(<App />);

// Start
app.start("#root");

export default app._store;
```
