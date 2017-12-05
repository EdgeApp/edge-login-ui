import React, { Component } from 'react'
import { View } from 'react-native'
import ChangeAccountPinScreenConnector from '../connectors/screens/existingAccount/ChangeAccountPinScreenConnector'

export default class ChangePinAppComponent extends Component {
  componentWillMount () {
    this.props.setWorkflow()
  }
  render () {
    const { ScreenStyle } = this.props.styles
    return (
      <View accessible={true} style={ScreenStyle}>
        <ChangeAccountPinScreenConnector styles={this.props.styles} />
      </View>
    )
  }
}
