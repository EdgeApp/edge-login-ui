// @flow

import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import * as Styles from '../../styles/index.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { ChangeAccountPasswordScreen } from '../screens/existingAccout/ChangeAccountPasswordScreenComponent.js'

type OwnProps = {
  showHeader: boolean
}
type DispatchProps = {
  setWorkflow(): void
}
type Props = OwnProps & DispatchProps

class ChangePasswordAppComponent extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.props.setWorkflow()
  }

  render() {
    const { ScreenStyle } = Styles
    return (
      <View style={ScreenStyle} accessible>
        <ChangeAccountPasswordScreen showHeader={this.props.showHeader} />
      </View>
    )
  }
}

export const ChangePasswordApp = connect(
  (state: RootState) => ({}),
  (dispatch: Dispatch): DispatchProps => ({
    setWorkflow() {
      dispatch({ type: 'WORKFLOW_START', data: 'passwordWF' })
    }
  })
)(ChangePasswordAppComponent)
