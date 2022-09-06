import { useEffect } from 'react'
import { HashRouter } from 'react-router-dom'
import store from './redux/store'
import { MRouter } from './router'
import { URouter } from './router/use'

export default function App() {
  useEffect(() => {
    const unsub = store.subscribe(() => {
      console.log('app 订阅', store.getState())
    })

    return () => {
      unsub()
    }
  }, [])

  return (
    <div>
      <HashRouter>
        {/* <MRouter /> */}
        <URouter />
      </HashRouter>
    </div>
  )
}
