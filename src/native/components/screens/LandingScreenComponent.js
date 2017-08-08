import React, { Component } from 'react'
import { View } from 'react-native'
import { Button } from '../common'
import * as Constants from '../../../common/constants'

export default class LandingScreenComponent extends Component {
  render () {
    console.log(this.props.styles)
    const {LandingPageScreenStyle} = this.props.styles
    return (
      <View style={LandingPageScreenStyle.container}>
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
