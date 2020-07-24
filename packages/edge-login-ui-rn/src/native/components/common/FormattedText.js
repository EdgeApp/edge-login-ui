// @flow

import React, { Component } from 'react'
import { Text } from 'react-native'

import { scale } from '../../../common/util/scaling.js'

type Props = {
  fontSize?: number,
  style: any,
  children: any
}

export default class FormattedText extends Component<Props> {
  render() {
    const fontSize = this.props.fontSize
      ? scale(this.props.fontSize)
      : scale(14)
    return (
      <Text
        {...this.props}
        style={[this.props.style, { fontSize }]}
        allowFontScaling={false}
      >
        {this.props.children}
      </Text>
    )
  }
}
