// @flow

import React, { Component } from 'react'
import { Image, TouchableWithoutFeedback, View } from 'react-native'

import * as Assets from '../../assets/'

type Props = {
  small?: boolean,
  src?: string,
  style: Object,
  callback?: () => void
}

type State = {
  taps: number
}

class LogoImageHeader extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      taps: 0
    }
  }

  _onPress = () => {
    if (this.props.callback) {
      const taps = this.state.taps + 1
      this.setState({ taps })
      if (taps > 4) {
        // $FlowFixMe
        this.props.callback()
        this.setState({ taps: 0 })
      }
      if (taps === 1) {
        setTimeout(() => this.setState({ taps: 0 }), 2000)
      }
    }
  }

  render () {
    let src = this.props.src || Assets.LOGO_BIG
    if (this.props.small) {
      src = Assets.LOGO_SMALL
    }
    return (
      <TouchableWithoutFeedback onPress={this._onPress}>
        <View style={this.props.style.container}>
          <Image
            source={src}
            style={this.props.style.image}
            resizeMode={'contain'}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export { LogoImageHeader }
