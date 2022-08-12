import { parse } from './parse'
import { transform } from './transform'
import { generate } from './generate'
import { parse as sParse } from './s-parse'

export function compiler(template: string) {
  // 模板AST
  const ast = parse(template)
  console.log(sParse(template))

  // 将模板AST转换成JS AST
  transform(ast)
  // 代码生成
  const code = generate(ast.jsNode)

  return code
}
