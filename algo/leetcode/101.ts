/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (root === null) {
    return true
  }
  return compare(root.left, root.right)
}

function compare(left, right) {
  if (left === null && right !== null) {
    return false
  } else if (left !== null && right === null) {
    return false
  } else if (left === null && right === null) {
    return true
  } else if (left.val !== right.val) {
    return false
  } else if (left.val === right.val) {
    return compare(left.left, right.right) && compare(left.right, right.left)
  }
}
