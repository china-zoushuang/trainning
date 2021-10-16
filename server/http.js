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
      res.end(Buffer.concat(arr).toString());
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
