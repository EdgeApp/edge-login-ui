import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button, HeaderBackButton } from '../../common'
import { ImageHeaderComponent } from '../../abSpecific'
import * as Assets from '../../../assets'
import SafeAreaView from '../../common/SafeAreaView.js'
// import * as Constants from '../../../common/constants'

export default class NewAccountWelcomeScreenComponent extends Component {
  render () {
    const { NewAccountWelcomeScreenStyle } = this.props.styles

    return (
      <SafeAreaView>
        <View style={NewAccountWelcomeScreenStyle.screen}>
          <View style={NewAccountWelcomeScreenStyle.row1}>
            <HeaderBackButton
              onPress={this.props.exitScreen}
              styles={NewAccountWelcomeScreenStyle.exitBackButtonStyle}
              label={'Exit'}
            />
          </View>
          <View style={NewAccountWelcomeScreenStyle.row2}>
            <ImageHeaderComponent
              style={NewAccountWelcomeScreenStyle.logoHeader}
              src={Assets.WELCOME}
            />
          </View>
          <View style={NewAccountWelcomeScreenStyle.row3}>
            <Text style={NewAccountWelcomeScreenStyle.instructionsText}>
              Let’s get started by creating your account login. You’ll choose a
              username and password, which we’ll use to encrypt your account.
              Not even Edge has access to your information, so you have full and
              complete control over your digital assets.
            </Text>
          </View>
          <View style={NewAccountWelcomeScreenStyle.row4} />
          <View style={NewAccountWelcomeScreenStyle.row5}>
            <Text style={NewAccountWelcomeScreenStyle.callToAction}>
              Let’s get started with choosing a username
            </Text>
          </View>
          <View style={NewAccountWelcomeScreenStyle.row6}>
            <Button
              onPress={this.props.nextScreen}
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
      </SafeAreaView>
    )
  }
  /* onNextPress () {
    this.props.nextScreen()
  }* /
  /* onExitPress = () =>  {
    this.props.exitScreen()
  } */
}
