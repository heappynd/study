import { compiler } from '@vue-3/compiler'

const template = `<div><p>Vue</p><p>Template</p></div>`

console.log(compiler(template))
