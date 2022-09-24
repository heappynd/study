const iterator = document.createNodeIterator(
  document.body,
  NodeFilter.SHOW_ELEMENT,
  {
    acceptNode(node) {
      // return node.nodeName.toLowerCase() === 'p'
      //   ? NodeFilter.FILTER_ACCEPT
      //   : NodeFilter.FILTER_SKIP
      return NodeFilter.FILTER_SKIP
    },
  }
)

let node = iterator.nextNode()

while (node !== null) {
  console.log(node)
  node = iterator.nextNode()
}
