import React from 'react'
import { useState } from 'react'
import { Example } from './Example'
import { FuncExample } from './FuncExample'
import { Antd } from './Antd'
import { LanguageContext } from './context'
import { Button } from 'antd'
import 'antd/dist/antd.css'

function App() {
  const [show, setShow] = useState(true)

  return (
    <LanguageContext.Provider value="zh-CN">
      <div className="App" style={{ margin: '20px' }}>
        <Button danger onClick={() => setShow((prevShow) => !prevShow)}>
          {show ? 'hide' : 'show'}
        </Button>
        <div>{show && <Antd />}</div>
      </div>
    </LanguageContext.Provider>
  )
}

export default App
