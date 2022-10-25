import React, { FC, useEffect, useState } from 'react'

const Hook: FC<{}> = () => {
  console.log(1)

  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
    return function cleanup() {
      console.log('cleanup')
    }
  })

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <p>{count}</p>
    </div>
  )
}

export default Hook
