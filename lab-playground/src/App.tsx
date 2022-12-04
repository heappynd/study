import { useEffect, useState } from 'react'
import { Counter } from './features/counter/Counter'

function App() {
  // useEffect(() => {
  //   const un = store.subscribe(() => {
  //     console.log(store.getState())
  //   })
  //   return () => {
  //     un()
  //   }
  // }, [])

  return (
    <div className="App">
      <h1>11</h1>
      <Counter />
    </div>
  )
}

export default App
