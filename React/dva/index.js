import React from "react";
import ReactDom from "react-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import createSagaMiddleware from "react-saga";
import { fork, call, put, takeEvery } from "react-saga/effects"; // 处理复杂庞大的异步操作

function dva() {
  let app = {
    _model: [],
    _router: null,
    model,
    router,
    start,
  };

  function model(m) {
    /*
        m = {
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
                let res = yield call(promise); // 阻塞操作
                // 触发对应的 dispatch
                yield put({
                type: "updateName",
                payload: res,
                });
            } catch (e) {}
            },
        },
        };
    */
    app._model.push(m);
  }
  function router(component) {
    // component:Function，例如 <App />
    app._router = component;
  }
  function start(dom) {
    /**
     * 整合 reducers
     */
    let combinedReducers = app._model.reduce((memo, cur) => {
      memo[cur.namespace] = (state = state, action) => {
        let reducer = cur.reducer[action.type];
        if (reducer) {
          return reducer(state, action);
        } else {
          return state;
        }
      };
    }, {});
    let store = createStore(combinedReducers);

    /**
     * 处理 effects
     */
    function* saga() {
      for (let model of app._model) {
        let { effects } = model;
        for (let key in effects) {
          let effect = effects[key];
          // takeEvery 会触发 fork 创建新的子进程执行 effect 函数，好处是不会阻塞
          yield takeEvery(key, effect, { call, put });
        }
      }
    }
    let sagaMiddleware = createSagaMiddleware();
    sagaMiddleware.run(saga);

    // dom:String，例如 #app
    const App = app._router;
    ReactDom.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector(dom)
    );
  }

  return app;
}
export default dva;
// import dva from 'dva'

export { connect };
// import {connect} from 'dva'
