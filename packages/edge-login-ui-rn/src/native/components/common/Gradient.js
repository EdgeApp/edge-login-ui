// @flow

import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'

type Props = {
  style: Object,
  children: any
}
export default class Gradient extends Component<Props> {
  render () {
    const UPPER_LEFT = { x: 0, y: 0 }
    const UPPER_RIGHT = { x: 1, y: 0 }
    return (
      <LinearGradient
        style={this.props.style}
        start={UPPER_LEFT}
        end={UPPER_RIGHT}
        colors={['#FFcc00', '#FF0000']}
      >
        {this.props.children}
      </LinearGradient>
    )
  }
}
