// @flow

import React, { Component } from 'react'
import { View } from 'react-native'

import * as Styles from '../../styles/index.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { PublicChangePasswordScreen } from '../screens/existingAccout/ChangePasswordScreen.js'
import { connect } from '../services/ReduxStore.js'

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
        <PublicChangePasswordScreen showHeader={this.props.showHeader} />
      </View>
    )
  }
}

export const ChangePasswordApp = connect<{}, DispatchProps, OwnProps>(
  (state: RootState) => ({}),
  (dispatch: Dispatch) => ({
    setWorkflow() {
      dispatch({ type: 'WORKFLOW_START', data: 'changePasswordWF' })
    }
  })
)(ChangePasswordAppComponent)
