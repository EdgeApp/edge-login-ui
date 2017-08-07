import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from '../../common'
// import * as Constants from '../../../common/constants'

export default class LandingScreenComponent extends Component {
  render () {
    return (
      <View>
        <Text>
          Creating Wallet.. hang on..
        </Text>
        <Button onPress={this.onNextPress.bind(this)}>Get started </Button>
      </View>
    )
  }
  onNextPress () {
    this.props.nextScreen()
  }
}
