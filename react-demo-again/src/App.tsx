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

export default class App extends Component<{}, {}> {
  constructor(props: {}) {
    super(props)

    // this.ok = this.ok.bind(this)
  }

  ok = (_, event) => {
    console.log(_, event)
    event.preventDefault()
  }

  render() {
    return (
      <div>
        App
        <a href="#" onClick={(event) => this.ok('foo', event)}>
          ok
        </a>
      </div>
    )
  }
}
