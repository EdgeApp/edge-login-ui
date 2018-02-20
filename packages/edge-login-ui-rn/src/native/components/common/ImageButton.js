import React, { Component } from 'react'
import { Image, View, TouchableWithoutFeedback } from 'react-native'

class ImageButton extends Component {
  render () {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={this.props.style.container}>
          <Image source={this.props.source} style={this.props.style.image} />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export { ImageButton }
