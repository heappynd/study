import React, { useEffect, useState } from 'react'
import { List, Map } from 'immutable'

export default function Imm() {
  const [info, setInfo] = useState({
    name: 'Andy',
    age: 100,
    filter: { text: 'qqq' },
  })

  useEffect(() => {
    setTimeout(() => {
      const old = Map(info)
      const news = old.set('name', 'Loop').set('age', 12)
      setInfo(news.toJS())
    }, 1000)

    return () => {}
  }, [info])

  return (
    <div>
      Imm
      <p>name: {info.name}</p>
      <p>age: {info.age}</p>
      <p>text: {info.filter.text}</p>
    </div>
  )
}

const obj = {
  name: 'Andy',
  age: 100,
}

const oldImmObj = Map(obj)
const newImmObj = oldImmObj.set('name', 'Leo')

console.log(oldImmObj)
console.log(newImmObj)
console.log('-----')
console.log(oldImmObj.get('name'))
console.log(newImmObj.get('name'))
console.log('-----')
console.log(oldImmObj.toJS())
console.log(newImmObj.toJS())

const arr = List([1, 2, 3])
console.log(arr.push(4).toJS())
console.log(arr.toJS())
