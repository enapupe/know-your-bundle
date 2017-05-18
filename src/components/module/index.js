import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'

import { getModule } from '../../modules/module/actions'
import { getRepository } from '../../modules/github/actions'
import getReponameFromModule from '../../utils/get-reponame-from-module'
import getModuleURL from '../../utils/get-module-url'

import styles from './styles.css'

const mapDispatchToProps = {
  getModule,
  getRepository,
}

class Module extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    module: ImmutablePropTypes.map,
    repository: ImmutablePropTypes.map,
    getModule: PropTypes.func.isRequired,
    getRepository: PropTypes.func.isRequired,
  }

  static defaultProps = {
    module: new Map(),
    repository: new Map(),
  }

  componentWillMount() {
    if (this.props.module.isEmpty()) {
      this.props.getModule(this.props.name)
    }
  }

  componentWillReceiveProps({ repository, module }) {
    if (repository.isEmpty()) {
      this.props.getRepository(getReponameFromModule(module))
    }
  }

  render() {
    const { name, module, repository } = this.props
    return (
      <div className={styles.module}>
        <h1 className={styles.head}>
          <a target="_blank" rel="noopener noreferrer" href={getModuleURL(module)}>{name}</a>
        </h1>
        <p>{module.get('description')}</p>
        <strong>{module.get('license')}</strong>
        <div>latest version v{module.getIn(['dist-tags', 'latest'])}</div>
        <div>REPO {module.getIn(['repository', 'type'])}</div>
        <div>{module.get('versions', new Map()).size} releases</div>
        <div>forks {repository.get('forks')}</div>
        <div>★ {repository.get('stargazers_count')}</div>
        <div>👁 {repository.get('watchers_count')}</div>
        <div>⑂ {repository.get('forks_count')}</div>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Module)
