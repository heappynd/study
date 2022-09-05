import React from 'react'
import { useState } from 'react'
import { Example } from './Example'
import { FuncExample } from './FuncExample'
import { LanguageContext } from './context'

function App() {
  const [show, setShow] = useState(true)

  return (
    <LanguageContext.Provider value="zh-CN">
      <div className="App">
        <button onClick={() => setShow((prevShow) => !prevShow)}>
          {show ? 'hide' : 'show'}
        </button>
        <div>{show && <FuncExample />}</div>
      </div>
    </LanguageContext.Provider>
  )
}

export default App
