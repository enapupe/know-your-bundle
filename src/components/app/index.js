import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { authorize } from '../../modules/github/actions'

const mapStateToProps = ({ auth }) =>
  ({ token: auth.get('access_token') })
const mapDispatchToProps = {
  authorize,
}

class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.shape({
      query: PropTypes.shape({
        code: PropTypes.string,
        state: PropTypes.string,
      }),
    }).isRequired,
    authorize: PropTypes.func.isRequired,
  }

  static defaultProps = {
    children: null,
  }

  componentDidMount() {
    const { location: { query: { code, state } } } = this.props
    this.props.authorize(code, state)
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
