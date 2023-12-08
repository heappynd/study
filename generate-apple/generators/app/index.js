const Generator = require("yeoman-generator");
const installFn = require("yeoman-generator/lib/actions/install");

Object.assign(Generator.prototype, installFn);

module.exports = class extends Generator {
  constructor() {
    super(...arguments);
    this.answers = {};
  }
  initializing() {
    console.log("欢迎使用脚手架！");
  }
  prompting() {
    return this.prompt([
      {
        type: "input",
        name: "name",
        message: "请输入项目名称",
        default: "my-project",
      },
      {
        type: "input",
        name: "version",
        message: "请输入项目版本号",
        default: "1.0.0",
      },
      {
        type: "input",
        name: "description",
        message: "请输入项目描述",
        default: "my-project",
      },
    ]).then((ans) => {
      this.answers = ans;
    });
  }
  writing() {
    const { name } = this.answers;
    this.destinationRoot(this.destinationPath(name));
    this.fs.copyTpl(
      `${this.templatePath()}/**/!(_)*`,
      this.destinationPath(),
      this.answers,
      {},
      {
        globOptions: {
          dot: true,
        },
      }
    );
  }

  install() {
    console.log("start install");
    this.npmInstall();
  }

  end() {
    console.log("可以开始开发");
    console.log(`cd ${this.answers.name}`);
    console.log("npm run dev");
  }
};
