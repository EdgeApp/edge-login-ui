import React, { Component } from 'react'
import { View } from 'react-native'
import { Button } from '../../common'
import UsernameConnector
  from '../../../connectors/componentConnectors/UsernameConnector'
// import * as Constants from '../../../common/constants'

export default class LandingScreenComponent extends Component {
  componentWillMount () {
    this.setState({
      isProcessing: false
    })
  }
  render () {
    const { NewAccountUsernameScreenStyle } = this.props.styles
    return (
      <View style={NewAccountUsernameScreenStyle.screen}>
        <View style={NewAccountUsernameScreenStyle.header} />
        <View style={NewAccountUsernameScreenStyle.pageContainer}>
          <View style={NewAccountUsernameScreenStyle.instructions} />
          <UsernameConnector style={NewAccountUsernameScreenStyle.inputBox} />
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
    )
  }
  onNextPress () {
    this.setState({
      isProcessing: true
    })
    this.props.checkUsernameForAvailabilty(this.props.username)
  }
}
