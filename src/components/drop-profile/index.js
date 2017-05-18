import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

class DropProfile extends Component {
  static propTypes = {
    onDrop: PropTypes.func.isRequired,
    onError: PropTypes.func,
  }

  static defaultProps = {
    onError: Function.prototype,
  }

  callOnDrop = (e) => {
    try {
      const parsed = JSON.parse(e.target.result)
      this.props.onDrop(parsed)
    } catch (event) {
      this.props.onError(event)
    }
  }

  handleOnChange = (e) => {
    try {
      const reader = new FileReader()
      reader.readAsText(e.target.files[0], 'UTF-8')
      reader.onload = this.callOnDrop
      reader.onerror = this.props.onError
    } catch (event) {
      this.props.onError(event)
    }
  }

  render() {
    return (
      <input className={styles.input} type="file" onChange={this.handleOnChange} />
    )
  }
}

export default DropProfile
