import React, { Component, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './App.css'

function Hook() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log('eff')
  }, [])

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <h1>{count}</h1>
    </div>
  )
}

function App() {
  return (
    <div>
      <Hook />
    </div>
  )
}

export default App
