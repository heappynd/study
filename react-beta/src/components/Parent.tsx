import React, { FC, useState } from 'react'
import Child from './Child'

const Parent: FC = () => {
  console.log('parent')
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div>
      Parent
      <button onClick={handleClick}>add</button>
      <Child />
    </div>
  )
}

export default Parent
