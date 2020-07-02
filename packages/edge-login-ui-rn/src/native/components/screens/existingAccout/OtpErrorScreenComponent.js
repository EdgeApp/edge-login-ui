// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { sprintf } from 'sprintf-js'

import * as Constants from '../../../../common/constants'
import s from '../../../../common/locales/strings'
import { theme } from '../../../../common/theme/edgeDark.js'
import OtpBackupKeyConnector from '../../../../native/connectors/componentConnectors/OtpBackupKeyConnector'
import DisableOtpModalConnector from '../../../connectors/abSpecific/DisableOtpModalConnector'
import OtpAuthCodeModalConnector from '../../../connectors/abSpecific/OtpAuthCodeModalConnector'
import HeaderConnector from '../../../connectors/componentConnectors/HeaderConnectorOtp'
import { Button, StaticModal } from '../../common'
import { Airship } from '../../common/AirshipInstance.js'
import Gradient from '../../common/Gradient.js'
import { OtpAuthenticationCodeModal } from '../../common/OtpAuthenticationCodeModal.js'
import { QrCodeModal } from '../../common/QrCodeModal.js'
import SafeAreaViewGradient from '../../common/SafeAreaViewGradient.js'

const GRADIENT = [theme.background1, theme.background2]
const hardCodedDate = 'July 7, 2020 7:30PM'
const authorizeDevice = false

