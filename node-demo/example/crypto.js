import crypto from 'node:crypto'

const hash = crypto.createHash('md5')

hash.update('123456')
console.log(hash.digest('hex'))

const hmac = crypto.createHmac('sha256', 'secret-key')
hmac.update('123456')
console.log(hmac.digest('hex'))
