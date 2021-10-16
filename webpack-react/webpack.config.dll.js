// 动态链接库，分开打包库文件，以便提升打包速度
// 需要在 webpack.config.js 中利用 DllReferencePlugin 来引用 dll,manifest.json
// 需要在 index.html 中添加 script 引用 dll.js
let path = require('path')
let DllPlugin = require('webpack/lib/DllPlugin')
module.exports = {
  mode: 'development',
  entry: {
    dll: [
      'react',
      'react-dom'
    ]
  },
  output: {
    filename: 'dll.js',
    path: path.resolve(__dirname, 'dist'),
    library: '[name]' // 由于打包好对文件会自动被一个函数包裹，所以为其增加变量名，实现引用，例：var dll = function () {}
  },
  plugins: [
    new DllPlugin({
      name: '[name]', // 必须与 library 一致，才能引用
      path: path.resolve(__dirname, 'dist', '[name].manifest.json')
    })
  ]
}