import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from '../../common'
import HeaderConnector
  from '../../../connectors/componentConnectors/HeaderConnectorChangeApps.js'
import CreateFourDigitPinConnector
  from '../../../connectors/abSpecific/CreateFourDigitPinConnector.js'
// import * as Constants from '../../../common/constants'

export default class ChangeAccountPinScreenComponent extends Component {
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
      <View style={SetAccountPinScreenStyle.screen}>
        <HeaderConnector style={SetAccountPinScreenStyle.header} />
        <View style={SetAccountPinScreenStyle.pageContainer}>
          <View style={SetAccountPinScreenStyle.row1}>
            <Text style={SetAccountPinScreenStyle.instructions}>
              Your PIN is a 4 digit code used to do quick re-logins into your account
            </Text>
          </View>
          <View style={SetAccountPinScreenStyle.row2}>
            <CreateFourDigitPinConnector
              style={SetAccountPinScreenStyle.fourPin}
            />
          </View>
          <View style={SetAccountPinScreenStyle.row3}>
            <Button
              onPress={this.onNextPress.bind(this)}
              downStyle={SetAccountPinScreenStyle.nextButton.downStyle}
              downTextStyle={SetAccountPinScreenStyle.nextButton.downTextStyle}
              upStyle={SetAccountPinScreenStyle.nextButton.upStyle}
              upTextStyle={SetAccountPinScreenStyle.nextButton.upTextStyle}
              label={'DONE'}
              isThinking={this.state.isProcessing}
              doesThink
            />
          </View>

        </View>
      </View>
    )
  }
  onNextPress () {
    this.setState({
      isProcessing: true
    })
    // validation.
    // is there no error message ,
    if (this.props.pin.length !== 4) {
      console.log('PIN ERROR')
      return
    }
    this.props.changePin(this.props.pin)
  }
}
