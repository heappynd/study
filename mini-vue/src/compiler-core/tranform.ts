import { NodeTypes } from "./ast";
import { isSingleElementRoot } from "./hoistStatic";

export interface TransformContext {
  root: any;
  parent: ParentNode | null; // 每次转换时的父节点
  childIndex: number;
  currentNode: any;
  // symbol 表示 render 函数中生成的节点函数
  helpers: Map<symbol, number>;
  // 帮助处理 helpers
  helper<T extends symbol>(name: T): T;
  nodeTransforms: any[];
}

function createTransformContext(root: any, { nodeTransforms = [] }: any) {
  const context: TransformContext = {
    nodeTransforms,
    root,
    helpers: new Map(),
    currentNode: root,
    parent: null,
    childIndex: 0,
    helper(name) {
      const count = context.helpers.get(name) || 0;
      context.helpers.set(name, count + 1);
      return name;
    },
  };

  return context;
}

export function transform(root, options) {
  const context = createTransformContext(root, options);
  traverseNode(root, context);

  createRootCodegen(root);

  root.helpers = [...context.helpers.keys()];
  root.components = [];
  root.directives = [];
  root.imports = [];
  root.hoists = [];
  root.temps = [];
  root.cached = [];
}

function createRootCodegen(root) {
  const { children } = root;
  // vue3 支持多个根节点 vue2 支持单个 这里只处理单个
  if (children.length === 1) {
    const child = children[0];
    if (isSingleElementRoot(root, child) && child.codegenNode) {
      root.codegenNode = child.codegenNode;
    }
  }
}

/**
 * 遍历转化节点 深度优先
 */
export function traverseNode(node, context: TransformContext) {
  // 进入阶段

  // 退出阶段 倒序
  context.currentNode = node;
  const { nodeTransforms } = context;
  // 存 转换函数
  const exitFns: any[] = [];
  for (let i = 0; i < nodeTransforms.length; i++) {
    const onExit = nodeTransforms[i](node, context);
    if (onExit) {
      exitFns.push(onExit);
    }
  }

  switch (node.type) {
    case NodeTypes.ELEMENT:
    case NodeTypes.ROOT:
      // 处理子节点
      traverseChildren(node, context);
      break;

    default:
      break;
  }

  // 退出
  context.currentNode = node;
  let i = exitFns.length;
  while (i--) {
    exitFns[i]();
  }
}
function traverseChildren(parent: any, context: TransformContext) {
  parent.children.forEach((node, index) => {
    context.parent = parent;
    context.childIndex = index;
    traverseNode(node, context);
  });
}
