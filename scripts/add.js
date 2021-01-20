const fs = require('fs-extra')
const { resolve } = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const { libs } = require('../config')
const { toCamelCase, replaceTemplateFiles } = require('./shared')

const tmpPath = '../templates'
const templatesDirPath = resolve(__dirname, tmpPath)
const templateList = fs.readdirSync(templatesDirPath)
const REPLACE_FILES = ['README.md']

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Input project name',
      default: 'MyComponent',
      // validate () {

      // }
    },
    {
      type: 'list',
      name: 'templateType',
      message: 'Select type of project',
      choices: libs.map(item => item.name),
    },
    {
      type: 'list',
      name: 'templateName',
      message: 'Select template of project',
      choices: templateList,
    },
  ])
  .then(res => {
    initTemplate(res)
  })

function initTemplate({ name = '', templateName, templateType }) {
  const libName = toCamelCase(name)
  const templatesPath = resolve(templatesDirPath, templateName)
  const libPath = resolve('./src', templateType, libName)

  console.log(`Create "${libName}" from template ${templateName}...`)
  fs.copySync(templatesPath, libPath)
  const tmpConfigPath = resolve(libPath, 'template.config.js')

  console.log('Replacing variable...')
  let templateFiles = Array.from(REPLACE_FILES)
  const hasTmpConfig = fs.existsSync(tmpConfigPath)
  if (hasTmpConfig) {
    const env = require(tmpConfigPath) || {}
    if (env.templateFiles) {
      templateFiles = env.templateFiles
    }
    fs.removeSync(tmpConfigPath)
  }
  replaceTemplateFiles(
    templateFiles.map(p => resolve(libPath, p)),
    {
      LIB_NAME: libName,
      LIB_TYPE: templateType,
    },
    (filePath, fileStr) => fs.writeFileSync(filePath, fileStr, 'utf-8'),
  )
  console.log(chalk.green(`${libName} init success!`))
}
