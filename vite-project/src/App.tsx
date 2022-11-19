import { ConfigProvider, Button } from 'antd'
import { useState } from 'react'
import ModelModal from './components/ModelModal'
import ReactDOM from 'react-dom'

function createModal() {
  const wrap = document.createElement('div')

  const close = () => ReactDOM.unmountComponentAtNode(wrap)

  ReactDOM.render(<ModelModal onClose={close} />, wrap)

  document.body.appendChild(wrap)
}

function App() {
  return (
    <div className="App">
      <ConfigProvider
        theme={{ token: { colorPrimary: '#2a60e6', borderRadius: 2 } }}
      >
        <Button
          type="primary"
          onClick={() => {
            createModal()
          }}
        >
          Open Modal
        </Button>
        {/* <ModelModal /> */}
      </ConfigProvider>
    </div>
  )
}

export default App
