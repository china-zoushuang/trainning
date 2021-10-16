let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
// 引用动态链接库
let DllReverencePlugin = require('webpack/lib/DllReferencePlugin')
// 大型项目，多文件时可以使用 happypack 进行多线程打包
// 小型项目不建议使用，因为分配线程对耗时可能比打包对所需对时间要更长
let HappyPack = require('happypack')
// 模块的合并
let ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')
module.exports = { // module.exports = {} 注意是 exports
// 当 mode 为 production 时，内部自动调用 uglifyjs 并且实现 tree shaking
// tree shaking：只打包被 used 的函数，可以在 package.json 中添加配置 --display-used-exports
  mode: 'development',
  entry: {
    main: './src/index.js',
    pageA: './src/pageA.js',
    pageB: './src/pageB.js'
  },
  output: { // filename，path
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/, // $ 结尾后缀
        use: 'happypack/loader?id=js',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/ // 正则
      },
      {
        test: /\.css$/,
        use: 'happypack/loader?id=css'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new DllReverencePlugin({
      manifest: path.resolve(__dirname, 'dist', 'dll.manifest.json')
    }),
    new HappyPack({
      id: 'js',
      use: ['babel-loader']
    }),
    new HappyPack({
      id: 'css',
      use: [
        'style-loader',
        'css-loader'
      ]
    }),
    new ModuleConcatenationPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: 'initial', // all, async, initial
          minChunks: 2, // 最小重复次数
          minSize: 0 // 最小重复大小
        },
        vendor: {
          priority: 10, // 权重，意思是指先抽取 vendor，再进行 common 对抽取
          test: /node_modules/, // 限制只对第三方类库进行抽取
          chunks: 'initial',
          minChunks: 2,
          minSize: 0
        }
      }
    }
  },
  devServer: {
    contentBase: './dist'
  }
}