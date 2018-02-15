import React, { Component } from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Spinner } from '../common'
import * as Constants from '../../../common/constants'

/* type Props = {
  style: any,
  autoLogIn: boolean
} */

class FourDigitInputComponent extends Component {

  componentWillMount () {
    this.setState({
      autoFocus: false,
      touchId: false,
      circleColor: Constants.WHITE
    })
    this.loadedInput = (ref) => {
      if (ref) {
        this.inputRef = ref
        this.inputRef.focus()
      }
    }
  }
  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }
  componentDidMount () {
    if (this.inputRef) {
      this.inputRef.focus()
    }
    this._keyboardDidShow = () => {
      this.setState({
        circleColor: Constants.ACCENT_ORANGE
      })
    }
    this._keyboardDidHide = () => {
      this.setState({
        circleColor: Constants.ACCENT_RED
      })
    }
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)

    this.inputRef.focus()
    this.setState({
      autoFocus: true
    })
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.isLogginginWithPin) {
      this.setState({
        touchId: true
      })
    }
  }
  render () {
    const Style = this.props.style
    return (
      <TouchableWithoutFeedback onPress={this.refocus.bind(this)} >
        <View style={Style.container}>
          <View style={Style.interactiveContainer}>
            {this.renderDotContainer(Style)}
            <TextInput
              ref={this.loadedInput}
              style={Style.input}
              onChangeText={this.updatePin.bind(this)}
              maxLength={4}
              keyboardType='numeric'
              value={this.props.pin}
              onFocus={this.onFocus.bind(this)}
              onBlur={this.onBlur.bind(this)}
              autoFocus={this.state.autoFocus}
              keyboardShouldPersistTaps
            />
          </View>
          <View style={Style.errorContainer}>
            <Text style={Style.errorText}>{this.props.error}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
  onFocus () {
    this.inputRef.focus()
    this.setState({
      isFocused: true
    })
  }
  onBlur () {
    if (this.props.dontForceFocus) {
      return
    }
    this.inputRef.focus()
    this.setState({
      isFocused: false,
      circleColor: Constants.WHITE
    })
  }
  refocus () {
    this.inputRef.focus()
    this.setState({
      autoFocus: true,
      isFocused: false
    })
  }
  renderCircleTest (style) {
    return style
    // return {...style, borderColor: this.state.circleColor}
  }
  renderDotContainer (style) {
    const pinLength = this.props.pin ? this.props.pin.length : 0
    if ((pinLength === 4 || this.state.touchId) && this.props.autoLogIn) {
      return <Spinner />
    }
    return (
      <View style={style.dotContainer}>
        <View style={[this.renderCircleTest(style.circle), pinLength > 0 && style.circleSected]} />
        <View style={[this.renderCircleTest(style.circle), pinLength > 1 && style.circleSected]} />
        <View style={[this.renderCircleTest(style.circle), pinLength > 2 && style.circleSected]} />
        <View style={[this.renderCircleTest(style.circle), pinLength > 3 && style.circleSected]} />
      </View>
    )
  }
  updatePin (arg) {
    this.props.onChangeText({ username: this.props.username, pin: arg })
  }
}

export { FourDigitInputComponent }
