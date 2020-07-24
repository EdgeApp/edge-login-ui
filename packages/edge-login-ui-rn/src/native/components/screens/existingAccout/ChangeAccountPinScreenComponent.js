// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

import {
  changePIN,
  recoveryChangePIN
} from '../../../../common/actions/ChangePasswordPinActions.js'
import { recoveryLoginComplete } from '../../../../common/actions/LoginAction.js'
import s from '../../../../common/locales/strings'
import { type Dispatch, type RootState } from '../../../../types/ReduxTypes.js'
import ChangePinModalConnector from '../../../connectors/abSpecific/ChangePinModalConnector'
import HeaderConnector from '../../../connectors/componentConnectors/HeaderConnectorChangeApps.js'
import { FourDigitInput } from '../../abSpecific/FourDigitInputComponent.js'
import { Button, StaticModal } from '../../common'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'

type OwnProps = {
  showHeader?: boolean,
  styles: Object
}
type StateProps = {
  forgotPasswordModal?: boolean,
  pin: string,
  pinError: string,
  showModal: boolean
}
type DispatchProps = {
  changePin(pin: string): void,
  login?: () => void
}
type Props = OwnProps & StateProps & DispatchProps

type State = {
  isProcessing: boolean,
  pin: string,
  username: string,
  focusOn: string
}

class ChangeAccountPinScreenComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      username: '',
      pin: '',
      isProcessing: false,
      focusOn: 'pin'
    }
  }

  renderHeader = (style: Object) => {
    if (this.props.showHeader) {
      return <HeaderConnector style={style.header} />
    }
    return null
  }

  renderModal = (style: Object) => {
    if (this.props.showModal) {
      if (this.props.forgotPasswordModal) {
        const body = (
          <View>
            <Text style={style.staticModalText}>
              {s.strings.pswd_and_pin_changed}
            </Text>
            <View style={style.shim} />
            <Text style={style.staticModalText}>
              {s.strings.change_pwd_body}
            </Text>
          </View>
        )
        return (
          <StaticModal
            cancel={this.props.login}
            body={body}
            modalDismissTimerSeconds={8}
          />
        )
      }
      return <ChangePinModalConnector style={style.modal.skip} />
    }
    return null
  }

  onNextPress = () => {
    this.setState({
      isProcessing: true
    })
    // validation.
    // is there no error message ,
    if (this.props.pin.length !== 4 || this.props.pinError) {
      this.setState({
        isProcessing: false
      })
      return
    }
    this.props.changePin(this.props.pin)
  }

  render() {
    const { SetAccountPinScreenStyle } = this.props.styles
    return (
      <SafeAreaView>
        <View style={SetAccountPinScreenStyle.screen}>
          {this.renderHeader(SetAccountPinScreenStyle)}
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
                label={s.strings.done}
                isThinking={this.state.isProcessing}
                doesThink
              />
            </View>
          </View>
          {this.renderModal(SetAccountPinScreenStyle)}
        </View>
      </SafeAreaView>
    )
  }
}

export const ChangeAccountPinScreen = connect(
  (state: RootState): StateProps => ({
    pin: state.create.pin,
    pinError: state.create.pinError,
    workflow: state.workflow,
    showModal: state.create.showModal
  }),
  (dispatch: Dispatch): DispatchProps => ({
    changePin(data) {
      dispatch(changePIN(data))
    }
  })
)(ChangeAccountPinScreenComponent)

export const ForgotPinChangePinScene = connect(
  (state: RootState): StateProps => ({
    forgotPasswordModal: true,
    pin: state.create.pin,
    pinError: state.create.pinError,
    showHeader: true,
    showModal: state.create.showModal
  }),
  (dispatch: Dispatch): DispatchProps => ({
    changePin(data: string) {
      dispatch(recoveryChangePIN(data))
    },
    login() {
      dispatch(recoveryLoginComplete())
    }
  })
)(ChangeAccountPinScreenComponent)
