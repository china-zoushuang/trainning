# MVC (Model View Controller)

# jsx

## babel-preset-react

> 将 jsx 语法编译成 React.createElement(obj) 模式

```js
React.createElement({
    元素标签,
    标签的属性集合，没有属性就是 null,
    ...React.createElement，多个子节点
})
||
document.createElement(tag)
root.appendChild(dom)
```

# 组件通信

## 父传子

> 属性

## 子传父

> 回调函数

## 兄弟组件

> 拥有共同父级的基于 context（上下文）

- ### 方法一：createContext

```jsx
// context.js
const { Provider, Consumer } = React.createContext();
export { Provider, Consumer };
```

```jsx
// 父组件
import { Provider } from "./context";
export default class Father extends Component {
  constructor() {
    super();
    this.state = {
      money: 100,
    };
  }
  render() {
    return (
      <Provider value={{ money: this.state.money }}>
        <Child />
      </Provider>
    );
  }
}
```

```jsx
// 子组件们
import { Consumer } from "./context";
export default class Father extends Component {
  render() {
    return (
      <Consumer>
        {(value) => {
          return <div>{value.money}</div>;
        }}
      </Consumer>
    );
  }
}
```

- ### 方法二（老方法）：getChildContext
  > 缺陷，需要另外引入 prop-types 包

```jsx
// 父组件
export default class Father extends Component {
  // 必须项目
  static childContextTypes = {
    money: PropTypes.number,
    addAmount: PropTypes.function,
  };
  static getChildContext = () => {
    return {
      money: this.state.money,
      addAmount: this.addAmount,
    };
  };
  constructor() {
    super();
    this.state = {
      money: 100,
    };
  }
}
```

```jsx
// 子组件们
export default class Father extends Component {
  static contextTypes = {
    money: PropTypes.number,
  };
  render() {
    return <div>{this.context.money}</div>;
  }
}
```

## 任意组件

> redux/mobox/dva(connect)

`解决数据单向流动的问题`

# 生命周期

## componentWillMount() {}

`render()`

## componentDidMount() {}

## 修改 state

- ## shouldComponentUpdate() {}
- `return true`
  - ## componentWillUpdate() {}
  - `render()`
  - ## componentDidUpdate() {}

## 接收的 props 改变了

- ## componentWillRecieveProps() {}

`卸载组件`

## componentWillUnmount(){}

```jsx
import ReactDom from "react-dom";
ReactDom.unmountComponentAtNode(node); // 会触发 componentWillUnmount
```
