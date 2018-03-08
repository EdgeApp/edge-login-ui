// @flow

import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import * as Constants from '../../../common/constants/'
import { OTP_SMALL } from '../../assets/'
import moment from 'moment'

type Props = {
  screen: string,
  style: Object,
  otpResetDate: string
}

type State = {
  screen: string
}
class OtpHeroComponent extends Component<Props, State> {
  componentWillMount () {
    this.setState({
      screen: this.props.screen
    })
  }
  componentWillReceiveProps (nextProps: Props) {
    this.setState({
      screen: nextProps.screen
    })
  }

  renderOr (style: Object) {
    if (this.state.screen === Constants.OTP_SCREEN_TWO) {
      return (
        <View style={style.orOption}>
          <View style={style.orRow}>
            <Text style={style.instructionsText}>──────── OR ────────</Text>
          </View>
          <View style={style.intructionsRow}>
            <Text style={style.instructionsText}>
              Scan the QR code below using the device that enabled 2FA to give
              access to the device{' '}
            </Text>
          </View>
        </View>
      )
    }
    return <View style={style.shim} />
  }

  renderTitle () {
    if (this.state.screen === Constants.OTP_SCREEN_ONE) {
      return 'Looks like 2FA is turned on'
    }
    return '2FA disable requested'
  }

  renderBodyCopy () {
    if (this.state.screen === Constants.OTP_SCREEN_ONE) {
      return 'Scan the QR code using the device that enabled 2FA to give access to this device'
    }
    return (
      "If you don't take any action, 2FA will be \ndisabled on " +
      moment(this.props.otpResetDate).format('MMMM DD, YYYY')
    )
  }
  renderImage () {
    return <Image source={OTP_SMALL} />
  }

  render () {
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
