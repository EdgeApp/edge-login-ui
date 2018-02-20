import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button, StaticModal } from '../../common'
import HeaderConnector from '../../../connectors/componentConnectors/HeaderConnectorChangeApps.js'
import CreateFourDigitPinConnector from '../../../connectors/abSpecific/CreateFourDigitPinConnector.js'
import ChangePinModalConnector from '../../../connectors/abSpecific/ChangePinModalConnector'
// import * as Constants from '../../../common/constants'

export default class ChangeAccountPinScreenComponent extends Component {
  constructor (props) {
    super(props)
    this.renderHeader = style => {
      if (this.props.showHeader) {
        return <HeaderConnector style={style.header} />
      }
      return null
    }

    this.renderModal = style => {
      if (this.props.showModal) {
        if (this.props.forgotPasswordModal) {
          const body = (
            <View>
              <Text style={style.staticModalText}>
                Password and PIN successfully changed.
              </Text>
              <View style={style.shim} />
              <Text style={style.staticModalText}>
                Don&apos;t forget your password or recovery answers. You will
                permanently lose access to your funds if you lose your password
                and recovery answers.
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
    this.onNextPress = () => {
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
  }
  componentWillMount () {
    this.setState({
      username: '',
      pin: '',
      isProcessing: false,
      focusOn: 'pin'
    })
  }

  render () {
    const { SetAccountPinScreenStyle } = this.props.styles
    return (
      <View style={SetAccountPinScreenStyle.screen}>
        {this.renderHeader(SetAccountPinScreenStyle)}
        <View style={SetAccountPinScreenStyle.pageContainer}>
          <View style={SetAccountPinScreenStyle.row1}>
            <Text style={SetAccountPinScreenStyle.instructions}>
              Your PIN is a 4 digit code used to do quick re-logins into your
              account
            </Text>
          </View>
          <View style={SetAccountPinScreenStyle.row2}>
            <CreateFourDigitPinConnector
              style={SetAccountPinScreenStyle.fourPin}
            />
          </View>
          <View style={SetAccountPinScreenStyle.row3}>
            <Button
              onPress={this.onNextPress}
              downStyle={SetAccountPinScreenStyle.nextButton.downStyle}
              downTextStyle={SetAccountPinScreenStyle.nextButton.downTextStyle}
              upStyle={SetAccountPinScreenStyle.nextButton.upStyle}
              upTextStyle={SetAccountPinScreenStyle.nextButton.upTextStyle}
              label={'DONE'}
              isThinking={this.state.isProcessing}
              doesThink
            />
          </View>
        </View>
        {this.renderModal(SetAccountPinScreenStyle)}
      </View>
    )
  }
}
