/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  let inOrderRes = []
  function inOrder(root) {
    if (root === null) {
      return null
    }

    inOrder(root.left)
    inOrderRes.push(root.val)
    inOrder(root.right)
  }
  inOrder(root)
  if (inOrderRes.length % 2 === 0) {
    return false
  } else {
    let left = 0
    let right = inOrderRes.length - 1
    while (left < right) {
      if (inOrderRes[left] !== inOrderRes[right]) {
        return false
      }
      left++
      right--
    }
    return true
  }
  // 2 2 1 2 2
  // 1 2 2 2 2
  // 2 2 2 2 1
}
