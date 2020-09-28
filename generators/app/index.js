const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'your project name is: ',
        default: this.appname
      },
      {
        type: 'input',
        name: 'title',
        message: 'you index.html title is: ',
        default: 'index.html'
      },
      {
        type: 'input',
        name: 'staticPath',
        message: 'you staticPath is: ',
        default: 'assets'
      },
      {
        type: 'input',
        name: 'cssPath',
        message: 'you cssPath is: ',
        default: 'css'
      },
      {
        type: 'input',
        name: 'jsPath',
        message: 'you jsPath is: ',
        default: 'js'
      }
    ])
    .then(answers => {
      this.answers = answers
    })
  }
  writing () {
    // 模板位置
    const templ = this.templatePath('templ.html')
    const output = this.destinationPath('index.html')
    const context = { 
      name: this.answers.name, 
      staticPath: this.answers.staticPath, 
      cssPath: this.answers.cssPath, 
      jsPath: this.answers.jsPath,
      title: this.answers.title
    }
    // 初始化css
    const cssCon = `
      body {
        background-color: #999;
        color: #333;
      }
    `
    // 初始化js
    const jsCon = `
      console.log('${this.answers.name}')
    `
    // 写入模板文件
    this.fs.copyTpl(templ, output, context)
    // 写入css文件
    this.fs.write(
      this.destinationPath(`${this.answers.staticPath}/${this.answers.cssPath}/index.css`),
      cssCon
    )
    // 写入js文件
    this.fs.write(
      this.destinationPath(`${this.answers.staticPath}/${this.answers.jsPath}/index.js`),
      jsCon
    )
  }
}