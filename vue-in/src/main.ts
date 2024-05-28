import generate from './generate'
import parse from './parse'
import transform from './transform'
import { dump } from './utils'

const template = `<div><p>Vue</p><p>Template</p></div>`

function compile(template: string) {
  const templateAST = parse(template)
  console.log('templateAST', templateAST)

  dump(templateAST)

  const jsAST = transform(templateAST)

  console.log('jsAST', jsAST)

  const code = generate(jsAST.jsNode)

  console.log('code', code)
}

compile(template)
