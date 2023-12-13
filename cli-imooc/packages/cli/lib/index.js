const commander = require('commander')
const createInitCommand = require('@imooccom/init')
const { log } = require('@imooccom/utils')
const { program } = commander
const pkg = require('../package.json')

module.exports = function (args) {
  log.info('version', pkg.version)
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', '是否开启调试模式', false)

  // program
  //   .command('init [name]')
  //   .description('init project')
  //   .option('-f, --force', '是否强制更新', false)
  //   .action((name, opts) => {
  //     console.log('init', name, opts)
  //   })

  createInitCommand(program)

  program.parse(process.argv)
}
