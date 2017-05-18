import PropTypes from 'prop-types'
import React, { Component } from 'react'

class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  }

  render() {
    const { children } = this.props
    return (
      <main>
        {children}
      </main>
    )
  }
}

export default App
