import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './App.css'
class Factory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      x: 0,
      y: 0,
    }
  }

  render() {
    return (
      <div
        style={{ background: 'lightgreen' }}
        onMouseMove={(e) => {
          this.setState({ x: e.clientX })
        }}
      >
        {this.props.renderProps(this.state)}
      </div>
    )
  }
}

class App extends Component {
  constructor(props: {}) {
    super(props)

    this.state = {}
  }

  ok = (e) => {}

  render() {
    return (
      <div>
        <Factory renderProps={(value) => <h2>x: {value.x}</h2>} />
      </div>
    )
  }
}

export default App
