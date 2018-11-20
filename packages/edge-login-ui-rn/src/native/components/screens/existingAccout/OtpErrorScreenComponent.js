// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'

import * as Constants from '../../../../common/constants'
import s from '../../../../common/locales/strings'
import EdgeLoginQrConnector from '../../../../native/connectors/componentConnectors/EdgeLoginQrConnector'
import OtpBackupKeyConnector from '../../../../native/connectors/componentConnectors/OtpBackupKeyConnector'
import DisableOtpModalConnector from '../../../connectors/abSpecific/DisableOtpModalConnector'
import OtpAuthCodeModalConnector from '../../../connectors/abSpecific/OtpAuthCodeModalConnector'
import HeaderConnector from '../../../connectors/componentConnectors/HeaderConnectorOtp'
import { OtpHeroComponent } from '../../abSpecific/OtpHeroComponent'
import { Button, StaticModal } from '../../common'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'

type Props = {
  styles: Object,
  screen: string,
  otpResetDate: string,
  resetOtpToken(): void,
  setbackupKey(): void
}

type State = {
  showDisableModal: boolean,
  showBackupCodeModal: boolean,
  showDisableModal: boolean,
  showstaticModal: boolean,
  screen: string,
  backupKeyEntered: boolean
}

export default class OtpErrorScreenComponent extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      showDisableModal: false,
      showBackupCodeModal: false,
      showstaticModal: false,
      screen: this.props.screen,
      backupKeyEntered: false
    }
  }
  componentWillReceiveProps (nextProps: Props) {
    if (nextProps.loginSuccess) {
      this.closeModals()
    }
    if (nextProps.backupKeyError) {
      this.setState({
        backupKeyEntered: false
      })
    }
  }
  componentWillUnMount () {
    this.closeModals()
  }
  closeModals () {
    this.setState({
      showDisableModal: false,
      showBackupCodeModal: false,
      showstaticModal: false,
      backupKeyEntered: false
    })
  }
  closeStaticModal () {
    this.setState({
      showstaticModal: false,
      screen: Constants.OTP_SCREEN_TWO
    })
  }
  sendCode () {
    this.setState({
      backupKeyEntered: true
    })
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
  getStaticBody (style: Object) {
    return (
      <Text style={style.staticModalText}>
        {s.strings.otp_dispable_req_sent}
      </Text>
    )
  }

  renderModal (style: Object) {
    if (this.state.showBackupCodeModal) {
      const middle = (
        <View style={style.modalMiddle}>
          <Text style={style.staticModalText}>
            {s.strings.otp_instructions}
          </Text>
          <OtpBackupKeyConnector
            style={style.modalInput}
            onSubmitEditing={this.sendCode.bind(this)}
          />
          <View style={style.shim} />
        </View>
      )
      return (
        <OtpAuthCodeModalConnector
          cancel={this.closeModals.bind(this)}
          action={this.sendCode.bind(this)}
          middle={middle}
          thinking={this.state.backupKeyEntered}
        />
      )
    }
    if (this.state.showDisableModal) {
      return (
        <DisableOtpModalConnector
          cancel={this.closeModals.bind(this)}
          action={this.disableOtp.bind(this)}
        />
      )
    }
    if (this.state.showstaticModal) {
      return (
        <StaticModal
          cancel={this.closeStaticModal.bind(this)}
          body={this.getStaticBody(style)}
          modalDismissTimerSeconds={8}
        />
      )
    }
    return null
  }

  renderDisableButton (style: Object) {
    if (this.state.screen === Constants.OTP_SCREEN_ONE) {
      return (
        <Button
          onPress={this.showDisableModal.bind(this)}
          downStyle={style.exitButton.downStyle}
          downTextStyle={style.exitButton.downTextStyle}
          upStyle={style.exitButton.upStyle}
          upTextStyle={style.exitButton.upTextStyle}
          label={s.strings.disable_otp_button_two}
        />
      )
    }
    return null
  }

  render () {
    const { OtpErrorScreenStyle } = this.props.styles

    return (
      <SafeAreaView>
        <View style={OtpErrorScreenStyle.screen}>
          <HeaderConnector style={OtpErrorScreenStyle.header} />
          <View style={OtpErrorScreenStyle.pageContainer}>
            <OtpHeroComponent
              style={OtpErrorScreenStyle.hero}
              screen={this.state.screen}
              otpResetDate={this.props.otpResetDate}
            />
            <View style={OtpErrorScreenStyle.qrRow}>
              <EdgeLoginQrConnector />
            </View>
            <View style={OtpErrorScreenStyle.shim} />
            <Button
              onPress={this.showBackupModal.bind(this)}
              downStyle={OtpErrorScreenStyle.exitButton.downStyle}
              downTextStyle={OtpErrorScreenStyle.exitButton.downTextStyle}
              upStyle={OtpErrorScreenStyle.exitButton.upStyle}
              upTextStyle={OtpErrorScreenStyle.exitButton.upTextStyle}
              label={s.strings.type_auth_button}
            />
            {this.renderDisableButton(OtpErrorScreenStyle)}
          </View>
          {this.renderModal(OtpErrorScreenStyle)}
        </View>
      </SafeAreaView>
    )
  }
}
