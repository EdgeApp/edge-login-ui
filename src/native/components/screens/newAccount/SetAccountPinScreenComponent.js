import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from '../../common'
// import * as Constants from '../../../common/constants'

export default class LandingScreenComponent extends Component {
  render () {
    return (
      <View>
        <Text>
          Set Pin
        </Text>
        <Button onPress={this.onNextPress.bind(this)}>Next </Button>
      </View>
    )
  }
  onNextPress () {
    this.props.createUser({username: this.props.auth.username, password: this.props.auth.password, pin: this.props.auth.pin})
  }
}
