import { log } from '@imooccom/utils'
import { program } from 'commander'
import { dirname } from 'dirname-filename-esm'
import fse from 'fs-extra'
import path from 'node:path'
import semver from 'semver'

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

export default function createCLI() {
  log.info('version', pkg.version)
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', '是否开启调试模式', false)
    .hook('preAction', preAction)

  program.on('command:*', (obj) => {
    log.error(`未知的命令: ${obj[0]}`)
  })

  program.on('option:debug', () => {
    if (program.opts().debug) {
      log.verbose('debug', 'launch debug mode')
    }
  })

  return program

  // program
  //   .command('init [name]')
  //   .description('init project')
  //   .option('-f, --force', '是否强制更新', false)
  //   .action((name, opts) => {
  //     console.log('init', name, opts)
  //   })
}
