const walker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_ELEMENT,
  {
    acceptNode(node) {
      // NodeFilter.FILTER_REJECT
      // NodeFilter.FILTER_ACCEPT
      // NodeFilter.FILTER_SKIP
      return NodeFilter.FILTER_ACCEPT
    },
  }
)
let node = walker.nextNode()
while (node !== null) {
  console.log(node.nodeName)
  node = walker.nextNode()
}
