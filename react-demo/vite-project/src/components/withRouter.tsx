import React from 'react'

export function withRouter(Component: any) {
  return function (props: any) {
    return <Component a="1" {...props} />
  }
}
