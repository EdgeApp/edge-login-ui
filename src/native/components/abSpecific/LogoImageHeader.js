import React, { Component, PropTypes } from 'react'
import { Image, View } from 'react-native'
import * as Assets from '../../assets/'

class LogoImageHeader extends Component {
  render () {
    let src = Assets.LOGO_BIG
    if (this.props.small) {
      src = Assets.LOGO_SMALL
    }
    return (
      <View style={this.props.style.container}>
        <Image source={src} style={this.props.style.image} />
      </View>
    )
  }
}

LogoImageHeader.propTypes = {
  small: PropTypes.bool,
  style: PropTypes.object.isRequired
}

export { LogoImageHeader }
