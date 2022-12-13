import { useState } from 'react'
import StyledComponents from './components/StyledComponents'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <StyledComponents />
    </div>
  )
}

export default App
