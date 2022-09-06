import { useRoutes, Navigate } from 'react-router-dom'
import { ClassDemo } from '../class/ClassDemo'
import { FuncNew } from '../func/child/FuncNew'
import { FuncOld } from '../func/child/FuncOld'
import { FuncDemo } from '../func/FuncDemo'
import NotFound from '../views/NotFound'

export function URouter() {
  const element = useRoutes([
    {
      path: '/',
      element: <Navigate to="/class" />,
    },
    {
      path: '/class',
      element: <ClassDemo />,
    },
    {
      path: '/func',
      element: <FuncDemo></FuncDemo>,
      children: [
        { path: 'new', element: <FuncNew /> },
        { path: 'old', element: <FuncOld /> },
      ],
    },
    { path: '*', element: <NotFound /> },
  ])

  return element
}
