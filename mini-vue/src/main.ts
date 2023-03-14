import { compiler } from './compiler'

const template = `<div><p>Vue</p><p>Template</p></div>`

const code = compiler(template)

console.log(code)

// function render() {
//   return h('div', [
//     h('p', 'Vue'),
//     h('p', 'Template')
//   ])
// }
