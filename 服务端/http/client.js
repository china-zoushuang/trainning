const http = require("http");
const fs = require("fs");
// fs 可写流
const writeStream = fs.createWriteStream(__dirname + "/download.text");

const config = {
  host: "localhost",
  port: 3000,
  method: "GET",
  headers: {},
};

// http.request(config, (res) => {}) // 仅 res 一个参数，没有 req
const client = http.request(config, (res) => {
  const buffers = [];
  // 必须项：监听服务器 end 事件返回的参数
  res.on("data", (data) => {
    buffers.push(data);
  });
  // 必须项：最终操作
  res.on("end", () => {
    writeStream.write(Buffer.concat(buffers));
  });
});

// 必须项：否则接口不会响应
client.end();
