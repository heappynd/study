import { generate } from './codegen'
import { parse } from './parse'
import { transform } from './traverse'

export function compiler(template: string) {
  const ast = parse(template)
  transform(ast)
  console.log(ast)

  const code = generate(ast.jsNode)
  return code
}
