import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useContext } from 'react'

import { LanguageContext } from './context'

export function FuncExample() {
  const [count, setCount] = useState(1)
  const [visible, setVisible] = useState(false)

  const inputEl = useRef(null)

  useEffect(() => {
    console.log('useEffect')
    return () => {
      console.log('clearup')
    }
  }, [])

  const add = useCallback(() => {
    console.log(inputEl.current)
    setCount(count + 1)
  }, [count])

  const toggle = useCallback(() => {
    console.log(22)
    setVisible(!visible)
  }, [visible])

  const doubleCount = useMemo(() => {
    console.log(11)
    return count * 2
  }, [count])

  const context = useContext(LanguageContext)

  return (
    <div style={{ border: '1px solid #f00' }}>
      <h1>FuncExample</h1>
      <h2>count: {count}</h2>
      <h2>doubleCount: {doubleCount}</h2>
      <button onClick={add}>add</button>
      <button onClick={toggle}>toggle {visible + 0}</button>
      <input type="text" ref={inputEl} />

      <p>{context.toLocaleUpperCase()}</p>

      {/* <LanguageContext.Consumer>{(v) => <p>{v}</p>}</LanguageContext.Consumer> */}
    </div>
  )
}
