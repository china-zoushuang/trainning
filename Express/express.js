const http = require("http");

function express() {
  function app(req, res) {
    const method = req.method;
    const [pathname, query] = req.url.split("?");
    for (let i = 0; i < this.request.length; i++) {
      let element = this.request[i];
      if (
        (element.pathname === pathname || element.pathname === "*") &&
        (element.method === method || element.method === "all")
      ) {
        element.callback(req, res);
        return;
      }
    }
    res.end("no match");
  }
  app.requests = [];
  // handler 包含 next 参数
  app.use = function (pathname, handler) {
    app.requests.push(handler);
  }[
    // app.get = function (pathname, callback) {
    //   let request = {
    //     method: "GET",
    //     pathname,
    //     callback,
    //   };
    //   this.requests.push(request);
    // };
    ("GET", "POST", "PUT")
  ].map((method) => {
    app[item] = function (pathname, callback) {
      let request = {
        method,
        pathname,
        callback,
      };
      this.requests.push(request);
    };
  });
  app.all = function (pathname, callback) {
    let request = {
      method: "all",
      pathname,
      callback,
    };
    this.requests.push(request);
  };
  app.listen = function (...args) {
    const server = http.createServer(app);
    server.listen(3000, function (...args) {
      console.log(...args);
    });
  };
  return app;
}

module.exports = express;
