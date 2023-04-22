import Home from '@/views/Home/Home'
import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Page1 = lazy(() => import('@/views/Page1/Page1'))
const Page2 = lazy(() => import('@/views/Page2/Page2'))

const withLoadingComponent = (comp: JSX.Element) => {
  return <React.Suspense fallback={<div>loading!</div>}>{comp}</React.Suspense>
}

const routes = [
  { path: '/', element: <Navigate to={'/page1'} /> },

  {
    path: '/',
    element: <Home />,
    children: [
      { path: '/page1', element: withLoadingComponent(<Page1 />) },
      { path: '/page2', element: withLoadingComponent(<Page2 />) },
    ],
  },
]

export default routes
