# class

> ES6 的语法糖，所以只是写法更加优雅，更加像面对对象的编程，其思想和 ES5 是一致的。

# 高阶函数

> 函数返回函数

# 高阶组件（react）

> 组件返回组件

```jsx
const Auth = (props) => {
    return <Route {...props} render={() => {
        return logged ? <Component /> : <Login />
    }}>
}
export default Auth
```
