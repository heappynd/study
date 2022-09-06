import React from 'react'
import { useNavigate } from 'react-router-dom'

export function FuncNew() {
  const navigate = useNavigate()

  const routerPush = () => {
    // navigate('/func/new/detail?id=1234')
    navigate('/func/new/detail/1234')
  }

  return (
    <div>
      FuncNew
      <button onClick={routerPush}>detail id 1234</button>
    </div>
  )
}
