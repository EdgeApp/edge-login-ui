// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'

import * as Constants from '../../../common/constants'
import { Spinner } from '../common'

type Props = {
  style: Object,
  pin: string,
  autoLogIn: boolean,
  error: string,
  wait: number,
  isLogginginWithPin: boolean
}

type State = {
  autoFocus: boolean,
  isFocused: boolean,
  touchId: boolean,
  circleColor: string
}

class FourDigitComponent extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      autoFocus: false,
      isFocused: false,
      touchId: false,
      circleColor: Constants.WHITE
    }
  }

  componentWillReceiveProps (nextProps: Props) {
    if (nextProps.isLogginginWithPin) {
      this.setState({
        touchId: true
      })
    }
  }
  render () {
    const Style = this.props.style
    return (
      <View style={Style.container}>
        <View style={Style.interactiveContainer}>
          {this.renderDotContainer(Style)}
        </View>
        <View style={Style.errorContainer}>
          <Text style={Style.errorText} numberOfLines={2}>
            {this.props.error}
          </Text>
        </View>
      </View>
    )
  }
  renderCircleTest (style: Object) {
    return style
    // return {...style, borderColor: this.state.circleColor}
  }
  renderDotContainer (style: Object) {
    const pinLength = this.props.pin ? this.props.pin.length : 0
    if (this.props.wait > 0) {
      return <Spinner />
    }
    if ((pinLength === 4 || this.state.touchId) && this.props.autoLogIn) {
      return <Spinner />
    }
    return (
      <View style={style.dotContainer}>
        <View
          style={[
            this.renderCircleTest(style.circle),
            pinLength > 0 && style.circleSected
          ]}
        />
        <View
          style={[
            this.renderCircleTest(style.circle),
            pinLength > 1 && style.circleSected
          ]}
        />
        <View
          style={[
            this.renderCircleTest(style.circle),
            pinLength > 2 && style.circleSected
          ]}
        />
        <View
          style={[
            this.renderCircleTest(style.circle),
            pinLength > 3 && style.circleSected
          ]}
        />
      </View>
    )
  }
}

export { FourDigitComponent }
