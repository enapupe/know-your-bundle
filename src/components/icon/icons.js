import React from 'react'

import star from '../../images/star.svg'
import fork from '../../images/fork.svg'
import eye from '../../images/eye.svg'
import legal from '../../images/legal.svg'
import tag from '../../images/tag.svg'

import Icon from '.'

const Star = () => (
  <Icon icon={star} />
)

const Fork = () => (
  <Icon icon={fork} />
)

const Eye = () => (
  <Icon icon={eye} />
)

const Legal = () => (
  <Icon icon={legal} />
)

const Tag = () => (
  <Icon icon={tag} />
)

export { Star, Fork, Eye, Legal, Tag }
