// @flow

import moment from 'moment'
import React, { Component } from 'react'
import { Image, Text, View } from 'react-native'

import { OTP_SMALL } from '../../assets/'
import s from '../../common/locales/strings.js'
import * as Constants from '../../constants/index.js'

type Props = {
  screen: string,
  style: Object,
  otpResetDate: Date | null
}

type State = {
  screen: string
}
class OtpHeroComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      screen: this.props.screen
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      screen: nextProps.screen
    })
  }

  renderOr(style: Object) {
    if (this.state.screen === Constants.OTP_SCREEN_TWO) {
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
    if (this.state.screen === Constants.OTP_SCREEN_ONE) {
      return 'Looks like 2FA is turned on'
    }
    return '2FA disable requested'
  }

  renderBodyCopy() {
    const { otpResetDate } = this.props
    if (
      this.state.screen === Constants.OTP_SCREEN_ONE ||
      otpResetDate == null
    ) {
      return 'Scan the QR code using the device that enabled 2FA to give access to this device'
    }
    return (
      "If you don't take any action, 2FA will be \ndisabled on " +
      moment(otpResetDate).format('LLL')
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
