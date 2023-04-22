import { createHashRouter, RouterProvider } from 'react-router-dom'
import Sandbox from '../views/sandbox/Sandbox'
import Login from '../views/login/Login'

const router = createHashRouter([
  {
    path: '/',
    element: <Sandbox />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default function IndexRouter() {
  return <RouterProvider router={router} />
}
