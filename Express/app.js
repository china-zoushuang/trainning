// const express = require("express");

const express = require("./express");

const app = express();

app.use(function (req, res, next) {
  next();
});

// app.get 实质是向请求队列存储事件，在服务响应后再一一执行
app.get("/", function (res) {
  console.log(res);
});

// 匹配所有 method，匹配所有 pathname
app.all("*", function (req, res) {
  console.log("404 not found");
});
