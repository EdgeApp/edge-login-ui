// @flow

import React, { Component } from 'react'
import { View } from 'react-native'

import * as Styles from '../../styles/index.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { PublicChangePinScreen } from '../screens/existingAccout/ChangePinScreen.js'
import { connect } from '../services/ReduxStore.js'

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
        <PublicChangePinScreen showHeader={this.props.showHeader} />
      </View>
    )
  }
}

export const ChangePinApp = connect<{}, DispatchProps, OwnProps>(
  (state: RootState) => ({}),
  (dispatch: Dispatch) => ({
    setWorkflow() {
      dispatch({ type: 'WORKFLOW_START', data: 'pinWF' })
    }
  })
)(ChangePinAppComponent)
