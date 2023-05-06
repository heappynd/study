import { sum } from './utils'
import { version } from '../package.json'

console.log(sum(1, 2))
function show() {
  console.log('version ' + version)
}

export function hide() {
  import('./foo.js').then(({ default: foo }) => console.log(foo))
}

export { sum as add }
