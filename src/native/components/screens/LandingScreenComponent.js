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
        <BackgroundImage src={Assets.LOGIN_BACKGROUND} style={LandingPageScreenStyle.backgroundImage} >
          {this.renderOverImage()}
        </BackgroundImage>
      </View>
    )
  }
  renderOverImage () {
    return (
      <View>
        <Button onPress={this.onStartCreate.bind(this)}>
          Create an Account
        </Button>
        <Button onPress={this.onStartLogin.bind(this)}>
          Go to log in screen
        </Button>
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
