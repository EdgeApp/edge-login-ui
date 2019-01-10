// = @flow
import React, { Component } from 'react'
import { Image, TouchableWithoutFeedback, View } from 'react-native'

type Props = {
  style: Object,
  source: string,
  onPress(): void,
  disabled?: boolean
}
class ImageButton extends Component<Props> {
  render () {
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}
        disabled={this.props.disabled}
      >
        <View style={this.props.style.container}>
          <Image source={this.props.source} style={this.props.style.image} />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export { ImageButton }
