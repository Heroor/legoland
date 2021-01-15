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
  },
}
