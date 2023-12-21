import { log, makeInput, makeList } from '@imooccom/utils'
import fse from 'fs-extra'
import path from 'node:path'
import { pathExistsSync } from 'path-exists'
import ora from 'ora'
import ejs from 'ejs'
import glob from 'glob'

async function ejsRender(targetPath, installDir, template, name) {
  log.verbose('ejsRender', installDir, template)
  const pluginPath = getPluginFilePath(targetPath, template)
  // console.log('pluginPath', pluginPath)
  let data = {}
  if (pathExistsSync(pluginPath)) {
    const pluginFn = (await import(pluginPath)).default
    const api = {
      makeList: makeList,
      makeInput: makeInput,
    }
    data = await pluginFn(api)
  }
  const ejsData = {
    data: {
      name,
      ...data,
    },
  }
  const { ignore, value } = template
  glob(
    '**',
    {
      cwd: installDir,
      nodir: true,
      ignore: [...ignore, 'node_modules/**'],
    },
    (err, files) => {
      files.forEach((file) => {
        const filePath = path.join(installDir, file)
        // console.log(filePath)
        log.verbose('filePath', filePath)
        ejs.renderFile(filePath, ejsData, (err, result) => {
          if (err) {
            log.error(err)
          } else {
            fse.writeFileSync(filePath, result)
          }
        })
      })
    }
  )
}

export default async function installTemplate(selectedTemplate, opts) {
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
  await ejsRender(targetPath, installDir, template, selectedTemplate.name)
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

function getPluginFilePath(targetPath, template) {
  return path.resolve(targetPath, 'node_modules', template.npmName, 'plugins')
}
