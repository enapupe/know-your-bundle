import React, { Component } from 'react'
import { Map, List } from 'immutable'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'

import DropProfile from '../../components/drop-profile'
import Module from '../../components/module'
import getUniqueModules from '../../utils/get-unique-modules'
import getReponameFromModule from '../../utils/get-reponame-from-module'
import { GET_MODULE } from '../../modules/module/actions'
import { GET_REPOSITORY } from '../../modules/github/actions'
import { getAuthorizationURL } from '../../services/github'

import styles from './styles.css'

const AUTHORIZATION_URL = getAuthorizationURL()

const mapStateToProps = ({ module, repository, loading, auth }) => ({
  modules: module,
  repositories: repository,
  githubLoadingCount: loading.get(GET_REPOSITORY.COUNT),
  moduleLoadingCount: loading.get(GET_MODULE.COUNT),
  token: auth.get('access_token'),
})

class Main extends Component {
  static propTypes = {
    modules: ImmutablePropTypes.map.isRequired,
    repositories: ImmutablePropTypes.map.isRequired,
    githubLoadingCount: PropTypes.number,
    moduleLoadingCount: PropTypes.number,
    token: PropTypes.string,
  }

  static defaultProps = {
    githubLoadingCount: 0,
    moduleLoadingCount: 0,
    token: undefined,
  }

  state = {
    profile: {
      modules: [],
    },
    dropError: false,
    reasons: new List(),
  }

  onClickModule = (module, reasons) => {
    this.setState({
      module,
      reasons,
    })
  }

  getProfile = (profile) => {
    this.setState({ profile, dropError: false })
  }

  handleDropError = () => {
    this.setState({ dropError: true })
  }

  resetScope = () => {
    this.setState({
      module: null,
      reasons: new List(),
    })
  }

  renderModule = (mod) => {
    const { modules, repositories } = this.props
    const module = modules.get(mod.get('name'), new Map()).merge(mod)
    const modName = mod.get('name')
    return (
      <Module
        selected={this.state.module === modName}
        reason={this.state.reasons.includes(modName)}
        hideIfNotScoped={!!this.state.module}
        onClick={this.onClickModule}
        key={mod.hashCode()}
        name={modName}
        module={module}
        repository={repositories.get(getReponameFromModule(module))}
      />
    )
  }

  render() {
    const { profile, dropError } = this.state
    const { moduleLoadingCount, githubLoadingCount, token } = this.props
    const uniqueModules = getUniqueModules(profile)
    return (
      <div>
        <div>
          <DropProfile onDrop={this.getProfile} onError={this.handleDropError} />
        </div>
        {!token ?
          <a href={AUTHORIZATION_URL}>Github OAuth (increases github api rate limit)</a> : null }
        <pre>
          <div>file error: {dropError.toString()}</div>
          <div>total modules: {uniqueModules.size}</div>
          <div>loading modules: {moduleLoadingCount}</div>
          <div>loading repository: {githubLoadingCount}</div>
        </pre>
        <button onClick={this.resetScope}>reset</button>
        <div className={styles.modules}>
          {uniqueModules.map(this.renderModule)}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Main)
