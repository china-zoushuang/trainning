const http = require("http");
const fs = require("fs");
const p = __dirname + "/1.text";

const server = http.createServer((req, res) => {
  // fs 可读流：返回值是 Buffer
  // res.end() 必须项，否则请求不会响应
  // pipe(res) 即 res.end(Buffer 数据内存)
  fs.createReadStream(p).pipe(res);
});

server.listen(3000, () => {
  console.log("server start");
});
