import genNode from './genNode'

export default function generate(node) {
  const context = {
    // 存储最终生成的渲染函数代码
    code: '',
    // 在生成代码时，通过调用 push 函数完成代码的拼接
    push(code: string) {
      context.code += code
    },
    // 当前缩进的级别，初始值为 0，即没有缩进
    currentIndent: 0,
    // 该函数用来换行，即在代码字符串的后面追加 \n 字符，
    // 另外，换行时应该保留缩进，所以我们还要追加 currentIndent * 2 个空格字符
    newline() {
      context.code += '\n' + ` `.repeat(context.currentIndent)
    },
    // 用来缩进，即让 currentIndent 自增后，调用换行函数
    indent() {
      context.currentIndent++
      context.newline()
    },
    // 取消缩进，即让 currentIndent 自减后，调用换行函数
    deIndent() {
      context.currentIndent--
      context.newline()
    },
  }

  // debugger

  genNode(node, context)

  return context.code
}
