import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './App.css'

function withMouse(C) {
  class Comp extends Component {
    state = {
      x: 0,
      y: 0,
    }

    mouse = (e: React.MouseEventHandler) => {
      // console.log(e.clientX)
      // console.log(e.clientY)
      console.log(e)

      this.setState({
        x: e.clientX,
        y: e.clientY,
      })
    }

    render() {
      return (
        <div
          style={{ height: '500px', background: 'pink' }}
          onMouseMove={this.mouse}
        >
          <C {...this.props} mouse={this.state} />
        </div>
      )
    }
  }

  return Comp
}

class App extends Component<{}, {}> {
  constructor(props: {}) {
    super(props)

    this.state = {
      count: 0,
      theme: 'light',
    }
  }

  ok = (e) => {}

  render() {
    return (
      <div>
        <h2>x: {this.props.mouse.x}</h2>
      </div>
    )
  }
}

export default withMouse(App)
