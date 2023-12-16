import log from './log.js'
import isDebug from './isDebug.js'
import { makeList, makeInput } from './inquirer.js'
import { getLatestVersion } from './npm.js'
import request from './request.js'

// log.http('request', 'request to: https://www.baidu.com')
// log.timing('timing', '10s')

export function printErrorLog(e, type) {
  if (isDebug()) {
    log.error(type, e)
  } else {
    log.error(type, e.message)
  }
}

export { log, isDebug, makeList, makeInput, getLatestVersion, request }
