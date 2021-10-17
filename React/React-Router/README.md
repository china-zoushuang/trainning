# 路由

```jsx
import { Router, Route, Link, Switch, withRouter } from "react-router-dom";
```

## HashRouter: hash 路由

> 优势：栈结构，便于历史管理
> 缺陷：上线不用 hash，因为有 # 锚点，不利于

### 原理

```js
window.addEventListener("hashchange", function () {});
```

## BrowserRouter: h5 api 路由（history）

> 缺陷：会出现 404

### 原理

```js
history.pushState(data:Object, title:String, url:String)
history.replaceState(data:Object, title:String, url:String)
```

# Switch

> 优势：可节约性能

```jsx
// 类似 switch case
<Router>
  <Switch>
    <!-- excat 模糊/绝对匹配 -->
    <Route path="/" excat="true"/>
    <Route path="/news" />
    <Route path="/about" />
  </Switch>
</Router>
```

# withRouter

`经过<Route component={Component} />操作的组件会拥有 Route 组件赋予的属性，例如：history.push()`\
`未经过<Route component={Component} />操作的组件，想要跳转或者操作 history，可以通过 withRouter 包裹一下`

```jsx
export default withRouter(Component);
```

## 原理

```jsx
// withRouter.js

export default (component) {
  // 必须返回函数，如果单纯返回组件，会被 React.createElement 转成 Object
  return () => <Route component={component} />
}
```
