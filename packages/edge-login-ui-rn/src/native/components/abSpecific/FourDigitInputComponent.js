// @flow

import React, { Component } from 'react'
import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { connect } from 'react-redux'

import { validatePin } from '../../../common/actions/CreateAccountActions.js'
import * as Constants from '../../../common/constants'
import type { Dispatch, RootState } from '../../../types/ReduxTypes'
import { Spinner } from '../common'

type OwnProps = {
  style: Object
}
type StateProps = {
  error: string,
  pin: string,
  username: string,
  wait: number
}
type DispatchProps = {
  onChangeText(data: Object): void
}
type Props = OwnProps & StateProps & DispatchProps

type State = {
  autoFocus: boolean,
  isFocused: boolean,
  circleColor: string
}

class FourDigitInputComponent extends Component<Props, State> {
  inputRef: TextInput | null
  keyboardDidShowListener: any
  keyboardDidHideListener: any

  constructor(props: Props) {
    super(props)
    this.state = {
      autoFocus: false,
      isFocused: false,
      circleColor: Constants.WHITE
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  loadedInput = (ref: TextInput) => {
    this.inputRef = ref
    if (ref) {
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

  componentDidMount() {
    this.inputRef && this.inputRef.focus()
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    )
    this.inputRef && this.inputRef.focus()
    this.setState({
      autoFocus: true
    })
  }

  render() {
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
          autoFocus={this.state.autoFocus}
          keyboardShouldPersistTaps
        />
      )
    }
    return null
  }

  onFocus = () => {
    this.setState({
      isFocused: true
    })
  }

  refocus = () => {
    this.inputRef && this.inputRef.focus()
    this.setState({
      autoFocus: true,
      isFocused: false
    })
  }

  renderCircleTest(style: Object) {
    return style
    // return {...style, borderColor: this.state.circleColor}
  }

  renderDotContainer(style: Object) {
    const pinLength = this.props.pin ? this.props.pin.length : 0
    if (this.props.wait > 0) {
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

export const FourDigitInput = connect(
  (state: RootState): StateProps => ({
    error: state.create.pinErrorMessage || '',
    pin: state.create.pin,
    username: state.login.username,
    wait: 0
  }),
  (dispatch: Dispatch): DispatchProps => ({
    onChangeText(data: Object) {
      dispatch(validatePin(data))
    }
  })
)(FourDigitInputComponent)
