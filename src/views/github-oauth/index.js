import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { authorize } from '../../modules/github/actions'

const mapStateToProps = ({ auth }) =>
  ({ token: auth.get('access_token') })
const mapDispatchToProps = {
  authorize,
}

class GithubOAuth extends Component {
  static propTypes = {
    location: PropTypes.shape({
      query: PropTypes.shape({
        code: PropTypes.string,
        state: PropTypes.string,
      }),
    }).isRequired,
    authorize: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { location: { query: { code, state } } } = this.props
    this.props.authorize(code, state)
  }

  componentWillReceiveProps({ token }) {
    if (token) {
      browserHistory.push('/')
    }
  }

  render() {
    return null
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GithubOAuth)
