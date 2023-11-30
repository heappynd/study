import { ElementTypes, NodeTypes } from "./ast";

export interface ParserContext {
  source: string;
}

function createParseContext(content: string): ParserContext {
  return {
    source: content,
  };
}

export function baseParse(content: string) {
  const context = createParseContext(content);
  console.log("context", context);
  const children = parseChildren(context, []);

  // console.log("children", children);

  return createRoot(children);
}

export function createRoot(children) {
  return {
    type: NodeTypes.ROOT,
    children,
    loc: {},
  };
}

function parseChildren(context: ParserContext, ancestors) {
  const nodes = [];

  while (!isEnd(context, ancestors)) {
    const s = context.source;

    let node;

    if (startsWith(s, "{{")) {
      // 当前是 模板语法
    } else if (s[0] === "<") {
      // 标签的开始
      if (/[a-z]/i.test(s[1])) {
        node = parseElement(context, ancestors);
      }
    }

    if (!node) {
      // 不是模板语法 不是标签开始 只可能是文本节点
      node = parseText(context);
    }

    pushNode(nodes, node);
  }

  return nodes;
}

function parseText(context: ParserContext) {
  // 标志普通文本的结束
  const endTokens = ["<", "{{"];
  let endIndex = context.source.length;
  // 纠正 endIndex 普通文本结束的下标
  for (let i = 0; i < endTokens.length; i++) {
    const index = context.source.indexOf(endTokens[i], 1);
    if (index !== -1 && endIndex > index) {
      endIndex = index;
    }
  }

  const content = parseTextData(context, endIndex);

  return {
    type: NodeTypes.TEXT,
    content,
  };
}

function parseTextData(context: ParserContext, length: number) {
  const rawText = context.source.slice(0, length);
  advanceBy(context, length);
  return rawText;
}

function pushNode(nodes, node) {
  nodes.push(node);
}

/**
 * 解析 element 元素 比如 div
 * @param context
 * @param ancestors
 */
function parseElement(context: ParserContext, ancestors) {
  // 标签元素开始
  const element = parseTag(context, TagType.Start);
  // 处理子
  ancestors.push(element);
  const children = parseChildren(context, ancestors);
  ancestors.pop();

  element.children = children;

  // 是否是结束标签的开始
  if (startsWithEndTagOpen(context.source, element.tag)) {
    parseTag(context, TagType.End);
  }

  return element;
}

enum TagType {
  /** 标签开始 */
  Start,
  /** 标签结束 */
  End,
}
/**
 * 处理标签 获取标签名
 * @param context
 * @param type
 */
function parseTag(context: ParserContext, type: TagType) {
  const match: any = /^<\/?([a-z][^\t\r\n\f />]*)/i.exec(context.source);

  const tag = match[1];

  advanceBy(context, match[0].length);

  // 判断是否是自闭合标签
  let isSelfClosing = startsWith(context.source, "/>");

  // ">"
  // "/>"
  advanceBy(context, isSelfClosing ? 2 : 1);

  return {
    tag,
    type: NodeTypes.ELEMENT,
    tagType: ElementTypes.ELEMENT,
    props: [],
    children: [],
  };
}
/**
 * 游标右移
 * @param context
 * @param numberOfCharacters
 */
function advanceBy(context: ParserContext, numberOfCharacters: number) {
  const { source } = context;
  context.source = source.slice(numberOfCharacters);
}

function isEnd(context: ParserContext, ancestors) {
  const s = context.source;

  if (startsWith(s, "</")) {
    // 结束标签
    for (let i = ancestors.length - 1; i >= 0; i--) {
      if (startsWithEndTagOpen(s, ancestors[i].tag)) {
        // ancestors 放的是 element node
        // 数组放的 element 节点
        return true;
      }
    }
  }

  return !s;
}

function startsWith(source: string, searchString: string) {
  return source.startsWith(searchString);
}
/**
 * 判断是否是结束标签的开始
 * @param source
 * @param tag
 */
function startsWithEndTagOpen(source: string, tag: string) {
  return startsWith(source, "</");
}
