const fs = require('fs')
const { resolve } = require('path')
const srcPath = resolve(__dirname, '../../src')
const libTypes = require('../../config').libs.map(lib => lib.name)

function transfTemplate(str = '', data = {}) {
  let resultStr = str
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      resultStr = resultStr.replace(new RegExp(`{{${key}}}`, 'g'), data[key])
    }
  }
  return resultStr
}

/**
 * @description: 转大驼峰
 * @param {*} str
 * @return {*} string
 */
function toCamelCase(str = '') {
  let rest = str.substr(1).replace(/-(\w)/g, ($, $1) => $1.toUpperCase())

  return `${str.substr(0, 1).toUpperCase()}${rest}`
}

function replaceTemplateFiles(filePaths, data, callback) {
  if (typeof filePaths === 'string') {
    filePaths = [filePaths]
  }
  for (const filePath of filePaths) {
    let fileStr = fs.readFileSync(filePath, 'utf-8')
    fileStr = transfTemplate(fileStr, data)
    callback && callback(filePath, fileStr)
  }
}

/**
 * @description: 读取 src 下的全部 blocks 和 components 组件
 * @return {*} [{ name: 'date-picker', type: 'blocks' },]
 */
function getLibs() {
  /* 读取 src 下的全部 blocks 和 components 组件 */

  const libTypeDirs = fs.readdirSync(srcPath)
  // 同步读取制定目录下所有文件名称

  return libTypeDirs
    .filter(type => libTypes.includes(type))
    .reduce((libDirs, type) => {
      const libDir = resolve(srcPath, type)

      // 同步获取相关文件状态信息
      const state = fs.lstatSync(libDir)

      if (state.isDirectory()) {
        // 文件是目录
        const targets = fs.readdirSync(libDir)
        // 同步读取制定目录下所有文件名称

        return libDirs.concat(
          targets.map(lib => ({
            name: lib,
            type,
          })),
        )
      }
      return libDirs
    }, [])
}

module.exports = {
  srcPath,
  getLibs,
  toCamelCase,
  transfTemplate,
  replaceTemplateFiles,
}
