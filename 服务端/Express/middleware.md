# 中间件

## app.use

> 处理 http 请求到来和路由处理中间环节事件的函数，用来完成各种特定的任务，例如：检查用户登录情况、授权情况等。

```js
app.use(pathname, function (req, res, next) {
  req.on("data", function (data) {
    next();
  });
  req.on("end", function (data) {
    next();
  });
  req.on("err", function (data) {
    next();
  });
  // 和 tapable 的 Async\*Hook 类似，并且当 next(err) 有参数时，则不会执行之后所有正常的中间件或者请求，而是执行定义的错误中间件
});
```

```js
// 错误处理中间件
app.use(pathname, function (err, req, res, next) {
  next();
});
```

> 与 app[method] 同样顺序存储事件队列中，顺序执行

## res.render 使用模版引擎渲染

> 将数据生成 html，传统方式是通过标签字符串拼接，但是对于庞大复杂的数据而言，模版引擎更方便

```html
<!-- index.ejs 模版 -->
<div><%= title %></div>
<ul>
  <%for(var i in list){%>
  <li><%= list[i].text %></li>
  <li><%}%></li>
</ul>
```

### 1. 指定模版引擎，即指定模版文件的后缀名

```js
// app.set 作用是设置常量的
app.set("view-engine", "ejs");
```

### 2. 自定义模版后缀，并关联模版引擎

```js
app.set("view-engine", "html");
// 模版后缀和渲染方式的对应关系
app.engine(".html", require("ejs").__express);
```

### 3. 指定模版存储根目录

```js
app.set("view", 绝对路径);
```

### 4. 渲染

```js
// 将模版和 data 绑定，并渲染到页面上
// 类似 fs.createReadStream(path).pipe(res)
res.render(filename, data);
```
