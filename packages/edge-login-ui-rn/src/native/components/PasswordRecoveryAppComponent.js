// @flow
import React, { Component } from 'react'
import { View } from 'react-native'
import RecoverPasswordScreenConnector from '../connectors/screens/existingAccount/RecoverPasswordScreenConnector'

type Props = {
  styles: Object,
  showHeader: boolean,
  initializePasswordRecovery(): void
}
export default class ChangePasswordAppComponent extends Component<Props> {
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
