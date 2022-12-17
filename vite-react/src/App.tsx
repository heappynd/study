import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Models from './components/Models'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Models />
    </div>
  )
}

export default App
