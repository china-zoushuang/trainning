# generator

> 生成器执行 -> 返回迭代器

```js
// * 和 yield 搭配使用，yield 产出
function* gen() {
  yield 1000;
  return; // 执行直至遇到 return 迭代完成 done: true
}

// 执行后返回的是迭代器
let a = gen();

// 可暂停，需要触发 next() 进行下一步
a.next();
// { value: 1000, done: true }
```

## 原理

```js
function (context) { // context 上下文

  switch (指针) {
    case 0:
      指针 = 1
      return context.next()
    case 1:
      指针 = 2
      a = context.send()
      return context.next(a)
    case 2:
      指针 = 'end'
      b = context.send()
      return context.next(b)

    ...

    case 'end':
      return context.stop()
  }
}
```

## 在`一个迭代器`中调用`另一个迭代器`的方式

> 被调用的迭代器必须加上 `*`，否则返回 {value: {}, done: false}

```js
function* a() {
  yield 1;
  yield 2;
}
function* b() {
  yield 3;
  yield* a();
  yield 4;
}
let it = b();

it.next(); // { value: 3, done: false }
it.next(); // { value: 1, done: false }
it.next(); // { value: 2, done: false }
it.next(); // { value: 4, done: false }
it.next(); // { value: undefined, done: true }
```

## 使用场景

- 结合 `Promise`

## `async/await` 是 generatator 的`语法糖`
