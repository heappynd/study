```js
#!/usr/bin/env node

const commander = require("commander");
const pkg = require("../package.json");

// 获取commander单例
// const program = commander.program;

// 手动实例化Commander实例
const program = new commander.Command();

program
  .name(Object.keys(pkg.bin)[0])
  .usage("<command> [options]")
  .version(pkg.version)
  .option("-d, --debug", "是否开启调试", false)
  .option("-e, --envName <envName>", "获取环境变量");

// 注册命令 <required> [optional]
const clone = program.command("clone <source> [destination]");
clone.description("clone a repository into a newly created directory");
clone.option("-f, --force", "是否强制拷贝");
clone.action((source, destination, cmdObj) => {
  console.log("do clone", source, destination, cmdObj);
});

// 注册子命令
const service = new commander.Command("service");
service
  .command("start [port]")
  .description("start a service")
  .action((port) => {
    console.log("port", port);
  });
// !register
service.command("stop").action(() => {
  console.log("stop service");
});
program.addCommand(service);

// 会去找cli-test-install
program
  .command("install [name]", "install package", {
    // 会去找 cli-install 多个脚手架串行使用
    // executableFile: "cli-install",
    // isDefault: true
    // 默认命中这个
    // hidden: true,
  })
  .alias("i");

// 匹配输入的所有命令
program
  .arguments("<cmd> [options]")
  .description("test command", {
    cmd: "command to run",
    options: "options for command",
  })
  .action((cmd, options) => {
    console.log("cmd", cmd);
    console.log("options", options);
  });

program.parse(process.argv);

// console.log(program.envName);
// program.outputHelp();
// console.log(program.opts());

// npm init aaabbb -> create-aaabbb 找有没有这个包，有的话下载到本地并执行
```
