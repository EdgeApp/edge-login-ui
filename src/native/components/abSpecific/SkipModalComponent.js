import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { Button } from '../common'
import { LOGO_DOT } from '../../../native/assets/'

/* type Props = {
  style: any,
  cancelFunc(): void,
  skipFunc(): void
} */

class SkipModalComponent extends Component {
  render () {
    const Style = this.props.style
    return (
      <View style={Style.container}>
        <View style={Style.backgroundContainer}>
          <View style={Style.backgroundBox} />
        </View>
        <View style={Style.foreground}>
          <View style={Style.logoContainer}>
            <Image source={LOGO_DOT} />
          </View>
          <View style={Style.headlineContainer}>
            <Text style={Style.headlineText}>Are you sure you want to skip?</Text>
          </View>
          <View style={Style.textContainer}>
            <Text style={Style.copyText}>
              Without a password, you will not be able to login on a new device if this device is lost or stolen, or if this app is uninstalled
            </Text>
          </View>
          <View style={Style.buttonsContainer}>
            <Button
              onPress={this.onCancelPress.bind(this)}
              downStyle={Style.cancelButton.downStyle}
              downTextStyle={Style.cancelButton.downTextStyle}
              upStyle={Style.cancelButton.upStyle}
              upTextStyle={Style.cancelButton.upTextStyle}
              label={'Cancel'}
            />
            <Button
              onPress={this.onSkipPress.bind(this)}
              downStyle={Style.skipButton.downStyle}
              downTextStyle={Style.skipButton.downTextStyle}
              upStyle={Style.skipButton.upStyle}
              upTextStyle={Style.skipButton.upTextStyle}
              label={'Yes, skip'}
            />
          </View>
        </View>
      </View>
    )
  }
  onCancelPress () {
    this.props.cancelFunc()
  }
  onSkipPress () {
    this.props.skipFunc()
  }
}

export { SkipModalComponent }