type Props = {
  styles: Object,
  screen: string,
  otpResetDate: string,
  backupKeyError?: string,
  loginSuccess: boolean,
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
  constructor(props: Props) {
    super(props)
    this.state = {
      showDisableModal: false,
      showBackupCodeModal: false,
      showstaticModal: false,
      screen: this.props.screen,
      backupKeyEntered: false
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.loginSuccess) {
      this.closeModals()
    }
    if (nextProps.backupKeyError) {
      this.setState({
        backupKeyEntered: false
      })
    }
  }

  componentWillUnMount() {
    this.closeModals()
  }

  closeModals() {
    this.setState({
      showDisableModal: false,
      showBackupCodeModal: false,
      showstaticModal: false,
      backupKeyEntered: false
    })
  }

  closeStaticModal() {
    this.setState({
      showstaticModal: false,
      screen: Constants.OTP_SCREEN_TWO
    })
  }

  sendCode() {
    this.setState({
      backupKeyEntered: true
    })
    this.props.setbackupKey()
  }

  disableOtp() {
    this.setState({
      showDisableModal: false,
      showstaticModal: true
    })
    this.props.resetOtpToken()
  }

  showBackupModal() {
    this.setState({
      showBackupCodeModal: true
    })
  }

  showDisableModal() {
    this.setState({
      showDisableModal: true
    })
  }

  getStaticBody(style: Object) {
    return (
      <Text style={style.staticModalText}>
        {s.strings.otp_dispable_req_sent}
      </Text>
    )
  }

  renderModal(style: Object) {
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

  renderDisableButton(style: Object) {
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

  openAuthenticationCodeModal = () =>
    Airship.show(bridge => (
      <OtpAuthenticationCodeModal
        bridge={bridge}
        submit={this.sendCode.bind(this)}
      />
    ))

  openQrModal = () => Airship.show(bridge => <QrCodeModal bridge={bridge} />)

  renderOtpScreen = () => {
    const { OtpErrorScreenStyle } = this.props.styles
    return (
      <SafeAreaViewGradient colors={GRADIENT}>
        <View style={OtpErrorScreenStyle.screen}>
          <HeaderConnector
            style={OtpErrorScreenStyle.header}
            colors={GRADIENT}
            title="2FA"
          />
          <Gradient style={styles.container} colors={GRADIENT}>
            <View style={styles.headerContainer}>
              <FontAwesome
                name="exclamation-triangle"
                style={styles.headerIcon}
              />
              <Text style={styles.headerText}>{s.strings.otp_page_header}</Text>
            </View>
            <Text style={styles.body1}>{s.strings.otp_page_body1}</Text>
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>{s.strings.string_or}</Text>
              <View style={styles.dividerLine} />
            </View>
            <TouchableWithoutFeedback onPress={this.openQrModal}>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>
                  {s.strings.otp_page_scan_qr}
                </Text>
                <FontAwesome name="chevron-right" style={styles.buttonIcon} />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={this.openAuthenticationCodeModal}
            >
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>
                  {s.strings.otp_page_scan_authetication}
                </Text>
                <FontAwesome name="chevron-right" style={styles.buttonIcon} />
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>{s.strings.string_or}</Text>
              <View style={styles.dividerLine} />
            </View>
            <Text style={styles.body2}>
              {sprintf(s.strings.otp_page_body2, hardCodedDate)}
            </Text>
          </Gradient>
        </View>
      </SafeAreaViewGradient>
    )
  }

  renderAuthorizeScreen = () => {
    const { OtpErrorScreenStyle } = this.props.styles
    return (
      <SafeAreaViewGradient colors={GRADIENT}>
        <View style={OtpErrorScreenStyle.screen}>
          <HeaderConnector
            style={OtpErrorScreenStyle.header}
            colors={GRADIENT}
            title="Authorize Device"
          />
          <Gradient style={styles.container} colors={GRADIENT}>
            <View style={styles.headerContainer}>
              <FontAwesome
                name="exclamation-triangle"
                style={styles.headerIcon}
              />
              <Text style={styles.headerText}>
                {s.strings.authorize_page_header}
              </Text>
            </View>
            <Text style={styles.body1}>{s.strings.authorize_page_body}</Text>
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>{s.strings.string_or}</Text>
              <View style={styles.dividerLine} />
            </View>
            <Text style={styles.body2}>
              {sprintf(s.strings.otp_page_body2, hardCodedDate)}
            </Text>
          </Gradient>
        </View>
      </SafeAreaViewGradient>
    )
  }

  render() {
    return authorizeDevice
      ? this.renderAuthorizeScreen()
      : this.renderOtpScreen()
  }

  // render() {
  //   const { OtpErrorScreenStyle } = this.props.styles
  //
  //   return (
  //     <SafeAreaView>
  //       <View style={OtpErrorScreenStyle.screen}>
  //         <HeaderConnector style={OtpErrorScreenStyle.header} />
  //         <View style={OtpErrorScreenStyle.pageContainer}>
  //           <OtpHeroComponent
  //             style={OtpErrorScreenStyle.hero}
  //             screen={this.state.screen}
  //             otpResetDate={this.props.otpResetDate}
  //           />
  //           <View style={OtpErrorScreenStyle.qrRow}>
  //             <EdgeLoginQrConnector />
  //           </View>
  //           <View style={OtpErrorScreenStyle.shim} />
  //           <Button
  //             onPress={this.showBackupModal.bind(this)}
  //             downStyle={OtpErrorScreenStyle.exitButton.downStyle}
  //             downTextStyle={OtpErrorScreenStyle.exitButton.downTextStyle}
  //             upStyle={OtpErrorScreenStyle.exitButton.upStyle}
  //             upTextStyle={OtpErrorScreenStyle.exitButton.upTextStyle}
  //             label={s.strings.type_auth_button}
  //           />
  //           {this.renderDisableButton(OtpErrorScreenStyle)}
  //         </View>
  //         {this.renderModal(OtpErrorScreenStyle)}
  //       </View>
  //     </SafeAreaView>
  //   )
  // }
}

const { rem } = theme
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: rem(1)
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: rem(0.5)
  },
  headerIcon: {
    color: theme.otpPageHeader,
    fontSize: rem(2.5),
    marginRight: rem(1)
  },
  headerText: {
    fontFamily: theme.fontFamily,
    fontSize: rem(1),
    color: theme.otpPageHeader,
    flex: 1
  },
  body1: {
    fontFamily: theme.fontFamily,
    fontSize: rem(1),
    color: theme.primaryText,
    marginVertical: rem(0.5)
  },
  dividerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: rem(0.5)
  },
  dividerLine: {
    height: 1,
    borderColor: theme.otpPageDivdider,
    borderBottomWidth: 1,
    flex: 1
  },
  dividerText: {
    fontFamily: theme.fontFamily,
    fontSize: rem(1),
    color: theme.otpPageDivdider,
    marginHorizontal: rem(0.5),
    paddingBottom: 5 // padding to center the text
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonIcon: {
    color: theme.otpPageButtonIcon,
    height: theme.rem(1),
    textAlign: 'center'
  },
  buttonText: {
    fontFamily: theme.fontFamily,
    fontSize: rem(1),
    color: theme.otpPageButtonText,
    marginVertical: rem(0.5),
    flex: 1
  },
  body2: {
    fontFamily: theme.fontFamily,
    fontSize: rem(1),
    color: theme.primaryText,
    marginVertical: rem(0.5)
  }
})
