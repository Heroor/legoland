const { toCamelCase } = require('./index')
const pkg = require('../../package.json')

const getImports = (libs, isRelative = false) =>
  libs
    .map(lib => {
      return `import ${toCamelCase(lib.name)} from '${isRelative ? './' : '@'}${
        lib.type
      }/${lib.name}'`
    })
    .join('\n')

/**
 * @description: 生成 src/main.js 文件字符串
 * @param {*} libs 组件配置数组
 * @return {*} 文件字符串
 */
exports.generateEntryScript = function(libs) {
  const importsSrc = getImports(libs, true)
  // 生成 import 头部
  const libNames = libs.map(lib => toCamelCase(lib.name))
  // 组件名称（大驼峰）
  const exportsSrc = libNames.join(',\n  ')
  // 导出名称

  const resultSrc = `// Generated by cli
${importsSrc}

export {
  ${exportsSrc},
}

const Libs = [
  ${libNames.join(',\n  ')},
]

function install(Vue) {
  Libs.forEach(lib => {
    Vue.use(lib)
  })
}

export default {
  version: '${pkg.version}',
  install,
  ${exportsSrc},
}
`
  return resultSrc
}

/**
 * @description: 生成 website/global.js 文件字符串
 * @param {*} libs
 * @return {*} 字符串
 */
exports.generateGlobalScript = function(libs) {
  const importsSrc = getImports(libs)
  const usesSrc = libs
    .map(lib => `Vue.use(${toCamelCase(lib.name)})`)
    .join('\n  ')

  const resultSrc = `// Generated by cli
${importsSrc}

export default function installGlobal(Vue) {
  ${usesSrc}
}
`
  return resultSrc
}
