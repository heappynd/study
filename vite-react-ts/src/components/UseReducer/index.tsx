import React, { Reducer, useReducer } from 'react'
import { useImmerReducer } from 'use-immer'

type State = {
  value: number
}
type Action = {
  type: 'increment' | 'decrement' | 'incrementByAmount'
  payload?: number
}

const counterReducer: Reducer<State, Action> = (counter, action) => {
  switch (action.type) {
    case 'increment':
      return { value: counter.value + 1 }
    case 'decrement':
      return { value: counter.value - 1 }
    case 'incrementByAmount':
      return { value: counter.value + action.payload! }
    default:
      return { value: counter.value }
  }
}

const UseReducer = () => {
  const initialCounter = { value: 0 }
  const [counter, dispatch] = useReducer(counterReducer, initialCounter)

  return (
    <div>
      {counter.value}
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
      <button
        onClick={() => dispatch({ type: 'incrementByAmount', payload: 100 })}
      >
        Increment by amount
      </button>
    </div>
  )
}

export default UseReducer
