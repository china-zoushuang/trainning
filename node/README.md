# 单线程

> 实际上并非单线程，因为 node 自身还有 I/O 线程（网络 I/O，磁盘 I/O），这些 I/O 线程是由更底层的 `Libnuv` 处理的（`多线程处理的封装`）

# 高并发

- ## 事件驱动

  > Execution Context Stack 执行栈

- ## 异步非阻塞 I/O 模型

# Event Loop 事件环

- ## Queue 队列
- ## Stack 栈
- ## Call Task 调用

- ## Event Table 回调函排班表
- ## Event Queue 回调函数队列
  - 微任务队列

# 优缺点

- ## 优点

  - `高并发`
  - 适合 `I/O 密集型`应用

- ## 缺点

  - 不适合 CPU 密集型（计算量大）应用
  - 可靠性低，由于单进程、单线程的原因，一旦代码某个环节奔溃，整个程序崩溃

    - > 解决：

      - `负载均衡`: Nginx 反向代理，开多个进程，绑定多个端口

      - `保活`：forever、nodemon 自动重启 node 服务
      - `重启进程`：主进程 pm2、子进程 fork

  - Debug 不方便，错误没有 stack trace
