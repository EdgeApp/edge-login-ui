import React, { Component } from 'react'
import { View } from 'react-native'
import ChangeAccountPasswordScreenConnector
  from '../connectors/screens/existingAccount/ChangeAccountPasswordScreenConnector'
export default class ChangePasswordAppComponent extends Component {
  componentWillMount () {
    this.props.setWorkflow()
  }
  render () {
    const { ScreenStyle } = this.props.styles
    return (
      <View accessible={true} style={ScreenStyle}>
        <ChangeAccountPasswordScreenConnector
          styles={this.props.styles}
          showHeader={this.props.showHeader}
        />
      </View>
    )
  }
}
