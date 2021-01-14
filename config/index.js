const { resolve } = require('path')

module.exports = {
  libs: [
    {
      name: 'components',
      label: '组件'
    },
    {
      name: 'blocks',
      label: '区块'
    },
    {
      name: 'pages',
      label: '页面'
    },
    {
      name: 'layouts',
      label: '布局'
    },
    {
      name: 'templates',
      label: '模板'
    }
  ],
  alias: {
    '@': resolve(__dirname, '../src'),
    '@website': resolve(__dirname, '../src/website'),
    '@pages': resolve(__dirname, '../src/pages'),
    '@blocks': resolve(__dirname, '../src/blocks'),
    '@layouts': resolve(__dirname, '../src/layouts'),
    '@templates': resolve(__dirname, '../src/templates'),
    '@components': resolve(__dirname, '../src/components')
  }
}
