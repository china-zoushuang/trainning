# MVC (Model View Controller)

# jsx

## babel-preset-react

> 将 jsx 语法编译成 React.createElement(obj) 模式

```javascript
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

```jsx
// 父组件
export default class Father extends Component {
  // 必须项目
  static childContextTypes = {
    amount: PropTypes.number,
    addAmount: PropTypes.function,
  };
  static getChildContext = () => {
    return {
      amount: this.state.amount,
      addAmount: this.addAmount,
    };
  };
  constructor() {
    super();
    this.state = {
      amount: 100,
    };
  }
}
```

```jsx
// 子组件们
export default class Father extends Component {
  static contextTypes = {
    amount: PropTypes.number,
  };
  render() {
    return <div>{this.context.amount}</div>;
  }
}
```

> redux/mobox/dva(connect)

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
