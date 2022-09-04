import React from 'react'
import ReactDOM from 'react-dom/client'
import { Example } from './Example'
// import App from './App'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )

const attrs = {
  name: 'Leo',
  leftPanel: <p>Left</p>,
}

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(
  <React.StrictMode>
    <div>
      <Example {...attrs}></Example>
    </div>
  </React.StrictMode>
)
