// @flow

import React, { type Node, Component } from 'react'
import { StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const COLORS = ['#0E4B75', '#0D2145']
const UPPER_LEFT = { x: 0, y: 0 }
const UPPER_RIGHT = { x: 1, y: 0 }

type Props = {
  style?: StyleSheet,
  colors?: string[],
  children: Node
}

export default class Gradient extends Component<Props> {
  render() {
    return (
      <LinearGradient
        style={this.props.style}
        start={UPPER_LEFT}
        end={UPPER_RIGHT}
        colors={this.props.colors || COLORS}
      >
        {this.props.children}
      </LinearGradient>
    )
  }
}
