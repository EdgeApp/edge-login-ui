// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'

import * as Constants from '../../../common/constants'
import s from '../../../common/locales/strings.js'
import { LogoImageHeader } from '../abSpecific'
import { BackgroundImage, Button, HeaderParentButtons } from '../common'

type Props = {
  styles: Object,
  startFlow(string): void,
  appId?: string,
  backgroundImage: any,
  primaryLogo: any,
  parentButton?: Object,
  landingScreenText?: string
}

type State = {}
export default class LandingScreenComponent extends Component<Props, State> {
  render () {
    const { LandingScreenStyle } = this.props.styles
    return (
      <View style={LandingScreenStyle.container}>
        <BackgroundImage
          src={this.props.backgroundImage}
          style={LandingScreenStyle.backgroundImage}
          content={this.renderOverImage()}
        />
      </View>
    )
  }
  renderOverImage () {
    const { LandingScreenStyle } = this.props.styles
    return (
      <View style={LandingScreenStyle.inner}>
        <HeaderParentButtons
          parentButton={this.props.parentButton}
          styles={this.props.styles.HeaderParentButtons}
          appId={this.props.appId}
        />
        <View style={LandingScreenStyle.featureBox}>
          <LogoImageHeader
            style={LandingScreenStyle.logoHeader}
            src={this.props.primaryLogo}
          />
          <View style={LandingScreenStyle.featureBoxContent}>
            <View style={LandingScreenStyle.featureBoxDescription}>
              <Text style={LandingScreenStyle.tagText}>
                {this.props.landingScreenText || s.strings.landing_tagline}
              </Text>
            </View>
          </View>
          <View style={LandingScreenStyle.featureBoxButtons}>
            <Button
              onPress={this.onStartCreate.bind(this)}
              label={s.strings.landing_create_account_button}
              downStyle={LandingScreenStyle.createButton.downStyle}
              downTextStyle={LandingScreenStyle.createButton.downTextStyle}
              upStyle={LandingScreenStyle.createButton.upStyle}
              upTextStyle={LandingScreenStyle.createButton.upTextStyle}
            />
            <View style={LandingScreenStyle.shim} />
            <Button
              testID={'alreadyHaveAccountButton'}
              onPress={this.onStartLogin.bind(this)}
              label={s.strings.landing_already_have_account}
              downStyle={LandingScreenStyle.loginButton.downStyle}
              downTextStyle={LandingScreenStyle.loginButton.downTextStyle}
              upStyle={LandingScreenStyle.loginButton.upStyle}
              upTextStyle={LandingScreenStyle.loginButton.upTextStyle}
            />
          </View>
        </View>
      </View>
    )
  }
  onStartCreate () {
    global.firebase &&
      global.firebase.analytics().logEvent('Signup_Create_Account')
    this.props.startFlow(Constants.WORKFLOW_CREATE)
  }

  onStartLogin () {
    this.props.startFlow(Constants.WORKFLOW_PASSWORD)
  }
}
