export default type => {
  const contents = require.context('@', true, /README\.md$/)
  return contents
    .keys()
    .filter(path => path.startsWith('./' + type))
    .map(path => {
      const name = path.split(/\.*\//).filter(Boolean)[1]
      return {
        path,
        name,
        contents,
        module: contents(path).default,
      }
    })
}
