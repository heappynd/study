import { compiler } from '@vue-3/compiler'
import { parse as sParse } from '@vue-3/compiler/src/s-parse'

const template = `<div>Vu&gt;e</div>`

// console.log(compiler(template))

console.log(sParse(template))
