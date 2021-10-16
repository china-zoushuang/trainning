const path = require("path");
// argv 命令行输入的参数 --mode development
module.exports = (env, argv) => ({
  /**专门处理性能优化*/
  optimization: {
    minimizer: [
      new UglyfyJsWebpackPlugin({
        cache: true,
      }),
    ],
  },
  module: {
    // 指定不需要解析的依赖，加快解析速度
    noParse: /lodash|jquery/,
  },
  externals: {
    jquery: "jquery", // 告知 jquery 是通过外部 cdn 引用的，不要打包，有效的减小包的大小
  },
  /************/

  /** for dev */
  devtool: "env-source-map", // source-map, cheap-module-source-map
  // 监听文件变化，自动重新打包
  watch: true,
  watchOptions: {
    poll: 100, // 轮询
    aggregateTimeout: 500, // 节流/防抖
    ignore: /node_modules/,
  },
  devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, "dist"),
    compress: true, // 压缩
    // 代理方法一
    proxy: {
      "/api": {
        path: "http://localhost:3000",
        pathRewrite: {
          // 当服务端地址没有 /api 时，如果要进行匹配，则需要把 ‘/api’ 替换成 ‘’
          "^/api": "",
        },
      },
    },
    // 代理方法二（不需要启服务器，简单的数据 mock）
    // let app = express()
    before(app) {
      app.get("/user", (req, res) => {
        app.json({ key: "value" });
      });
    },
    after(app) {
      app.use((err, req, res, next) => {
        if (err) app.send("请求错误");
      });
    },
  },
  /************/

  mode: "development", // production
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  rules: [
    {
      test: /\.css$/, // /\.jsx?$/
      include: path.resolve(__dirname, "src"),
      exclude: /node_modules/,
      use: ["plugin", "loader2", "loader1"], // 从右向左执行
    },
  ],
});
