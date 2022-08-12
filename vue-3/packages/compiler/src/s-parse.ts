enum TextModes {
  DATA = 'DATA',
  RCDATA = 'RCDATA',
  RAWTEXT = 'RAWTEXT',
  CDATA = 'CDATA',
}

interface ICtx {
  source: string
  mode: TextModes
  /**
   * 根据给定字符数num 截取位置num后的模板内容 并替换当前模板内容
   * @param num
   */
  advanceBy(num: number): void
  /**
   * 无论是开始标签还是结束标签 都存在无用的空白字符
   */
  advanceSpaces(): void
}

export function parse(str: string) {
  const context: ICtx = {
    source: str,
    mode: TextModes.DATA,
    advanceBy(num) {
      context.source = context.source.slice(num)
    },
    advanceSpaces() {
      const match = /^[\t\r\n\f ]+/.exec(context.source)
      if (match) {
        context.advanceBy(match[0].length)
      }
    },
  }

  const nodes = parseChildren(context, [])

  return {
    type: 'Root',
    children: nodes,
  }
}
function parseChildren(context: ICtx, ancestors: any[]) {
  let nodes = []
  const { source, mode } = context
  while (!isEnd(context, ancestors)) {
    let node
    if (mode === TextModes.DATA || mode === TextModes.RCDATA) {
      if (mode === TextModes.DATA && source[0] === '<') {
        if (source[1] === '!') {
          if (source.startsWith('<!--')) {
            // 注释节点
            node = parseComment(context)
          } else if (source.startsWith('<![CDATA[')) {
            // CDATA
            node = parseCDATA(context, ancestors)
          }
        } else if (source[1] === '/') {
          // 结束标签这里会抛出错误
          console.error('无效的结束标签')
          continue
        } else if (/[a-z]/i.test(source[1])) {
          // 标签
          node = parseElement(context, ancestors)
        }
      } else if (source.startsWith('{{')) {
        // 解析插值
        node = parseInterpolation(context)
      }
    }

    if (!node) {
      node = parseText(context)
    }

    nodes.push(node)
  }

  return nodes
}
function parseElement(context: ICtx, ancestors: any[]) {
  const element = parseTag(context)
  if (element.isSelfClosing) {
    return element
  }

  // 切换到正确的文本模式
  if (element.tag === 'textarea' || element.tag === 'title') {
    context.mode = TextModes.RCDATA
  } else if (/style|xmp|iframe|noembed|noframes|noscript/.test(element.tag)) {
    context.mode = TextModes.RAWTEXT
  } else {
    context.mode = TextModes.DATA
  }

  ancestors.push(element)
  element.children = parseChildren(context, ancestors)
  ancestors.pop()

  if (context.source.startsWith(`</${element.tag}>`)) {
    parseTag(context, 'end')
  } else {
    console.error(`${element.tag} 标签缺少闭合标签`)
  }
  return element
}
function isEnd(context: ICtx, ancestors: any[]): boolean {
  if (!context.source) {
    return true
  }
  // const parent = ancestors[ancestors.length - 1]
  // if (parent && context.source.startsWith(`</${parent.tag}`)) {
  //   return true
  // }
  for (let i = ancestors.length - 1; i >= 0; --i) {
    if (context.source.startsWith(`</${ancestors[i].tag}>`)) {
      return true
    }
  }
}
function parseTag(context: ICtx, type = 'start') {
  const { advanceBy, advanceSpaces } = context

  // 处理开始标签和结束标签的正则表达式不同
  const match =
    type === 'start'
      ? /^<([a-z][^\t\r\n\f />]*)/i.exec(context.source)
      : /^<\/([a-z][^\t\r\n\f />]*)/i.exec(context.source)
  // 匹配成功后 正则表达式的第一个捕获组就是tag
  const tag = match[1]
  advanceBy(match[0].length)
  advanceSpaces()
  // 完成属性和指令的解析
  const props = parseAttributes(context)

  // 在消费匹配内容后 如果字符串以 '/>' 开头说明是一个自闭合
  const isSelfClosing = context.source.startsWith('/>')
  advanceBy(isSelfClosing ? 2 : 1)
  // 返回标签节点
  return {
    type: 'Element',
    tag,
    props,
    children: [],
    isSelfClosing,
  }
}
function parseAttributes(context: ICtx) {
  const { advanceBy, advanceSpaces } = context
  const props: any[] = []

  while (!context.source.startsWith('>') && !context.source.startsWith('/>')) {
    // 解析属性或指令
    const match = /^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(context.source)
    const name = match[0]

    advanceBy(name.length)
    advanceSpaces()
    advanceBy(1)
    advanceSpaces()

    let value = ''

    const quote = context.source[0]
    const isQuoted = quote === '"' || quote === "'"
    if (isQuoted) {
      advanceBy(1)
      const endQuoteIndex = context.source.indexOf(quote)
      if (endQuoteIndex > -1) {
        value = context.source.slice(0, endQuoteIndex)
        advanceBy(value.length)
        advanceBy(1)
      } else {
        console.error('缺少引号')
      }
    } else {
      const match = /^[^\t\r\n\f >]+/.exec(context.source)
      value = match[0]
      advanceBy(value.length)
    }

    advanceSpaces()

    props.push({
      type: 'Attribute',
      name,
      value,
    })
  }
  return props
}

