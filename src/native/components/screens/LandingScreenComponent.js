import React, { Component } from 'react'
import { View } from 'react-native'
import { BackgroundImage, Button } from '../common'
import * as Constants from '../../../common/constants'
import * as Assets from '../../assets/'

export default class LandingScreenComponent extends Component {
  render () {
    console.log(this.props.styles)
    const { LandingPageScreenStyle } = this.props.styles
    console.log(Assets.LOGIN_BACKGROUND)
    return (
      <View style={LandingPageScreenStyle.container}>
        <BackgroundImage
          src={Assets.LOGIN_BACKGROUND}
          style={LandingPageScreenStyle.backgroundImage}
        >
          {this.renderOverImage()}
        </BackgroundImage>
      </View>
    )
  }
  renderOverImage () {
    const { LandingPageScreenStyle } = this.props.styles
    return (
      <View style={LandingPageScreenStyle.featureBox}>
        <Button
          onPress={this.onStartCreate.bind(this)}
          label={'Create an Account'}
          downStyle={LandingPageScreenStyle.createButton.downStyle}
          downTextStyle={LandingPageScreenStyle.createButton.downTextStyle}
          upStyle={LandingPageScreenStyle.createButton.upStyle}
          upTextStyle={LandingPageScreenStyle.createButton.upTextStyle}
        />
        <Button
          onPress={this.onStartLogin.bind(this)}
          label={'GO TO LOGIN SCREEN '}
          downStyle={LandingPageScreenStyle.loginButton.downStyle}
          downTextStyle={LandingPageScreenStyle.loginButton.downTextStyle}
          upStyle={LandingPageScreenStyle.loginButton.upStyle}
          upTextStyle={LandingPageScreenStyle.loginButton.upTextStyle}
        />
      </View>
    )
  }
  onStartCreate () {
    this.props.startFlow(Constants.WORKFLOW_CREATE)
  }

  onStartLogin () {
    this.props.startFlow(Constants.WORKFLOW_PASSWORD)
  }
}
