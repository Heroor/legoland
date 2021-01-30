export default type => {
  let context
  if (type === 'docs') {
    context = require.context('@website', true, /.+\.md$/)
  } else {
    context = require.context('@', true, /.+\.md$/)
  }
  return context
    .keys()
    .filter(path => path.startsWith('./' + type))
    .map(path => {
      const name = path.split(/\.*\//).filter(Boolean)[1]
      return {
        path,
        name,
        context,
        module: context(path).default,
      }
    })
}
