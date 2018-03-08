// @flow

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from '../../common'
import HeaderConnector from '../../../connectors/componentConnectors/HeaderConnector'
import CreateFourDigitPinConnector from '../../../connectors/abSpecific/CreateFourDigitPinConnector.js'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'
// import * as Constants from '../../../common/constants'

type Props = {
  styles: Object,
  password: string,
  username: string,
  pin: string,
  createUser(Object): void
}

type State = {
  username: string,
  pin: string,
  isProcessing: boolean,
  focusOn: string
}
export default class SetAccountPinScreenComponent extends Component<
  Props,
  State
> {
  componentWillMount () {
    this.setState({
      username: '',
      pin: '',
      isProcessing: false,
      focusOn: 'pin'
    })
  }
  render () {
    const { SetAccountPinScreenStyle } = this.props.styles
    return (
      <SafeAreaView>
        <View style={SetAccountPinScreenStyle.screen}>
          <HeaderConnector style={SetAccountPinScreenStyle.header} />
          <View style={SetAccountPinScreenStyle.pageContainer}>
            <View style={SetAccountPinScreenStyle.row1}>
              <Text style={SetAccountPinScreenStyle.instructions}>
                Your PIN is a 4 digit code used to do quick re-logins into your
                account
              </Text>
            </View>
            <View style={SetAccountPinScreenStyle.row2}>
              <CreateFourDigitPinConnector
                style={SetAccountPinScreenStyle.fourPin}
              />
            </View>
            <View style={SetAccountPinScreenStyle.row3}>
              <Button
                onPress={this.onNextPress}
                downStyle={SetAccountPinScreenStyle.nextButton.downStyle}
                downTextStyle={
                  SetAccountPinScreenStyle.nextButton.downTextStyle
                }
                upStyle={SetAccountPinScreenStyle.nextButton.upStyle}
                upTextStyle={SetAccountPinScreenStyle.nextButton.upTextStyle}
                label={'NEXT'}
                isThinking={this.state.isProcessing}
                doesThink
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }
  onNextPress = () => {
    this.setState({
      isProcessing: true
    })
    // validation.
    // is there no error message ,
    if (this.props.pin.length !== 4 || this.props.pinError) {
      this.setState({
        isProcessing: false
      })
      return
    }
    this.props.createUser({
      username: this.props.username,
      password: this.props.password,
      pin: this.props.pin
    })
  }
}
