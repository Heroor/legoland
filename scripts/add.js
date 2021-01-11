const fs = require('fs-extra')
const { resolve } = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const { category } = require('./config.js')

const tmpPath = '../templates'
const templatesDirPath = resolve(__dirname, tmpPath)
const templateList = fs.readdirSync(templatesDirPath)

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Input project name',
      default: 'my-component'
      // validate () {

      // }
    },
    {
      type: 'list',
      name: 'templateType',
      message: 'Select type of project',
      choices: category.map(item => item.name)
    },
    {
      type: 'list',
      name: 'templateName',
      message: 'Select template of project',
      choices: templateList
    }
  ])
  .then(res => {
    initTemplate(res)
  })
function initTemplate({ name, templateName, templateType }) {
  void templateType
  const source = resolve(templatesDirPath, templateName)
  const target = resolve('./src', templateType, name)
  fs.copySync(source, target)
  console.log(chalk.green('Init success!'))
}
