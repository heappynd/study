import React, { useEffect } from 'react'

function HocDemo(props) {
  useEffect(() => {
    console.log(props)

    return () => {}
  }, [])

  return <div>HocDemo</div>
}

function myConnect(cb) {
  const value = cb()

  return (MyCmponent) => {
    return (props) => {
      return (
        <div style={{ color: 'red' }}>
          <MyCmponent {...value} {...props} />
        </div>
      )
    }
  }
}

export default myConnect(() => {
  return { a: 1, b: 2 }
})(HocDemo)
