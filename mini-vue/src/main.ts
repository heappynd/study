import { parse } from './compiler/parse'
import { transform } from './compiler/traverse'
import { dump } from './compiler/utils'

const template = `<div><p>Vue</p><p>Template</p></div>`

const ast = parse(template)

console.log('ast', ast)

transform(ast)
