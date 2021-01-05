const path = require('path')

module.exports = {
  pages: {
    index: {
      entry: 'src/website/main.js',
      title: 'Legoland'
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve('src/website'))
      .set('@components', path.resolve('src/components'))
      .set('@blocks', path.resolve('src/blocks'))
      .set('@pages', path.resolve('src/pages'))
      .set('@layouts', path.resolve('src/layouts'))
      .set('@templates', path.resolve('src/templates'))
  }
}
