// @flow

import React, { Component } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { sprintf } from 'sprintf-js'

import s from '../../../../common/locales/strings'
import { HeaderContainerScaledStyle } from '../../../../common/styles/common/HeaderStyles.js'
import { theme } from '../../../../common/theme/edgeDark.js'
import HeaderConnector from '../../../connectors/componentConnectors/HeaderConnectorOtp'
import { Airship } from '../../common/AirshipInstance.js'
import Gradient from '../../common/Gradient.js'
import { OtpAuthenticationCodeModal } from '../../common/OtpAuthenticationCodeModal.js'
import { QrCodeModal } from '../../common/QrCodeModal.js'
import SafeAreaViewGradient from '../../common/SafeAreaViewGradient.js'

const GRADIENT = [theme.background1, theme.background2]
const hardCodedDate = 'July 7, 2020 7:30PM'
const authorizeDevice = false

export default class OtpErrorScreenComponent extends Component<{}> {
  openAuthenticationCodeModal = () =>
    Airship.show(bridge => <OtpAuthenticationCodeModal bridge={bridge} />)

  openQrModal = () => Airship.show(bridge => <QrCodeModal bridge={bridge} />)

  renderOtpScreen = () => {
    return (
      <SafeAreaViewGradient colors={GRADIENT}>
        <HeaderConnector
          style={HeaderContainerScaledStyle}
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
          <TouchableWithoutFeedback onPress={this.openAuthenticationCodeModal}>
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
      </SafeAreaViewGradient>
    )
  }

  renderAuthorizeScreen = () => {
    return (
      <SafeAreaViewGradient colors={GRADIENT}>
        <HeaderConnector
          style={HeaderContainerScaledStyle}
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
      </SafeAreaViewGradient>
    )
  }

  render() {
    return authorizeDevice
      ? this.renderAuthorizeScreen()
      : this.renderOtpScreen()
  }
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
