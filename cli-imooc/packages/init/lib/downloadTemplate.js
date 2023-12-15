import { log, printErrorLog } from '@imooccom/utils'
import fse from 'fs-extra'
import path from 'node:path'
import ora from 'ora'
import { pathExistsSync } from 'path-exists'
import { execa } from 'execa'

function getCacheDir(targetPath) {
  return path.resolve(targetPath, 'node_modules')
}

function makeCacheDir(targetPath) {
  const cacheDir = getCacheDir(targetPath)
  if (!pathExistsSync(cacheDir)) {
    // 任何路径都不存在
    fse.mkdirpSync(cacheDir)
  }
}

async function downloadAddTemplate(targetPath, selectedTemplate) {
  const { npmName, version } = selectedTemplate
  const installCmd = 'npm'
  const installArgs = ['install', `${npmName}@${version}`]
  const cwd = targetPath
  log.verbose('installArgs', installArgs)
  log.verbose('cwd', cwd)
  const subprocess = execa(installCmd, installArgs, { cwd })
  await subprocess
}

export default async function downloadTemplate(selectedTemplate) {
  const { targetPath, template } = selectedTemplate

  makeCacheDir(targetPath)

  const spinner = ora('正在下载模板...').start()
  try {
    await downloadAddTemplate(targetPath, template)
    spinner.stop()
    log.success(`模板下载成功`)
  } catch (e) {
    spinner.stop()
    printErrorLog(e)
  }
}
