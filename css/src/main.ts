import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './style/index.scss'
import plugin from './components'
import './mock'

const app = createApp(App)

app.use(plugin)
app.mount('#app')
