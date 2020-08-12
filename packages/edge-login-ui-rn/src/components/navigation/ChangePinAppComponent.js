// @flow

import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import * as Styles from '../../styles/index.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { ChangeAccountPinScreen } from '../screens/existingAccout/ChangeAccountPinScreenComponent.js'

type OwnProps = {
  showHeader: boolean
}
type DispatchProps = {
  setWorkflow(): void
}
type Props = OwnProps & DispatchProps

class ChangePinAppComponent extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.props.setWorkflow()
  }

  render() {
    const { ScreenStyle } = Styles
    return (
      <View accessible style={ScreenStyle}>
        <ChangeAccountPinScreen showHeader={this.props.showHeader} />
      </View>
    )
  }
}

export const ChangePinApp = connect(
  (state: RootState) => ({}),
  (dispatch: Dispatch): DispatchProps => ({
    setWorkflow() {
      dispatch({ type: 'WORKFLOW_START', data: 'pinWF' })
    }
  })
)(ChangePinAppComponent)
