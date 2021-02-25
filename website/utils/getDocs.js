class Doc {
  context = null
  menus = []
  docMap = {}
  constructor(type) {
    if (type === 'docs') {
      this.context = require.context('@website', true, /README\.md$/)
    } else {
      this.context = require.context('@', true, /README\.md$/)
    }
    this.context.keys().forEach(path => {
      const [docType, docName] = path.substr(2).split('/')
      // console.log(docType, docName)
      if (!this.docMap[docType]) {
        this.docMap[docType] = {}
      }
      if (!this.docMap[docType]) {
        this.docMap[docType] = {}
      }
      this.docMap[docType][docName] = {
        path,
        name: docName,
        module: this.context(path).default,
      }
    })
    // console.log(this.docMap)
  }
}

new Doc()

export default type => {
  let context
  if (type === 'docs') {
    context = require.context('@website', true, /README\.md$/)
  } else {
    context = require.context('@', true, /README\.md$/)
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
