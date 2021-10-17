function mobox() {
  function observerable(obj) {
    // 对象中的每个对象 都 new Proxy() 下
    deepProxy(obj);
  }

  function autorun(handler) {}

  return {
    observerable,
    autorun,
  };
}

let obj = {
  user: {
    name: "zs",
  },
};
observerable();

autorun(() => {
  console.log(obj.user.name);
});

obj.user.name = "zs2";

// 收集
// 创建连接
// 中间件
class Reaction {
  constructor() {}
}
