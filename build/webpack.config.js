const { resolve } = require('path')
const { alias } = require('../config')

module.exports = {
  mode: 'production',
  entry: resolve(__dirname, 'src/main.js'),
  output: {
    filename: 'index.js',
    path: resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'legoland',
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  resolve: {
    alias,
  },
}
