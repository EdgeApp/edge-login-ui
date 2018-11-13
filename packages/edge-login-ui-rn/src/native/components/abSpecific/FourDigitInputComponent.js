// @flow

import React, { Component } from 'react'
import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native'

import * as Constants from '../../../common/constants'
import { Spinner } from '../common'

type Props = {
  style: Object,
  pin: string,
  username: string,
  autoLogIn: boolean,
  error: string,
  wait: number,
  isLogginginWithPin: boolean,
  onChangeText(Object): void,
  updateWaitTime(number): void
}

type State = {
  autoFocus: boolean,
  isFocused: boolean,
  touchId: boolean,
  circleColor: string
}

class FourDigitInputComponent extends Component<Props, State> {
  inputRef: TextInput
  keyboardDidShowListener: any
  keyboardDidHideListener: any

  constructor (props: Props) {
    super(props)
    this.state = {
      autoFocus: false,
      isFocused: false,
      touchId: false,
      circleColor: Constants.WHITE
    }
  }
  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  loadedInput = (ref: TextInput) => {
    if (ref) {
      this.inputRef = ref
      this.inputRef.focus()
    }
  }
  _keyboardDidShow = () => {
    this.setState({
      circleColor: Constants.ACCENT_ORANGE
    })
  }
  _keyboardDidHide = () => {
    this.setState({
      circleColor: Constants.ACCENT_RED
    })
  }

  componentDidMount () {
    if (this.inputRef) {
      this.inputRef.focus()
    }
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    )
    this.inputRef.focus()
    this.setState({
      autoFocus: true
    })
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
      <TouchableWithoutFeedback onPress={this.refocus}>
        <View style={Style.container}>
          <View style={Style.interactiveContainer}>
            {this.renderDotContainer(Style)}
            {this.renderTextInput(Style)}
          </View>
          <View style={Style.errorContainer}>
            <Text style={Style.errorText} numberOfLines={2}>
              {this.props.error}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
  renderTextInput = (style: Object) => {
    if (this.props.wait < 1) {
      return (
        <TextInput
          ref={this.loadedInput}
          style={style.input}
          onChangeText={this.updatePin}
          maxLength={4}
          keyboardType="numeric"
          value={this.props.pin}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          autoFocus={this.state.autoFocus}
          keyboardShouldPersistTaps
        />
      )
    }
    return null
  }
  onFocus = () => {
    this.inputRef.focus()
    this.setState({
      isFocused: true
    })
  }
  onBlur = () => {
    if (this.props.dontForceFocus) {
      return
    }
    this.inputRef.focus()
    this.setState({
      isFocused: false,
      circleColor: Constants.WHITE
    })
  }
  refocus = () => {
    this.inputRef.focus()
    this.setState({
      autoFocus: true,
      isFocused: false
    })
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
  updatePin = (arg: string) => {
    this.props.onChangeText({ username: this.props.username, pin: arg })
  }
}

export { FourDigitInputComponent }
