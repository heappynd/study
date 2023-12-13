const log = require('./log')

log.http('request', 'request to: https://www.baidu.com')
log.timing('timing', '10s')

module.exports = {
  log,
}
