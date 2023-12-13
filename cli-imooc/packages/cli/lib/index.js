import { program } from 'commander'
import createInitCommand from '@imooccom/init'
import { log, isDebug } from '@imooccom/utils'
import semver from 'semver'
import chalk from 'chalk'
import { dirname } from 'dirname-filename-esm'
import path from 'node:path'
import fse from 'fs-extra'

const __dirname = dirname(import.meta)
const pkgPath = path.resolve(__dirname, '../package.json')
const pkg = fse.readJSONSync(pkgPath)

const LOWEST_NODE_VERSION = '14.0.0'

function checkNodeVersion() {
  log.verbose('node version', process.version)
  if (!semver.gte(process.version, LOWEST_NODE_VERSION)) {
    throw new Error(
      chalk.red(`cli-imooc 需要安装 ${LOWEST_NODE_VERSION}以上版本的Node.js`)
    )
  }
}

function preAction() {
  // 检查 node 版本
  checkNodeVersion()
}

process.on('uncaughtException', (e) => {
  if (isDebug()) {
    console.log(e)
  } else {
    console.log(e.message)
  }
})

export default function (args) {
  log.info('version', pkg.version)
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', '是否开启调试模式', false)
    .hook('preAction', preAction)

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
