const doc = document;

export const nodeOps = {
  insert(child, parent, anchor) {
    parent.insertBefore(child, anchor || null);
  },
  createElement(tag) {
    const el = doc.createElement(tag);
    return el;
  },
  setElementText(el, text) {
    el.textContent = text;
  },
  remove(child: Element) {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createText(text: string) {
    return document.createTextNode(text);
  },
  setText(node, text: string) {
    node.nodeValue = text;
  },
  createComment(text: string) {
    return document.createComment(text);
  },
};