function parseText(context: ICtx) {
  let endIndex = context.source.length
  const ltIndex = context.source.indexOf('<')
  const delimiterIndex = context.source.indexOf('{{')

  if (ltIndex > -1 && ltIndex < endIndex) {
    endIndex = ltIndex
  }
  if (delimiterIndex > -1 && delimiterIndex < endIndex) {
    endIndex = delimiterIndex
  }

  const content = context.source.slice(0, endIndex)

  context.advanceBy(content.length)

  return {
    type: 'Text',
    content: decodeHtml(content),
  }
}

const namedCharacterReferences = {
  gt: '>',
  'gt;': '>',
  lt: '<',
  'lt;': '<',
  'ltcc;': '⪦',
}

function decodeHtml(rawText, asAttr = false) {
  let offset = 0
  const end = rawText.length
  let decodedText = ''
  let maxCRNameLength = 0

  function advance(length) {
    offset += length
    rawText = rawText.slice(length)
  }

  while (offset < end) {
    const head = /&(?:#x?)?/i.exec(rawText)
    if (!head) {
      const remaining = end - offset
      decodedText += rawText.slice(0, remaining)
      advance(remaining)
      break
    }
    // Advance to the "&".
    decodedText += rawText.slice(0, head.index)
    advance(head.index)

    if (head[0] === '&') {
      // Named character reference.
      let name = ''
      let value
      if (/[0-9a-z]/i.test(rawText[1])) {
        if (!maxCRNameLength) {
          maxCRNameLength = Object.keys(namedCharacterReferences).reduce((max, name) => Math.max(max, name.length), 0)
        }
        for (let length = maxCRNameLength; !value && length > 0; --length) {
          name = rawText.substr(1, length)
          value = namedCharacterReferences[name]
        }
        if (value) {
          const semi = name.endsWith(';')
          if (asAttr && !semi && /[=a-z0-9]/i.test(rawText[name.length + 1] || '')) {
            decodedText += '&' + name
            advance(1 + name.length)
          } else {
            decodedText += value
            advance(1 + name.length)
          }
        } else {
          decodedText += '&' + name
          advance(1 + name.length)
        }
      } else {
        decodedText += '&'
        advance(1)
      }
    } else {
      // 判断是十进制表示还是十六进制表示
      const hex = head[0] === '&#x'
      // 根据不同进制表示法，选用不同的正则
      const pattern = hex ? /^&#x([0-9a-f]+);?/i : /^&#([0-9]+);?/
      // 最终，body[1] 的值就是 Unicode 码点
      const body = pattern.exec(rawText)

      // 如果匹配成功，则调用 String.fromCodePoint 函数进行解码
      if (body) {
        // 将码点字符串转为十进制数字
        const cp = Number.parseInt(body[1], hex ? 16 : 10)
        // 码点的合法性检查
        if (cp === 0) {
          // 如果码点值为 0x00，替换为 0xfffd
          cp = 0xfffd
        } else if (cp > 0x10ffff) {
          // 如果码点值超过了 Unicode 的最大值，替换为 0xfffd
          cp = 0xfffd
        } else if (cp >= 0xd800 && cp <= 0xdfff) {
          // 如果码点值处于 surrogate pair 范围，替换为 0xfffd
          cp = 0xfffd
        } else if ((cp >= 0xfdd0 && cp <= 0xfdef) || (cp & 0xfffe) === 0xfffe) {
          // 如果码点值处于 `noncharacter` 范围，则什么都不做，交给平台处理
          // noop
        } else if (
          // 控制字符集的范围是：[0x01, 0x1f] 加上 [0x7f, 0x9f]
          // 却掉 ASICC 空白符：0x09(TAB)、0x0A(LF)、0x0C(FF)
          // 0x0D(CR) 虽然也是 ASICC 空白符，但需要包含
          (cp >= 0x01 && cp <= 0x08) ||
          cp === 0x0b ||
          (cp >= 0x0d && cp <= 0x1f) ||
          (cp >= 0x7f && cp <= 0x9f)
        ) {
          // 在 CCR_REPLACEMENTS 表中查找替换码点，如果找不到则使用原码点
          cp = CCR_REPLACEMENTS[cp] || cp
        }
        // 解码后追加到 decodedText 上
        decodedText += String.fromCodePoint(cp)
        // 消费掉整个数字字符引用的内容
        advance(body[0].length)
      } else {
        // 如果没有匹配，则不进行解码操作，只是把 head[0] 追加到 decodedText 并消费掉
        decodedText += head[0]
        advance(head[0].length)
      }
    }
  }
  return decodedText
}

function parseInterpolation(context) {
  context.advanceBy('{{'.length)
  closeIndex = context.source.indexOf('}}')
  const content = context.source.slice(0, closeIndex)
  context.advanceBy(content.length)
  context.advanceBy('}}'.length)

  return {
    type: 'Interpolation',
    content: {
      type: 'Expression',
      content: decodeHtml(content),
    },
  }
}

function parseComment(context) {
  context.advanceBy('<!--'.length)
  closeIndex = context.source.indexOf('-->')
  const content = context.source.slice(0, closeIndex)
  context.advanceBy(content.length)
  context.advanceBy('-->'.length)

  return {
    type: 'Comment',
    content,
  }
}
