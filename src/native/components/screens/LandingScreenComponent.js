import React, { Component } from 'react'
import { View } from 'react-native'
import { BackgroundImage, Button } from '../common'
import * as Constants from '../../../common/constants'
import * as Assets from '../../assets/'
import LogoImage from '../common/LogoImage'

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
        <View style={LandingPageScreenStyle.featureBoxIconHeader}>
          <LogoImage style={LandingPageScreenStyle.logo} />
        </View>
        <View style={LandingPageScreenStyle.featureBoxDescription} />
        <View style={LandingPageScreenStyle.featureBoxButtons}>
          <Button
            onPress={this.onStartCreate.bind(this)}
            label={'Create account'}
            downStyle={LandingPageScreenStyle.createButton.downStyle}
            downTextStyle={LandingPageScreenStyle.createButton.downTextStyle}
            upStyle={LandingPageScreenStyle.createButton.upStyle}
            upTextStyle={LandingPageScreenStyle.createButton.upTextStyle}
          />
          <Button
            onPress={this.onStartLogin.bind(this)}
            label={'Already have an account? Sign in'}
            downStyle={LandingPageScreenStyle.loginButton.downStyle}
            downTextStyle={LandingPageScreenStyle.loginButton.downTextStyle}
            upStyle={LandingPageScreenStyle.loginButton.upStyle}
            upTextStyle={LandingPageScreenStyle.loginButton.upTextStyle}
          />
        </View>
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
