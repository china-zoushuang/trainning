// chunk.on('connectiong/end/data/error', function() {})
// chunk.write('')
// chunk.end()
// chunk.setEncoding('utf8')

// server.maxConnections
// server.getConnections(function(err, count) {})
// server.close() // 无法再创建链接，已连接的服务依旧正常运行

const net = require("net");

const port = 3000;

let clients = [];

const server = net.createServer(function (chunk) {
  chunk.setEncoding("utf8");
  server.getConnections(function (err, count) {
    if (err) {
      console.log(err);
    } else {
      console.log(`当前在线人数${count}人`);
      chunk.write(`当前在线人数${count}人`);
    }
  });

  chunk.on("data", function (data) {
    clients.forEach((c) => {
      if (c !== chunk) c.write(data);
    });
  });

  chunk.on("end", function () {
    clients = clients.filter((c) => c !== chunk);
    clients.forEach((c) => {
      if (c !== chunk) c.write(`当前在线人数${clients.length}人`);
    });
  });
});

server.maxConnections = 2;

server.listen(3000, function () {
  console.log(`服务已启动，当前运行端口${port}`);
});

server.on("connection", function (chunk) {
  console.log(chunk.remoteAddress);
  chunk.write("欢迎\r\n");
  clients.push(chunk);
});

server.on("error", function (err, chunk) {
  console.log(err, chunk);
});
