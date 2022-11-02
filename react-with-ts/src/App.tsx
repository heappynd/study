import React, { useState } from 'react'
import { GlobalStyle } from './styled/global.style'
import Demo from './styled/MyDemo'

function App() {
  return (
    <div style={{ padding: 24 }}>
      <Demo />
      <GlobalStyle />
    </div>
  )
}

export default App
