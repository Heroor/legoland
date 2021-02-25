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

function getLibs() {
  const libTypeDirs = fs.readdirSync(srcPath)
  return libTypeDirs
    .filter(type => libTypes.includes(type))
    .reduce((libDirs, type) => {
      const libDir = resolve(srcPath, type)

      const state = fs.lstatSync(libDir)
      if (state.isDirectory()) {
        const targets = fs.readdirSync(libDir)

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
