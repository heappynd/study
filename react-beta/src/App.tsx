import { useState } from 'react'

let count = 0

function App() {
  console.log('render')

  const [count, setCount] = useState(0)
  function handleClick() {
    setCount(count + 1)
    console.log(count)
  }

  return (
    <div className="App">
      {count}
      <button onClick={handleClick}>add</button>
    </div>
  )
}

export default App
