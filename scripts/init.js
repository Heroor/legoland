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
const mainSrc = generateEntryScript(libs)
fs.writeFileSync(mainPath, mainSrc, 'utf-8')

const globalSrc = generateGlobalScript(libs)
fs.writeFileSync(vueGlobalPath, globalSrc, 'utf-8')

console.log(chalk.green(mainPath))
console.log(chalk.green(vueGlobalPath))
console.log()
console.log(chalk.green(`success!`))
