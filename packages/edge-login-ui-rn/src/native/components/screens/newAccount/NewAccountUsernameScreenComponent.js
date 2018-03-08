// @flow

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from '../../common'
import UsernameConnector from '../../../connectors/componentConnectors/UsernameConnector'
import HeaderConnector from '../../../connectors/componentConnectors/HeaderConnector'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'

type Props = {
  styles: Object,
  username: string,
  checkUsernameForAvailabilty(string): void
}
type State = {
  isProcessing: boolean
}
export default class LandingScreenComponent extends Component<Props, State> {
  componentWillMount () {
    this.setState({
      isProcessing: false
    })
  }
  componentDidUpdate (prevProps: Props) {
    if (this.props !== prevProps) {
      this.setState({
        isProcessing: false
      })
    }
  }

  render () {
    const { NewAccountUsernameScreenStyle } = this.props.styles
    return (
      <SafeAreaView>
        <View style={NewAccountUsernameScreenStyle.screen}>
          <HeaderConnector style={NewAccountUsernameScreenStyle.header} />
          <View style={NewAccountUsernameScreenStyle.pageContainer}>
            <View style={NewAccountUsernameScreenStyle.instructions}>
              <Text style={NewAccountUsernameScreenStyle.instructionsText}>
                Your username will be required to sign in to your Edge account
                on this and other devices.
              </Text>
            </View>
            <UsernameConnector
              style={NewAccountUsernameScreenStyle.inputBox}
              onFinish={this.onNextPress}
            />
            <View style={NewAccountUsernameScreenStyle.shim} />
            <Button
              onPress={this.onNextPress.bind(this)}
              downStyle={NewAccountUsernameScreenStyle.nextButton.downStyle}
              downTextStyle={
                NewAccountUsernameScreenStyle.nextButton.downTextStyle
              }
              upStyle={NewAccountUsernameScreenStyle.nextButton.upStyle}
              upTextStyle={NewAccountUsernameScreenStyle.nextButton.upTextStyle}
              label={'NEXT'}
              isThinking={this.state.isProcessing}
              doesThink
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
  onNextPress = () => {
    if (this.props.usernameErrorMessage) {
      return
    }
    this.setState({
      isProcessing: true
    })
    this.props.checkUsernameForAvailabilty(this.props.username)
  }
}
