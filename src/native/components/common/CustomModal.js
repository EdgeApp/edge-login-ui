import React, { Component } from 'react'
import { View } from 'react-native'

class CustomModal extends Component {
  render () {
    return (
      <View style={this.props.style}>
        <View>{this.props.children}</View>
      </View>
    )
  }
}

export { CustomModal }
