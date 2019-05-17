// @flow

import React, { Component } from 'react'

import * as Constants from '../../../common/constants'
import { scale } from '../../../common/util'
import { Icon } from './'

type Props = {
  style: Object,
  name: string,
  type: boolean
}

class ModalIcon extends Component<Props> {
  render () {
    const { style, name, type } = this.props
    return (
      <Icon
        name={name}
        type={type}
        size={scale(25)}
        style={{ color: Constants.SECONDARY, ...style }}
      />
    )
  }
}

export { ModalIcon }
