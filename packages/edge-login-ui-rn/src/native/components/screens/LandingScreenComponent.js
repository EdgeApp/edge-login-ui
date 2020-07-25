// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

import * as Constants from '../../../common/constants'
import s from '../../../common/locales/strings.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import * as Assets from '../../assets/'
import { LogoImageHeader } from '../abSpecific/LogoImageHeader.js'
import { BackgroundImage, Button, HeaderParentButtons } from '../common'

type OwnProps = {
  styles: Object,
  appId?: string,
  backgroundImage?: any,
  primaryLogo?: any,
  primaryLogoCallback?: () => void,
  parentButton?: Object,
  landingScreenText?: string
}
type DispatchProps = {
  startFlow(string): void
}
type Props = OwnProps & DispatchProps

class LandingScreenComponent extends Component<Props> {
  render() {
    const { LandingScreenStyle } = this.props.styles
    return (
      <View style={LandingScreenStyle.container}>
        <BackgroundImage
          src={this.props.backgroundImage || Assets.LOGIN_BACKGROUND}
          style={LandingScreenStyle.backgroundImage}
          content={this.renderOverImage()}
        />
      </View>
    )
  }

  renderOverImage() {
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
            callback={this.props.primaryLogoCallback}
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
              testID="alreadyHaveAccountButton"
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

  onStartCreate() {
    global.firebase &&
      global.firebase.analytics().logEvent('Signup_Create_Account')
    this.props.startFlow(Constants.WORKFLOW_CREATE)
  }

  onStartLogin() {
    this.props.startFlow(Constants.WORKFLOW_PASSWORD)
  }
}

export const LandingScreen = connect(
  (state: RootState) => ({}),
  (dispatch: Dispatch): DispatchProps => ({
    startFlow(data: string) {
      dispatch({ type: 'WORKFLOW_START', data: data })
    }
  })
)(LandingScreenComponent)
