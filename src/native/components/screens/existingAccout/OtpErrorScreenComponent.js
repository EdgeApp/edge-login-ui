import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button, StaticModal } from '../../common'
import HeaderConnector
  from '../../../connectors/componentConnectors/HeaderConnectorOtp'
import OtpAuthCodeModalConnector
  from '../../../connectors/abSpecific/OtpAuthCodeModalConnector'
import DisableOtpModalConnector
  from '../../../connectors/abSpecific/DisableOtpModalConnector'
import { OtpHeroComponent } from '../../abSpecific/OtpHeroComponent'
import * as Constants from '../../../../common/constants'
import OtpBackupKeyConnector from '../../../../native/connectors/componentConnectors/OtpBackupKeyConnector'
import EdgeLoginQrConnector from '../../../../native/connectors/componentConnectors/EdgeLoginQrConnector'
export default class OtpErrorScreenComponent extends Component {
  componentWillMount () {
    this.setState({
      showDisableModal: false,
      showBackupCodeModal: false,
      showstaticModal: false,
      screen: this.props.screen
    })
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.loginSuccess) {
      this.closeModals()
    }
  }
  componentWillUnMount () {
    this.closeModals()
  }
  closeModals () {
    this.setState({
      showDisableModal: false,
      showBackupCodeModal: false,
      showstaticModal: false
    })
  }
  closeStaticModal () {
    this.setState({
      showstaticModal: false,
      screen: Constants.OTP_SCREEN_TWO

    })
  }
  sendCode () {
    this.props.setbackupKey()
  }

  disableOtp () {
    this.setState({
      showDisableModal: false,
      showstaticModal: true
    })
    this.props.resetOtpToken()
  }

  showBackupModal () {
    this.setState({
      showBackupCodeModal: true
    })
  }
  showDisableModal () {
    this.setState({
      showDisableModal: true
    })
  }
  getStaticBody (style) {
    return <Text style={style.staticModalText}>2FA disable request has been sent. You'll be able to login with your username and password after 7 days.</Text>
  }

  renderModal (style) {
    if (this.state.showBackupCodeModal) {
      const middle = <View style={style.modalMiddle}>
        <Text style={style.staticModalText}>
          Sign into your account using the device you setup 2FA with, and go to Settings > 2 Factor Authentication to find the code.
        </Text>
        <OtpBackupKeyConnector style={style.modalInput}
          onSubmitEditing={this.sendCode.bind(this)} />
        <View style={style.shim} />
      </View>
      return <OtpAuthCodeModalConnector
        cancel={this.closeModals.bind(this)}
        action={this.sendCode.bind(this)}
        middle={middle} />
    }
    if (this.state.showDisableModal) {
      return <DisableOtpModalConnector
        cancel={this.closeModals.bind(this)}
        action={this.disableOtp.bind(this)} />
    }
    if (this.state.showstaticModal) {
      return <StaticModal
        cancel={this.closeStaticModal.bind(this)}
        body={this.getStaticBody(style)}
        modalDismissTimerSeconds={4} />
    }
    return null
  }

  renderDisableButton (style) {
    if (this.state.screen === Constants.OTP_SCREEN_ONE) {
      return <Button
        onPress={this.showDisableModal.bind(this)}
        downStyle={style.exitButton.downStyle}
        downTextStyle={style.exitButton.downTextStyle}
        upStyle={style.exitButton.upStyle}
        upTextStyle={style.exitButton.upTextStyle}
        label={'Disable 2 Factor Authentication'}
      />
    }
    return null
  }

  render () {
    const { OtpErrorScreenStyle } = this.props.styles

    return (
      <View style={OtpErrorScreenStyle.screen}>
        <HeaderConnector style={OtpErrorScreenStyle.header} />
        <View style={OtpErrorScreenStyle.pageContainer}>
          <OtpHeroComponent style={OtpErrorScreenStyle.hero}
            screen={this.state.screen}
            otpResetDate={this.props.otpResetDate} />
          <View style={OtpErrorScreenStyle.qrRow} >
            <EdgeLoginQrConnector />
          </View>
          <View style={OtpErrorScreenStyle.shim} />
          <Button
            onPress={this.showBackupModal.bind(this)}
            downStyle={OtpErrorScreenStyle.exitButton.downStyle}
            downTextStyle={OtpErrorScreenStyle.exitButton.downTextStyle}
            upStyle={OtpErrorScreenStyle.exitButton.upStyle}
            upTextStyle={OtpErrorScreenStyle.exitButton.upTextStyle}
            label={'Type in authentication code instead'}
          />
          {this.renderDisableButton(OtpErrorScreenStyle)}
        </View>
        {this.renderModal(OtpErrorScreenStyle)}
      </View>
    )
  }
}
