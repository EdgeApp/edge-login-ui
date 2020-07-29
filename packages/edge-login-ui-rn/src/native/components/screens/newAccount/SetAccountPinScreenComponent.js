// @flow

import React, { Component } from 'react'
import { Alert, Text, View } from 'react-native'
import { connect } from 'react-redux'

import { createUser } from '../../../../common/actions/CreateAccountActions.js'
import s from '../../../../common/locales/strings'
import { type Dispatch, type RootState } from '../../../../types/ReduxTypes.js'
import HeaderConnector from '../../../connectors/componentConnectors/HeaderConnector'
import { FourDigitInput } from '../../abSpecific/FourDigitInputComponent.js'
import { Button } from '../../common'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'

type OwnProps = {
  styles: Object
}
type StateProps = {
  createErrorMessage: string | null,
  password: string,
  pin: string,
  pinError: string | null,
  username: string
}
type DispatchProps = {
  createUser(data: Object): void
}
type Props = OwnProps & StateProps & DispatchProps

type State = {
  username: string,
  pin: string,
  createErrorMessage: string | null,
  isProcessing: boolean,
  focusOn: string
}

class SetAccountPinScreenComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      username: '',
      pin: '',
      isProcessing: false,
      focusOn: 'pin',
      createErrorMessage: this.props.createErrorMessage
    }
  }

  checkError = () => {
    if (this.state.createErrorMessage) {
      Alert.alert(
        s.strings.create_account_error_title,
        s.strings.create_account_error_message +
          '\n' +
          this.state.createErrorMessage,
        [{ text: s.strings.ok }]
      )
      this.setState({ createErrorMessage: null })
    }
  }

  render() {
    const { SetAccountPinScreenStyle } = this.props.styles
    this.checkError()
    return (
      <SafeAreaView>
        <View style={SetAccountPinScreenStyle.screen}>
          <HeaderConnector style={SetAccountPinScreenStyle.header} />
          <View style={SetAccountPinScreenStyle.pageContainer}>
            <View style={SetAccountPinScreenStyle.row1}>
              <Text style={SetAccountPinScreenStyle.instructions}>
                {s.strings.pin_desc}
              </Text>
            </View>
            <View style={SetAccountPinScreenStyle.row2}>
              <FourDigitInput style={SetAccountPinScreenStyle.fourPin} />
            </View>
            <View style={SetAccountPinScreenStyle.row3}>
              <Button
                onPress={this.onNextPress}
                downStyle={SetAccountPinScreenStyle.nextButton.downStyle}
                downTextStyle={
                  SetAccountPinScreenStyle.nextButton.downTextStyle
                }
                upStyle={SetAccountPinScreenStyle.nextButton.upStyle}
                upTextStyle={SetAccountPinScreenStyle.nextButton.upTextStyle}
                label={s.strings.next_label}
                isThinking={this.state.isProcessing}
                doesThink
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  onNextPress = () => {
    this.setState({
      isProcessing: true,
      createErrorMessage: null
    })
    // validation.
    // is there no error message ,
    if (this.props.pin.length !== 4 || this.props.pinError) {
      this.setState({
        isProcessing: false
      })
      global.firebase &&
        global.firebase.analytics().logEvent(`Signup_PIN_Invalid`)
      return
    }
    global.firebase &&
      global.firebase.analytics().logEvent(`Signup_Create_User`)
    this.props.createUser({
      username: this.props.username,
      password: this.props.password,
      pin: this.props.pin
    })
  }
}

export const SetAccountPinScreen = connect(
  (state: RootState): StateProps => ({
    createErrorMessage: state.create.createErrorMessage,
    password: state.create.password || '',
    pin: state.create.pin,
    pinError: state.create.pinError,
    username: state.create.username || ''
  }),
  (dispatch: Dispatch): DispatchProps => ({
    createUser(data: Object) {
      dispatch({ type: 'CLEAR_CREATE_ERROR_MESSAGE' })
      dispatch(createUser(data))
    }
  })
)(SetAccountPinScreenComponent)
