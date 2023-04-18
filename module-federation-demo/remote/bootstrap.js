// 项目初始化 必须是异步的
import { addList } from "./list"
let app = document.getElementById('app')

app.innerHTML = '<h2>remote</h2>'

addList()