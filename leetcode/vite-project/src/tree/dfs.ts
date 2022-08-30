import { Option } from './tree'

function dfs(root: Option) {
  console.log(root.value)
  root.children.forEach(dfs)
}
dfs(Option)
