import React, { Component } from 'react'
import { View } from 'react-native'
import { Button } from '../common'
import * as Constants from '../../../common/constants'

export default class LandingScreenComponent extends Component {
  render () {
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
