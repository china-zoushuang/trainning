# 组件

## 创建组件

- ### 函数创建：没有状态
- ### 基于类创建
  > 继承 Component 类，创建组件

```jsx
export default class Banner extends Component {
    static defaultProps = {
        interval: 3000
    }

    // 需要另外安装引入插件 prop-types
    static propTypes = {
        interval: PropTypes.number.isRquired
    }
    // 类的实例
    constructor(props) {
        super(); // ES6 要求，子类的构造函数必须执行一次 super 函数，否则会报错。【下方详解】

        this.state = {} // this.setState({})

        console.log(this.props) // undefined
        // React 在 render 方法中才把 props 挂载到 this 上

        // super 挂载
        super(props);
        console.log(this.props); // object
    }
    render(){
        console.log(this.props) // object
        return <>
    }
}
```

> 注：在 constructor 中必须调用 super 方法，因为子类没有自己的 this 对象，而是继承父类的 this 对象，然后对其进行加工,而 super 就代表了父类的构造函数。super 虽然代表了父类 A 的构造函数，但是返回的是子类 B 的实例，即 super 内部的 this 指的是 B，因此 super() 在这里相当于

```jsx
super(props);
console.log(this.props); // object

// 等价
A.prototype.constructor.call(this, props);
```

## PureComponent

> 只包含必要属性，没有其他非必要的属性，主要用于减少非必要的渲染次数，以提高性能

```jsx
export default class Banner extends PureComponent {
  constructor() {
    super();
    console.log(this); // {props, context, refs, updater,}
  }
}
```

## 单闭合组件

## 双闭合组件

> 可以传子组件，通过 props.children 获取

## 受控组件：直接操作 dom

`ref`

```jsx
export default class App extends Component {
  constructor() {
    super();
    // 声明 ref
    this.inputRef = React.createRef();
  }

  oonSubmit() {
    // 取值
    let value = this.inputRef.current.value;
  }

  render() {
    // 关联
    return <input ref={inputRef} />;
  }
}
```

## 非受控组件：更改 state

`this.setState`
