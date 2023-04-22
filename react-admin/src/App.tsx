import { useRoutes } from 'react-router-dom'
import router from './router'

export default function App() {
  const routes = useRoutes(router)

  return (
    <div>
      {/* 类似 router-view */}
      {/* <Outlet /> */}
      {routes}
    </div>
  )
}
