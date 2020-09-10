// @flow

import React, { Component } from 'react'
import { Image, Text, View } from 'react-native'

import { OTP_SMALL } from '../../assets/'
import s from '../../common/locales/strings.js'

type Props = {
  style: Object,
  otpResetDate?: Date
}

class OtpHeroComponent extends Component<Props> {
  renderOr(style: Object) {
    if (this.props.otpResetDate != null) {
      return (
        <View style={style.orOption}>
          <View style={style.orRow}>
            <Text style={style.instructionsText}>
              ──────── {s.strings.or} ────────
            </Text>
          </View>
          <View style={style.intructionsRow}>
            <Text style={style.instructionsText}>
              {s.strings.otp_hero_scan}
            </Text>
          </View>
        </View>
      )
    }
    return <View style={style.shim} />
  }

  renderTitle() {
    if (this.props.otpResetDate == null) {
      return 'Looks like 2FA is turned on'
    }
    return '2FA disable requested'
  }

  renderBodyCopy() {
    const { otpResetDate } = this.props
    if (otpResetDate == null) {
      return 'Scan the QR code using the device that enabled 2FA to give access to this device'
    }
    return (
      "If you don't take any action, 2FA will be \ndisabled on " +
      new Date(otpResetDate).toLocaleString()
    )
  }

  renderImage() {
    return <Image source={OTP_SMALL} />
  }

  render() {
    const style = this.props.style
    const title = this.renderTitle()
    const bodyCopy = this.renderBodyCopy()
    return (
      <View style={style.container}>
        <View style={style.colorField}>
          <View style={style.leftField}>{this.renderImage()}</View>
          <View style={style.rightField}>
            <Text style={style.heroTitleText}>{title}</Text>
            <Text style={style.heroText}>{bodyCopy}</Text>
          </View>
        </View>
        {this.renderOr(style)}
      </View>
    )
  }
}

export { OtpHeroComponent }
