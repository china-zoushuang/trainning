## BFC
- block format content 块级格式化内容
- 防止边距重叠、清除浮动、块级内容互不影响
- display: inline-block/table-cell
- position 不为 static/relative
- float 不为 none
- overflow 不为 visible

## layout
- display: flex;
- display: grid; grid-template-rows, grid-template-columns, grid-template-areas/grid-area
- display: table; display: table-cell;
- float
- position: absolute;

## 事件级别
- DOM0
  - document.onclick
- DOM1
- DOM2
  - document.addEventListener('click', function(){}, false)
- DOM3
  - document.addEventListener('keyup', function(){}, false)

## 事件模型
- 捕获
  - window/document/document.documentElement/document.body/dom
- 冒泡
  - 阻止冒泡：event.stopPropagation()

## 事件流
- 捕获 - 目标 - 冒泡

## event 常见应用
- event.preventDefault()
- event.stopPropagation()
- event.stopImmediatePropagation() 当 dom 注册了多个事件，可以通过这个改变优先级
- event.currentTarget 为父级绑定事件，可以通过这个获取当前子元素
- event.target 绑定事件当元素

## 自定义事件
- var newEvent = new Event(name)
- var newEvent = new CustomEvent(name, params)
- el.addEventListener(name, function(){}, false)
- el.dispatchEvent(newEvent)

## 创建对象
- var obj = {}
- var P = {} var obj = Object.creat(P)
- var M = function () {this.name = 'str'} var obj = new M

## new 原理
var new =  function (func) {
  var obj = Object.creat(func.prototype)
  var run = func.call(obj)
  if (typeof run === 'object') {
    return run
  } else {
    return obj
  }
}

## 类当声明
- function Animal () {
    this.name = ''
  }
- class Animal {
    constructor () {
      this.name = ''
    }
  }

## 继承
- Parent.call(this) 
  - 缺点：部分继承，无法继承 Parent.prototype
- Child.prototype = Parent.prototype
  - 缺点：实例共享引用类型
- 组合 Parent.call(this) Child.prototype = Parent.prototype
  - 缺点：无法判断实例的构造函数是 Child or Parent
- 组合 Parent.call(this) Child.prototype = Object.Create(Parent.prototype)

## 数据双向绑定
- observer
  - Object.defineProperty
- compiler
  - fragment 内存碎片
    - 不操作dom，避免回流，页面重新渲染，降低性能
    - 在内存进行操作：document.createDocumentFrament 新建内存碎片
    - 将页面 element 移动到 frament 中，操作完成后，再返回到页面中
    - 类数组转数组
      1、Array.prototype.forEach.call(类数组, item => {})
      2、Array.from(类数组).forEach(item => {}) // es6
    - 对象转数组
      1、Object.keys(obj)
      2、Object.values(obj)
- watcher
  - 新老值对比

## nexttick 将同步转为异步，并且异步执行 callback
- Promise
- MutationOberver // h5 新 api，用来监视 dom 到变动
  - var mo = new MutationObserver(callback)
    mo.observe(dom, config)
    mo.disconnect()
- setTimeout 0

## vuex mutation vs action
- mutation
  - 同步
  - 适用数据与视图分离（不用等待 dom 渲染）
- action
  - 异步