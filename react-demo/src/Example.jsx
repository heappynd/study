import React from 'react'
import PropTypes from 'prop-types'

export class Example extends React.Component {
  static defaultProps = {
    name: 'Strangeer',
    leftPanel: <p>123</p>,
  }
  static propTypes = {
    name: PropTypes.string,
    leftPanel: PropTypes.element,
  }

  constructor(props) {
    super(props)
    this.state = {
      count: 1,
    }
  }

  componentDidMount() {}

  ok = () => {}

  render() {
    return (
      <div onClick={this.ok}>
        {this.props.leftPanel}
        {this.props.name} --- {this.state.count}
      </div>
    )
  }
}
