import React from 'react'
import { withRouter } from '../components/withRouter'

function NotFound(props: any) {
  console.log(props)

  return <div>NotFound</div>
}

export default withRouter(NotFound)
