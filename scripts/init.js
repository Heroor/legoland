const fs = require('fs-extra')
const { resolve } = require('path')
const chalk = require('chalk')
const pkg = require('../package.json')
const { getLibs } = require('./shared')
const {
  generateEntryScript,
  generateGlobalScript,
} = require('./shared/generator')
const mainPath = resolve(pkg.main)
const vueGlobalPath = resolve(__dirname, '../website/global.js')

const libs = getLibs()
// 获取组件数组
console.log('libs => ', libs)

const mainSrc = generateEntryScript(libs)
fs.writeFileSync(mainPath, mainSrc, 'utf-8')
// 生成 src/main.js 文件

const globalSrc = generateGlobalScript(libs)
fs.writeFileSync(vueGlobalPath, globalSrc, 'utf-8')
// 生成 website/global.js 文件

console.log(chalk.green(mainPath))
console.log(chalk.green(vueGlobalPath))
console.log()
console.log(chalk.green(`success!`))
