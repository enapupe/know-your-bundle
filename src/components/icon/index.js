import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({ alt, className, icon, width, height }) => (
  <svg alt={alt} width={width} height={height} className={className}>
    <use xlinkHref={`#${icon.id}`} />
  </svg>
)

Icon.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

Icon.defaultProps = {
  className: undefined,
  width: 16,
  height: 16,
}

export default Icon
