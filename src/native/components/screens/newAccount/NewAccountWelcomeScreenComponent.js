import React, { Component } from 'react'
import { View } from 'react-native'
import { Button } from '../../common'
// import * as Constants from '../../../common/constants'

export default class LandingScreenComponent extends Component {
  render () {
    const { NewAccountWelcomeScreenStyle } = this.props.styles
    return (
      <View style={NewAccountWelcomeScreenStyle.screen}>
        <View style={NewAccountWelcomeScreenStyle.row1}>
          <Button
            onPress={this.onExitPress.bind(this)}
            downStyle={NewAccountWelcomeScreenStyle.exitButton.downStyle}
            downTextStyle={
              NewAccountWelcomeScreenStyle.exitButton.downTextStyle
            }
            upStyle={NewAccountWelcomeScreenStyle.exitButton.upStyle}
            upTextStyle={NewAccountWelcomeScreenStyle.exitButton.upTextStyle}
            label={'Exit'}
          />
        </View>
        <View style={NewAccountWelcomeScreenStyle.row2} />
        <View style={NewAccountWelcomeScreenStyle.row3} />
        <View style={NewAccountWelcomeScreenStyle.row4} />
        <View style={NewAccountWelcomeScreenStyle.row5} />
        <View style={NewAccountWelcomeScreenStyle.row6}>
          <Button
            onPress={this.onNextPress.bind(this)}
            downStyle={NewAccountWelcomeScreenStyle.nextButton.downStyle}
            downTextStyle={
              NewAccountWelcomeScreenStyle.nextButton.downTextStyle
            }
            upStyle={NewAccountWelcomeScreenStyle.nextButton.upStyle}
            upTextStyle={NewAccountWelcomeScreenStyle.nextButton.upTextStyle}
            label={'Get started'}
          />
        </View>

      </View>
    )
  }
  onNextPress () {
    this.props.nextScreen()
  }
  onExitPress () {
    this.props.exitScreen()
  }
}
