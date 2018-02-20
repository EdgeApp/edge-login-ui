import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'
export default class Gradient extends Component {
  render () {
    /* const {
      lightColor,
      rightColor
    } = this.props */
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
