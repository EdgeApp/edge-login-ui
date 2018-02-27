// @ flow
import React, { Component } from 'react'
import { Image, View } from 'react-native'

type Props = {
  small: boolean,
  style: Object
}

class ImageHeaderComponent extends Component<Props> {
  render () {
    return (
      <View style={this.props.style.container}>
        <Image source={this.props.src} style={this.props.style.image} />
      </View>
    )
  }
}

export { ImageHeaderComponent }
