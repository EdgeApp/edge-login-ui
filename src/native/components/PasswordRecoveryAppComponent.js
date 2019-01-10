// @flow

import React, { Component } from 'react'
import { View } from 'react-native'

import RecoverPasswordScreenConnector from '../connectors/screens/existingAccount/RecoverPasswordScreenConnector'

export type OwnProps = {
  styles: Object,
  showHeader: boolean
}
type DispatchProps = {
  initializePasswordRecovery(): void
}
type Props = OwnProps & DispatchProps

export default class PasswordRecoveryAppComponent extends Component<Props> {
  constructor (props: Props) {
    super(props)
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
