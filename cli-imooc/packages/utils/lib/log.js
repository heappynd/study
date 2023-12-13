import log from 'npmlog'
import isDebug from './isDebug.js'

if (isDebug()) {
  log.level = 'verbose'
} else {
  log.level = 'info'
}

// 代表现在是什么脚手架
log.heading = 'imooc'
log.addLevel('success', 2000, { fg: 'green', bold: true })

export default log
