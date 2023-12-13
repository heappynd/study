const log = require('npmlog')

if (process.argv.includes('--debug') || process.argv.includes('-d')) {
  log.level = 'verbose'
} else {
  log.level = 'info'
}

// 代表现在是什么脚手架
log.heading = 'imooc'
log.addLevel('success', 2000, { fg: 'green', bold: true })

module.exports = log
