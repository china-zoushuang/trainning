// * 配合 yield 一起使用， yield 产出
function* gen() {
  yield 1000;
}

let a = gen(); // 生成迭代器，可暂停，需要执行 next() 才能进行下一步

console.log(a);
// Object [Generator] {}

console.log(a.next());
console.log(a.next());
// { value: 1000, done: true }
// { value: undefined, done: true }
