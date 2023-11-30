import { NodeTypes } from "./ast";

/**
 * 是否是单个 element 的根节点
 * @param root 
 * @param child 
 * @returns 
 */
export function isSingleElementRoot(root, child) {
  const { children } = root;
  return children.length === 1 && child.type === NodeTypes.ELEMENT;
}
