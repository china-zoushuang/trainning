# nextTick

## 原理：

`如果环境支持 Promise，则使用 Promise，否则将其转成宏任务。`

> 浏览器中，先执行栈中代码，再去调用并执行全部微任务，再执行宏任务

- 宏任务

  - setTimout
  - setInterval
  - setImmediate (IE)
  - MessageChannel

  ```js
  var channel = new MessageChannel();
  var port1 = channel.port1;
  var port2 = channel.port2;

  // 消息接收
  port1.onmessage = function (event) {
    console.log("port1收到来自port2的数据：" + event.data);
  };
  port2.onmessage = function (event) {
    console.log("port2收到来自port1的数据：" + event.data);
  };

  // 消息发布
  port1.postMessage("发送给port2");
  port2.postMessage("发送给port1");
  ```

- 微任务

  - Promise
  - MutationObserver `监视 DOM 元素`

  ```js
  // 初始化观察者
  let observer = new MutationObserver((target, observer) => {});

  // 绑定
  observer.observe(DOM, {
    ...需观察的 DOM 属性值
  });

  // 停止观察
  observer.disconnect()
  ```
