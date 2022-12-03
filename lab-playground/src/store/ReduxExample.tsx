import React from 'react'
import store, { increment } from './'
import { Button } from 'antd'

const ReduxExample = () => {
  function add() {
    // store.dispatch({ type: 'counter/incremented' })
    console.log(increment())

    store.dispatch(increment())
  }

  return (
    <div>
      ReduxExample
      <Button onClick={add}>add</Button>
    </div>
  )
}

export default ReduxExample
