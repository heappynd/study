import React from 'react'
import { ReactElement } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ClassDemo } from '../class/ClassDemo'
import { FuncNew } from '../func/child/FuncNew'
import { FuncNewDetail } from '../func/child/FuncNewDetail'
import { FuncOld } from '../func/child/FuncOld'
import { FuncDemo } from '../func/FuncDemo'
import NotFound from '../views/NotFound'

function LazyLoad(path: string) {
  const Comp = React.lazy(() => import(path))
  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <Comp />
    </React.Suspense>
  )
}

interface IProps {
  children: ReactElement
}

const AuthComponent: React.FC<IProps> = (props) => {
  const isLogin = false
  return isLogin ? props.children : <NotFound />
}

export function MRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/func" />} />
      <Route
        path="/class"
        element={
          <AuthComponent>
            <ClassDemo />
          </AuthComponent>
        }
      />
      <Route path="/func" element={<FuncDemo />}>
        <Route index element={<Navigate to="/func/new" />} />
        <Route path="new" element={<FuncNew />} />
        <Route path="/func/old" element={<FuncOld />} />
      </Route>
      {/* <Route path="/func/new/detail" element={<FuncNewDetail />} /> */}
      <Route path="/func/new/detail/:id" element={<FuncNewDetail />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
