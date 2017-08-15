import React, { Component, PropTypes } from 'react'
import { Image } from 'react-native'
import * as Assets from '../../assets/'

export default class LogoImageHeader extends Component {
  render () {
    let src = Assets.LOGO_BIG
    if (this.props.small) {
      src = Assets.LOGO_SMALL
    }
    return (
      <Image source={src} style={this.props.style.image} />
    )
  }
}

LogoImageHeader.propTypes = {
  small: PropTypes.bool,
  style: PropTypes.object.isRequired
}
