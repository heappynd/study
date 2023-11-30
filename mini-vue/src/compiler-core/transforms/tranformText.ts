import { NodeTypes } from "../ast";
import { isText } from "../utils";

/**
 * 将相邻的 文本节点和表达式合并成一个表达式
 * @param node
 * @param context
 * @returns
 */
export const transformText = (node, context) => {
  if (
    node.type === NodeTypes.ROOT ||
    node.type === NodeTypes.ELEMENT ||
    node.type === NodeTypes.FOR ||
    node.type === NodeTypes.IF_BRANCH
  ) {
    // 只处理
    return () => {
      const children = node.children;
      let currentContainer;

      // 处理所有的子节点 然后去拼接
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (isText(child)) {
          for (let j = i + 1; j < children.length; j++) {
            const next = children[j];
            // 两个节点都是 text
            if (isText(next)) {
              if (!currentContainer) {
                currentContainer = children[i] = createCompoundExpression(
                  [child],
                  child.loc
                );
              }
              // 合并
              currentContainer.children.push(` + `, next);
              children.splice(j, 1);
              j--;
            } else {
              // 第一个节点是 text 第二个不是
              currentContainer = undefined;
              break;
            }
          }
        }
      }
    };
  }
};

/**
 * 复合表达式节点
 * @param children
 * @param loc
 * @returns
 */
export function createCompoundExpression(children, loc) {
  return {
    type: NodeTypes.COMPOUND_EXPRESSION,
    loc,
    children,
  };
}
