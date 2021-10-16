const http = require("http");

const config = {
  host: "news.baidu.com",
  port: 80,
  method: "GET",
};

// --------------------------------------

const server = http.createServer(function (req, res) {
  // 触发请求
  const client = http.request(config, function (socket) {
    let arr = [];
    socket.on("data", function (data) {
      arr.push(data);
    });

    socket.on("end", function (data) {
      // // end：只接受 string 或 Buffer
      // res.end(Buffer.concat(arr).toString());
      // 推荐 send：都可以
      res.send();
    });
  });

  client.end();
});

server.listen(3000);

server.on("connection", function () {
  console.log("服务已连接");
});

// localhost 页面加载请求
server.on("request", function (req, res) {
  console.log("request");
  //   res.end(req.headers.toString());
});
