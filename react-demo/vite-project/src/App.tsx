import { HashRouter } from 'react-router-dom'
import { MRouter } from './router'
import { URouter } from './router/use'

export default function App() {
  return (
    <div>
      <HashRouter>
        {/* <MRouter /> */}
        <URouter />
      </HashRouter>
    </div>
  )
}
