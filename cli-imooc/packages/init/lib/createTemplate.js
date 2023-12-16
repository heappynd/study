import {
  getLatestVersion,
  log,
  makeInput,
  makeList,
  printErrorLog,
} from '@imooccom/utils'
import { homedir } from 'node:os'
import path from 'node:path'
import { request } from '@imooccom/utils'

const ADD_TYPE_PROJECT = 'project'
const ADD_TYPE_PAGE = 'page'

/* const ADD_TEMPLATE = [
  {
    name: 'vue3项目模板',
    value: 'template-vue3',
    npmName: '@imooc.com/template-vue3',
    version: '1.0.1',
  },
  {
    name: 'react18项目模板',
    value: 'template-react18',
    npmName: '@imooc.com/template-react18',
    version: '1.0.0',
  },
] */
const ADD_TYPE = [
  { name: '项目', value: ADD_TYPE_PROJECT },
  { name: '页面', value: ADD_TYPE_PAGE },
]
// 缓存目录
const TEMP_HOME = '.cli-imooc'

// 通过 API 获取项目模板
async function getTemplateFromAPI() {
  try {
    const data = await request({
      url: '/v1/project',
      method: 'get',
    })
    log.verbose('template', data)
    return data
  } catch (error) {
    printErrorLog(error)
    return null
  }
}

function getAddType() {
  return makeList({
    choices: ADD_TYPE,
    message: '请选择初始化类型',
    defaultValue: ADD_TYPE_PROJECT,
  })
}
// 获取项目名称
function getAddName() {
  return makeInput({
    message: '请输入项目名称',
    defaultValue: '',
    validate(v) {
      if (v.length > 0) {
        return true
      }
      return '项目名称必须输入'
    },
  })
}

function getAddTemplate(ADD_TEMPLATE) {
  return makeList({
    message: '选择项目模板',
    choices: ADD_TEMPLATE,
  })
}
// 安装目录
function makeTargetPath() {
  // C:\Users\xxx or /Users/xxx
  // console.log(homedir())
  return path.resolve(`${homedir()}/${TEMP_HOME}`, 'addTemplate')
}

/**
 * @example
 * cli-imooc init aaa -t project -tp template-vue3 -f
 * cli-imooc init
 */
export default async function createTemplate(name, opts) {
  // 获取项目模板
  const ADD_TEMPLATE = await getTemplateFromAPI()
  if (!ADD_TEMPLATE) {
    throw new Error('获取项目模板失败')
  }

  const { type = null, template = null } = opts
  //! 获取类型
  let addType
  if (type) {
    addType = type
  } else {
    addType = await getAddType()
  }
  log.verbose('addType', addType)

  if (addType === ADD_TYPE_PROJECT) {
    //! 获取项目名称
    let addName
    if (name) {
      addName = name
    } else {
      addName = await getAddName()
    }
    log.verbose('addName', addName)
    //! 获取项目模板
    let selectedTemplate
    if (template) {
      selectedTemplate = ADD_TEMPLATE.find((tp) => tp.value === template)
      if (!selectedTemplate) {
        throw new Error(`项目模板 ${template} 不存在`)
      }
    } else {
      const addTemplate = await getAddTemplate(ADD_TEMPLATE)
      selectedTemplate = ADD_TEMPLATE.find((item) => item.value === addTemplate)
      log.verbose('addTemplate', addTemplate)
    }
    log.verbose('selectedTemplate', selectedTemplate)
    //! 获取最新版本号
    const latestVersion = await getLatestVersion(selectedTemplate.npmName)
    log.verbose('latestVersion', latestVersion)

    const targetPath = makeTargetPath(addName)

    return {
      type: addType,
      name: addName,
      template: selectedTemplate,
      targetPath,
    }
  } else {
    throw new Error(`创建的项目类型 ${addType} 不支持`)
  }
}
