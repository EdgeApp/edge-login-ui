// @flow

import React, { Component } from 'react'
import { View } from 'react-native'

import { ChangeAccountPasswordScreen } from './screens/existingAccout/ChangeAccountPasswordScreenComponent'

export type OwnProps = {
  styles: Object,
  showHeader: boolean
}
export type StateProps = {
  workflow: Object
}
export type DispatchProps = {
  setWorkflow(): void
}
type Props = OwnProps & DispatchProps & StateProps

export default class ChangePasswordAppComponent extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.props.setWorkflow()
  }

  render() {
    const { ScreenStyle } = this.props.styles
    return (
      <View style={ScreenStyle} accessible>
        <ChangeAccountPasswordScreen
          styles={this.props.styles}
          showHeader={this.props.showHeader}
        />
      </View>
    )
  }
}
