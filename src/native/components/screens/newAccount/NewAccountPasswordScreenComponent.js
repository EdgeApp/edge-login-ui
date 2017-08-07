import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from '../../common'
// import * as Constants from '../../../common/constants'

export default class LandingScreenComponent extends Component {
  render () {
    return (
      <View>
        <Text>
          Holding Password Screen
        </Text>
        <Button onPress={this.onNextPress.bind(this)}>Next </Button>
        <Button onPress={this.onSkipPress.bind(this)}>Skip </Button>
      </View>
    )
  }
  onNextPress () {
    this.props.validatePassword({username: this.props.auth.username, password: this.props.auth.password})
  }
  onSkipPress () {
    this.props.skipPassword()
  }
}
