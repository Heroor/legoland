const { alias } = require('./config')

module.exports = {
  pages: {
    index: {
      entry: 'website/main.js',
      title: 'Legoland',
    },
  },
  chainWebpack: config => {
    for (const name in alias) {
      config.resolve.alias.set(name, alias[name])
    }

    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true,
      })
    // return config
  },
}
