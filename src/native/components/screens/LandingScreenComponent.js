import React, { Component } from 'react'
import { View } from 'react-native'
import { BackgroundImage, Button } from '../common'
import * as Constants from '../../../common/constants'
import * as Assets from '../../assets/'
import { LogoImageHeader } from '../abSpecific'

export default class LandingScreenComponent extends Component {
  render () {
    const { LandingPageScreenStyle } = this.props.styles
    return (
      <View style={LandingPageScreenStyle.container}>
        <BackgroundImage
          src={Assets.LOGIN_BACKGROUND}
          style={LandingPageScreenStyle.backgroundImage}
          content={this.renderOverImage()}
        />
      </View>
    )
  }
  renderOverImage () {
    const { LandingPageScreenStyle } = this.props.styles
    console.log(LandingPageScreenStyle)
    return (
      <View style={LandingPageScreenStyle.featureBox}>
        <LogoImageHeader style={LandingPageScreenStyle.logoHeader} />
        <View style={LandingPageScreenStyle.featureBoxContent}>
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
