import { EMPTY_OBJ, isString } from "../shared";
import { createComponentInstance, setupComponent } from "./component";
import { normalizeVNode, renderComponentRoot } from "./componentRenderUtils";
import { ShapeFlags } from "./shapeFlags";
import { Fragment, Comment, Text, isSameVNodeType } from "./vnode";
import { ReactiveEffect } from "@vue/reactivity";
import { queuePostFlushCb } from "@vue/runtime-core";

interface RendererOptions {
  patchProp(el: Element, key: string, prevValue: any, nextValue: any): void;
  setElementText(node: Element, text: string): void;
  insert(el: Element, parent: Element, anchor?: any): void;
  createElement(type: string): Element;
  remove(el: Element): void;
  createText(text: string): void;
  setText(node, text: string): void;
  createComment(text: string): void;
}

export function createRenderer(options: RendererOptions) {
  return baseCreateRenderer(options);
}

function baseCreateRenderer(options: RendererOptions) {
  const {
    createElement: hostCreateElement,
    insert: hostInsert,
    patchProp: hostPatchProp,
    setElementText: hostSetElementText,
    remove: hostRemove,
    createText: hostCreateText,
    setText: hostSetText,
    createComment: hostCreateComment,
  } = options;

  const processElement = (oldVNode, newVNode, container, anchor) => {
    if (oldVNode == null) {
      // mount
      mountElement(newVNode, container, anchor);
    } else {
      // update
      patchElement(oldVNode, newVNode);
    }
  };

  const processFragment = (oldVNode, newVNode, container, anchor) => {
    if (oldVNode == null) {
      // mount
      mountChildren(newVNode.children, container, anchor);
    } else {
      patchChildren(oldVNode, newVNode, container, anchor);
    }
  };

  const mountChildren = (children, container, anchor) => {
    if (isString(children)) {
      children = children.split("");
      console.log("children", children);
    }

    for (let i = 0; i < children.length; i++) {
      const child = (children[i] = normalizeVNode(children[i]));
      patch(null, child, container, anchor);
    }
  };

  const mountComponent = (initialVNode, container, anchor) => {
    // 生成实例
    initialVNode.component = createComponentInstance(initialVNode);
    const instance = initialVNode.component;

    // instance 绑定 render 函数
    setupComponent(instance);
    // 渲染组件
    setupRenderEffect(instance, initialVNode, container, anchor);
  };

  const setupRenderEffect = (instance, initialVNode, container, anchor) => {
    // 挂载操作
    const componentFn = () => {
      // 挂载 subTree
      if (!instance.isMounted) {
        const { bm, m } = instance;

        if (bm) {
          bm();
        }

        const subTree = (instance.subTree = renderComponentRoot(instance));

        patch(null, subTree, container, anchor);

        if (m) {
          m();
        }

        initialVNode.el = subTree.el;
      } else {
      }
    };
    const effect = (instance.effect = new ReactiveEffect(componentFn, () =>
      // queuePreFlushCb(update)
      queuePostFlushCb(update)
    ));

    const update = (instance.update = () => effect.run());

    update();
  };

  const processComponent = (oldVNode, newVNode, container, anchor) => {
    if (oldVNode == null) {
      mountComponent(newVNode, container, anchor);
    }
  };

  const processCommentNode = (oldVNode, newVNode, container, anchor) => {
    if (oldVNode == null) {
      // mount
      newVNode.el = hostCreateComment(newVNode.children);
      hostInsert(newVNode.el, container, anchor);
    } else {
      // 无更新
      newVNode.el = oldVNode.el;
    }
  };

  const processText = (oldVNode, newVNode, container, anchor) => {
    if (oldVNode == null) {
      // mount
      newVNode.el = hostCreateText(newVNode.children);
      hostInsert(newVNode.el, container, anchor);
    } else {
      // update
      const el = (newVNode.el = oldVNode.el!);
      if (newVNode.children !== oldVNode.children) {
        hostSetText(el, newVNode.children);
      }
    }
  };

  const patchElement = (oldVNode, newVNode) => {
    const el = (newVNode.el = oldVNode.el);
    const newProps = newVNode.props || EMPTY_OBJ;
    const oldProps = oldVNode.props || EMPTY_OBJ;

    patchChildren(oldVNode, newVNode, el, null);

    patchProps(el, newVNode, oldProps, newProps);
  };

  const patchProps = (el: Element, vnode, oldProps, newProps) => {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        // 新的 props 挂载
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev) {
          hostPatchProp(el, key, prev, next);
        }
      }

      if (oldProps !== EMPTY_OBJ) {
        // 删除旧的里面多的
        for (const key in oldProps) {
          if (!(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null);
          }
        }
      }
    }
  };

  const patchChildren = (oldVNode, newVNode, container, anchor) => {
    const c1 = oldVNode && oldVNode.children;
    const prevShapeFlag = oldVNode ? oldVNode.shapeFlag : 0;
    const c2 = newVNode && newVNode.children;
    const { shapeFlag } = newVNode;

    // 新旧节点状态
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        // 新的子节点是text 旧的子节点是数组
        // 卸载旧子节点
      }
      // 旧节点不是数组 新节点子节点文本和旧节点子节点文本不一样
      if (c2 !== c1) {
        // 挂载新子节点的文本
        hostSetElementText(container, c2);
      }
    } else {
      // 新节点子节点不是 文本节点
      // 旧节点是 数组
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          // todo: diff
        } else {
          // unmount
        }
      } else {
        if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
          // 旧节点是text 删除旧节点
          hostSetElementText(container, "");
        }
        if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
          // todo: 单独新子节点的挂载
        }
      }
    }
  };

  const mountElement = (vnode, container, anchor) => {
    const { type, props, shapeFlag } = vnode;
    // 创建 element
    const el = (vnode.el = hostCreateElement(type));
    // 设置文本
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    }
    // 设置 props
    if (props) {
      for (const key in props) {
        hostPatchProp(el, key, null, props[key]);
      }
    }
    // 插入
    hostInsert(el, container, anchor);
  };

  function patch(oldVNode, newVNode, container, anchor = null) {
    if (oldVNode === newVNode) {
      return;
    }

    // 判断新旧节点是否是同样元素
    if (oldVNode && !isSameVNodeType(oldVNode, newVNode)) {
      unmount(oldVNode);
      oldVNode = null;
    }

    const { type, shapeFlag } = newVNode;

    switch (type) {
      case Text:
        processText(oldVNode, newVNode, container, anchor);
        break;
      case Comment:
        processCommentNode(oldVNode, newVNode, container, anchor);
        break;
      case Fragment:
        // 包裹性的容器 本身不会渲染
        processFragment(oldVNode, newVNode, container, anchor);
        break;

      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(oldVNode, newVNode, container, anchor);
        } else if (shapeFlag & ShapeFlags.COMPONENT) {
          // 组件的挂载
          processComponent(oldVNode, newVNode, container, anchor);
        }
    }
  }

  const unmount = (vnode) => {
    hostRemove(vnode.el);
  };

  const render = (vnode, container) => {
    if (vnode === null) {
      // unmount 新的节点不存在 旧的节点存在
      if (container._vnode) {
        unmount(container._vnode);
      }
    } else {
      patch(container._vnode || null, vnode, container);
    }
    container._vnode = vnode;
  };

  return {
    render,
  };
}
