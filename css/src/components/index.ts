import { Col, Row } from 'vant'
import 'vant/es/col/style'
import 'vant/es/row/style'
import { Plugin } from 'vue'
import { CAside, CFooter, CHeader, CLayout, CMain } from './layout'

const thrtyComponents = { CCol: Col, CRow: Row }
const customComponents = { CLayout, CHeader, CAside, CMain, CFooter }

const plugin: Plugin = {
  install(app, ...options) {
    const components = { ...thrtyComponents, ...customComponents }

    for (const [name, comp] of Object.entries(components)) {
      app.component(name, comp)
    }
  },
}

export default plugin
