import Command from '@imooccom/command'
import { log } from '@imooccom/utils'
import createTemplate from './createTemplate.js'
import downloadTemplate from './downloadTemplate.js'
import installTemplate from './installTemplate.js'
class InitCommand extends Command {
  get command() {
    return 'init [name]'
  }
  get description() {
    return 'init project'
  }
  get options() {
    return [
      // add option
      ['-f, --force', '是否强制更新', false],
      ['-t, --type <type>', '项目类型 (值: project/page)'],
      ['-tp, --template <template>', '模板名称'],
    ]
  }

  async action([name, opts]) {
    log.verbose('init', name, opts)
    // 1.选择项目模板，生成项目信息
    const selectedTemplate = await createTemplate(name, opts)
    log.verbose('selectedTemplate', selectedTemplate)
    // 2.下载项目模板至缓存目录
    await downloadTemplate(selectedTemplate)
    // 3.安装项目模板至项目目录
    await installTemplate(selectedTemplate, opts)
  }
}

function Init(instance) {
  return new InitCommand(instance)
}

export default Init
