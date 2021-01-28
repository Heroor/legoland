const md = require('markdown-it')({
  html: true,
})

md.use(require('markdown-it-container'), 'demo', {
  render(tokens, index) {
    // console.log(tokens, index)
    const curToken = tokens[index]
    if (/^demo\s+/.test(curToken.info)) {
      return '\nLEGOLAND_DEMO_START\n'
    } else {
      return '\nLEGOLAND_DEMO_END\n'
    }
  },
})

const defaultRender = md.renderer.rules.fence
md.renderer.rules.fence = (tokens, index, options, env, self) => {
  const token = tokens[index]
  console.log(tokens[index - 1])
  console.log(token)
  if (token.info === 'html') {
    return `
<template>
    <pre v-pre>
      <code class="language-html">${token.content}</code>
    </pre>
</template>
    `
  }
  const result = defaultRender(tokens, index, options, env, self)
  console.log(result)

  return result
}

module.exports = function markdownLoader(src) {
  console.log('\n', md.render(src))
  const demoSrc = 'h("div", {}, "hello1"),h("div", {}, "hello2")'

  return `
<script>
export default {
  render (h) {
    return h('div', {
      class: ['demo-wrap']
    }, [${demoSrc}])
  }
}
</script>
`
}
