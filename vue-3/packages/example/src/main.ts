import { parse, tokenize, transform } from '@vue-3/compiler'

const template = `<div><p>Vue</p><p>Template</p></div>`

console.log(tokenize(template))
console.log(JSON.stringify(parse(template), null, '\t'))

const ast = parse(template)
transform(ast)
