import { useEffect, useState } from 'react'
import store from './store'
import ReduxExample from './store/ReduxExample'

function App() {
  useEffect(() => {
    const un = store.subscribe(() => {
      console.log(store.getState())
    })
    return () => {
      un()
    }
  }, [])

  return (
    <div className="App">
      <h1>11</h1>

      <ReduxExample />
    </div>
  )
}

export default App
