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
      .loader('./build/markdown-loader/markdown-compiler')
      .options({
        raw: true,
        wrapper: 'article',
        wrapperClassName: 'markdown-body',
        use: [
          [
            require('markdown-it-container'),
            'demo',
            {
              validate: params => params.trim().match(/^demo\s*(.*)$/),
              render: require('./build/markdown-loader/container-parser.js'),
            },
          ],
        ],
      })
  },
}
