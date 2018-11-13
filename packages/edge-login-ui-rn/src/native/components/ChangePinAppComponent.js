// @flow

import React, { Component } from 'react'
import { View } from 'react-native'

import ChangeAccountPinScreenConnector from '../connectors/screens/existingAccount/ChangeAccountPinScreenConnector'

export type OwnProps = {
  styles: Object
}
export type DispatchProps = {
  setWorkflow(): void
}
type Props = OwnProps & DispatchProps

export default class ChangePinAppComponent extends Component<Props> {
  constructor (props: Props) {
    super(props)
    this.props.setWorkflow()
  }
  render () {
    const { ScreenStyle } = this.props.styles
    return (
      <View accessible style={ScreenStyle}>
        <ChangeAccountPinScreenConnector styles={this.props.styles} />
      </View>
    )
  }
}
