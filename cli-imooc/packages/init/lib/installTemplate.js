import { log } from '@imooccom/utils'
import fse from 'fs-extra'
import path from 'node:path'
import { pathExistsSync } from 'path-exists'
import ora from 'ora'

export default function installTemplate(selectedTemplate, opts) {
  const { force = false } = opts
  const { targetPath, template, name } = selectedTemplate
  const rootDir = process.cwd()
  fse.ensureDirSync(targetPath)
  const installDir = path.resolve(`${rootDir}/${name}`)
  if (pathExistsSync(installDir)) {
    if (!force) {
      log.error(`当前目录下已存在 ${installDir} 文件夹`)
      return
    } else {
      fse.removeSync(installDir)
      fse.ensureDirSync(installDir)
    }
  } else {
    fse.ensureDirSync(installDir)
  }

  copyFile(targetPath, template, installDir)
}

//复制文件函数，用于复制文件到指定路径
function copyFile(targetPath, template, installDir) {
  const originFile = getCacheFilePath(targetPath, template)
  const fileList = fse.readdirSync(originFile)
  const spinner = ora('正在拷贝模板...').start()
  fileList.map((file) => {
    fse.copySync(`${originFile}/${file}`, `${installDir}/${file}`)
  })
  spinner.stop()
  log.success('模板拷贝成功')
}

function getCacheFilePath(targetPath, template) {
  return path.resolve(targetPath, 'node_modules', template.npmName, 'template')
}
