function draw() {
  console.log("触发试图更新");
}

function toProxy(target) {
  let handlers = {
    set(target, key, value, receiver) {
      //   Reflect.set(target, key, value, receiver);
      //   draw();
    },
    get(target, key, receiver) {
      let res = Reflect.get(target, key, receiver);
      if (typeof res === "object") {
        return toProxy(res);
      }
      return res;
    },
    delete() {
      draw();
    },
  };

  let observer = new Proxy(target, handlers);
  return observer;
}

let model = { name: "zs" };
let p = toProxy(model);

p.name = "zs2";
