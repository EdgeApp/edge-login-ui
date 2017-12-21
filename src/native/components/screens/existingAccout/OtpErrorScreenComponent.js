import React, { Component } from 'react'
import { View } from 'react-native'
import { Button } from '../../common'

export default class OtpErrorScreenComponent extends Component {
  sendCode () {
    this.props.setbackupKey('S7UQ66VYNZKAX4EV')
  }

  render () {
    const { OtpErrorScreenStyle } = this.props.styles

    return (
      <View style={OtpErrorScreenStyle.screen}>
        <View style={OtpErrorScreenStyle.row1}>
          <Button
            onPress={this.sendCode.bind(this)}
            downStyle={OtpErrorScreenStyle.exitButton.downStyle}
            downTextStyle={OtpErrorScreenStyle.exitButton.downTextStyle}
            upStyle={OtpErrorScreenStyle.exitButton.upStyle}
            upTextStyle={OtpErrorScreenStyle.exitButton.upTextStyle}
            label={'Exit'}
          />
        </View>
      </View>
    )
  }
}
