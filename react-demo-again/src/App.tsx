import React, { Component } from 'react'

function foo(...args) {
  console.log(args)
}

let bar = foo.bind(null, 'test')

bar(
  {
    on: { c: 'cc' },
  },
  'ccc'
)

export default class App extends Component<{}, { count: number }> {
  constructor(props: {}) {
    super(props)

    this.state = {
      count: 0,
    }
  }

  ok = () => {
    this.setState(
      (prevState, props) => {
        return {
          count: prevState.count + 1,
        }
      },
      () => {
        console.log('cb', this.state.count)
      }
    )
    this.setState(
      (prevState, props) => {
        return {
          count: prevState.count + 1,
        }
      },
      () => {
        console.log('cb', this.state.count)
      }
    )
    this.setState(
      (prevState, props) => {
        return {
          count: prevState.count + 1,
        }
      },
      () => {
        console.log('cb', this.state.count)
      }
    )
  }

  render() {
    return (
      <div>
        App
        <h1>{this.state.count}</h1>
        <button onClick={this.ok}>+</button>
      </div>
    )
  }
}
