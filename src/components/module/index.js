import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'
import classnames from 'classnames'

import { getModule } from '../../modules/module/actions'
import { getRepository } from '../../modules/github/actions'
import getReponameFromModule from '../../utils/get-reponame-from-module'
import getModuleURL from '../../utils/get-module-url'
import { Star, Eye, Fork, Legal, Tag } from '../../components/icon/icons'

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
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    reason: PropTypes.bool,
    hideIfNotScoped: PropTypes.bool,
  }

  static defaultProps = {
    module: new Map(),
    repository: new Map(),
    onClick: Function.prototype,
    selected: false,
    reason: false,
    hideIfNotScoped: false,
  }

  componentWillMount() {
    if (!this.props.module.get('_id')) {
      this.props.getModule(this.props.name)
    }
  }

  componentWillReceiveProps({ repository, module }) {
    if (repository.isEmpty() && module.get('repository') && !this.loading) {
      this.loading = true
      this.props.getRepository(getReponameFromModule(module))
    }
  }

  handleClick = () => {
    this.props.onClick(this.props.name, this.props.module.get('reasons'))
  }

  render() {
    const { name, module, repository, hideIfNotScoped, reason, selected } = this.props
    return (
      <button
        className={classnames(styles.module, {
          [styles.reason]: reason,
          [styles.selected]: selected,
          [styles.outOfScope]: hideIfNotScoped && !reason && !selected,
        })}
        onClick={this.handleClick}
      >
        <h1 className={styles.head}>
          <a target="_blank" rel="noopener noreferrer" href={getModuleURL(module)}>{name}</a>
        </h1>
        <p>{module.get('description')}</p>
        <div>v{module.getIn(['dist-tags', 'latest'])}</div>
        <div>
          <Tag />
          {module.get('versions', new Map()).size}
        </div>
        <div>
          <Star />
          {repository.get('stargazers_count')}
        </div>
        <div>
          <Eye />
          {repository.get('watchers_count')}
        </div>
        <div>
          <Fork />
          {repository.get('forks_count')}
        </div>
        <div>
          <Legal />
          {module.get('license')}
        </div>
      </button>
    )
  }
}

export default connect(null, mapDispatchToProps)(Module)
