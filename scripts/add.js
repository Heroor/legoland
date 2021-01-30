const fs = require('fs-extra')
const { resolve } = require('path')
const inquirer = require('inquirer')
const { libs } = require('../config')
const { srcPath, toCamelCase, replaceTemplateFiles } = require('./shared')

const tmpPath = '../templates'
const templatesDirPath = resolve(__dirname, tmpPath)
const templateList = fs.readdirSync(templatesDirPath)
const REPLACE_FILES = ['README.md', './src/index.vue']
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Input project name',
      default: 'gt-example',
      validate(name) {
        if (!name.trim()) return false

        const libTypeDirs = fs.readdirSync(srcPath)
        for (const type of libTypeDirs) {
          const hasLib = fs.existsSync(resolve(srcPath, type, name))
          if (hasLib) {
            return `"src/${type}/${name}" is already exist`
          }
        }
        return true
      },
    },
    {
      type: 'list',
      name: 'templateType',
      message: 'Select type of project',
      choices: libs.map(item => item.name),
    },
    // {
    //   type: 'autocomplete',
    //   name: 'libGroup',
    //   message: 'Select group of project',
    //   default: 'form',
    //   source: (answersSoFar, input) => {
    //     if (input) {
    //       const res = ['form', 'chart', 'basic'].filter(v => v.includes(input))
    //       return res.length ? res : [input]
    //     } else {
    //       return ['form', 'chart', 'basic']
    //     }
    //   },
    // },
    {
      type: 'list',
      name: 'templateName',
      message: 'Select template of project',
      choices: templateList,
    },
  ])
  .then(res => {
    addTemplate(res)
    // init main.js / install global components
    require('./init')
  })

function addTemplate({ name, libGroup, templateName, templateType }) {
  const libName = toCamelCase(name)
  const templatesPath = resolve(templatesDirPath, templateName)
  const libPath = resolve(srcPath, templateType, name)

  console.log(`Create "${name}" from template ${templateName}...`)
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
      LIB_GROUP: libGroup,
    },
    (filePath, fileStr) => fs.writeFileSync(filePath, fileStr, 'utf-8'),
  )
}
