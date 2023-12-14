import { isDebug, log } from '@imooccom/utils'

function printErrorLog(e, type) {
  console.log(222)
  if (isDebug()) {
    log.error(type, e)
  } else {
    log.error(type, e.message)
  }
}

process.on('uncaughtException', (e) => {
  printErrorLog(e, 'error')
})

process.on('unhandledRejection', (e) => {
  printErrorLog(e, 'promise')
})
