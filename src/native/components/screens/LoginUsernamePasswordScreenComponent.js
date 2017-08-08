import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from '../../components/common'
// import * as Constants from '../../../common/constants'

export default class LandingScreenComponent extends Component {
  render () {
    const { LoginPasswordScreenStyle } = this.props.styles
    return (
      <View style={LoginPasswordScreenStyle.container}>
        <View style={LoginPasswordScreenStyle.featureBox}>
          <Text>
            This is the login page..
          </Text>
          <Button onPress={this.onNextPress.bind(this)}>Next </Button>
        </View>
      </View>
    )
  }
  onNextPress () {
    this.props.userLogin({ username: 'Bob20', password: 'Bob20' })
  }
}
