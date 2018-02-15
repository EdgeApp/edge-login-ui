import React, { Component } from 'react'
import { View } from 'react-native'
import RecoverPasswordScreenConnector
  from '../connectors/screens/existingAccount/RecoverPasswordScreenConnector'
export default class ChangePasswordAppComponent extends Component {
  componentWillMount () {
    this.props.initializePasswordRecovery()
  }
  render () {
    const { ScreenStyle } = this.props.styles
    return (
      <View style={ScreenStyle} accessible>
        <RecoverPasswordScreenConnector
          styles={this.props.styles}
          showHeader={this.props.showHeader}
        />
      </View>
    )
  }
}
