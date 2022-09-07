import { useRoutes, Navigate } from 'react-router-dom'
import { ClassDemo } from '../class/ClassDemo'
import { FuncNew } from '../func/child/FuncNew'
import { FuncOld } from '../func/child/FuncOld'
import { FuncDemo } from '../func/FuncDemo'
import HocDemo from '../views/HocDemo'
import Imm from '../views/Imm'
import NotFound from '../views/NotFound'
import ReduxDemo from '../views/ReduxDemo'
import Styled from '../views/Styled'

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
    {
      path: '/styl',
      element: <Styled />,
    },
    {
      path: '/redux',
      element: <ReduxDemo />,
    },
    {
      path: '/hoc',
      element: <HocDemo />,
    },
    {
      path: '/imm',
      element: <Imm />,
    },
    { path: '*', element: <NotFound /> },
  ])

  return element
}
