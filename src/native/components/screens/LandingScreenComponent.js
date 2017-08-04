import React, { Component } from 'react'
import { View } from 'react-native'
import { Button } from '../common'
import * as Constants from '../../../common/constants'

export default class LandingScreenComponent extends Component {
  render () {
    return (
      <View>
        <Button onPress={this.onButtonPress.bind(this)}>
        Create an Account
      </Button>
      </View>
    )
  }
  onButtonPress () {
    this.props.startFlow(Constants.WORKFLOW_CREATE)
  }
}
