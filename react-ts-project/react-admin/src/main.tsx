import React from 'react'
import ReactDOM from 'react-dom/client'
import 'antd/dist/reset.css'
import '@/styles/global.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
