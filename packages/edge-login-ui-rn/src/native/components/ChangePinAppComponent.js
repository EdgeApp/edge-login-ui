// @flow

import React, { Component } from 'react'
import { View } from 'react-native'

import { ChangeAccountPinScreen } from '../components/screens/existingAccout/ChangeAccountPinScreenComponent'

export type OwnProps = {
  styles: Object
}
export type DispatchProps = {
  setWorkflow(): void
}
type Props = OwnProps & DispatchProps

export default class ChangePinAppComponent extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.props.setWorkflow()
  }

  render() {
    const { ScreenStyle } = this.props.styles
    return (
      <View accessible style={ScreenStyle}>
        <ChangeAccountPinScreen styles={this.props.styles} />
      </View>
    )
  }
}
