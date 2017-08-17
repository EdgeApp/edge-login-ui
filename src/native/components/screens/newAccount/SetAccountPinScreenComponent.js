import React, { Component } from 'react'
import { View } from 'react-native'
import { Button } from '../../common'
import HeaderConnector
  from '../../../connectors/componentConnectors/HeaderConnector'
// import * as Constants from '../../../common/constants'

export default class LandingScreenComponent extends Component {
  componentWillMount () {
    this.setState({
      isProcessing: false
    })
  }
  render () {
    const { SetAccountPinScreenStyle } = this.props.styles
    return (
      <View style={SetAccountPinScreenStyle.screen}>
        <HeaderConnector style={SetAccountPinScreenStyle.header} />
        <View style={SetAccountPinScreenStyle.pageContainer}>
          <Button
            onPress={this.onNextPress.bind(this)}
            downStyle={SetAccountPinScreenStyle.nextButton.downStyle}
            downTextStyle={SetAccountPinScreenStyle.nextButton.downTextStyle}
            upStyle={SetAccountPinScreenStyle.nextButton.upStyle}
            upTextStyle={SetAccountPinScreenStyle.nextButton.upTextStyle}
            label={'NEXT'}
            isThinking={this.state.isProcessing}
            doesThink
          />
        </View>
      </View>
    )
  }
  onNextPress () {
    this.setState({
      isProcessing: true
    })
    console.log(this.props)
    // validation.
    // is there no error message ,
    if (this.props.pin.length !== 4) {
      console.log('PIN ERROR')
      return
    }
    this.props.createUser({
      username: this.props.username,
      password: this.props.password,
      pin: this.props.pin
    })
  }
}
