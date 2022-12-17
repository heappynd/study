import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <ConfigProvider theme={{ token: { wireframe: true, borderRadius: 2 } }}>
    <App />
  </ConfigProvider>

  // </React.StrictMode>
)
