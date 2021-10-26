## 依赖

### 1. Compiler

### 2. Compilcation

---

## 实现

### 1. 定义类，并导出

```js
class MyPlugin {
  construtor() {}

  // 在 webpack 中定义时，webpack 会自动注入 compiler
  apply(compiler) {}
}
module.exports = MyPlugin;
```
