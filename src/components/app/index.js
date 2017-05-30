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
        <h4 style={{ margin: '0 0 20px 0' }}>This project is WIP - <a href="https://github.com/enapupe/know-your-bundle">GitHub repo</a></h4>
        {children}
      </main>
    )
  }
}

export default App
