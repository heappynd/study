import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)

    // this.ok = this.ok.bind(this)
  }

  ok = (event) => {
    event.preventDefault()
    console.log('this', this)
    console.log('event', event)
    // console.log('event.__proto__.constructor', event.__proto__.constructor)

    console.log(event.target) // a
    console.log(event.nativeEvent.target) // a

    console.log(event.currentTarget) // a
    console.log(event.nativeEvent.currentTarget) // #root
    // React 17 事件绑定到root
    // React 16 绑定到document 有利于多个React版本并存，例如微前端
  }

  // ok() {
  //   console.log('this', this)
  // }

  render() {
    return (
      <div>
        App
        <a href="#" onClick={this.ok}>
          ok
        </a>
      </div>
    )
  }
}
