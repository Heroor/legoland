const hljs = require('highlight.js')
const markdownIt = require('markdown-it')
const md = markdownIt({
  html: true,
  preset: 'default',
  highlight(str, lang) {
    if (!(lang && hljs.getLanguage(lang))) {
      return ''
    }

    return hljs.highlight(lang, str, true).value
  },
})

module.exports = function(tokens, index) {
  const token = tokens[index]
  const info = token.info
  if (token.nesting === 1) {
    const descInfo = info.trim().match(/^demo\s*(.*)$/)
    const desc = descInfo && descInfo.length > 1 ? descInfo[1] : ''
    return `<demo-block>
  <template #desc>${desc ? md.render(desc) : ''}</template>
`
  } else {
    let code = ''
    while (tokens[index] && tokens[index].type !== 'container_demo_open') {
      const str = tokens[index--].content
      code = str + '\n' + code
    }

    const content = `\`\`\`html
${code.trim()}
\`\`\``
    return `</demo-block><source-block>
  ${md.render(content)}
</source-block>`
  }
}
