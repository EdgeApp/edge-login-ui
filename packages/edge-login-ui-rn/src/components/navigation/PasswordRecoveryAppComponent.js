// @flow

import React, { Component } from 'react'
import { View } from 'react-native'

import { initializePasswordRecovery } from '../../actions/PasswordRecoveryActions.js'
import * as Styles from '../../styles/index.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { RecoverPasswordScreen } from '../screens/existingAccout/RecoverPasswordScreenComponent.js'
import { connect } from '../services/ReduxStore.js'

type OwnProps = {
  showHeader: boolean
}
type DispatchProps = {
  initializePasswordRecovery(): void
}
type Props = OwnProps & DispatchProps

class PasswordRecoveryAppComponent extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.props.initializePasswordRecovery()
  }

  render() {
    const { ScreenStyle } = Styles
    return (
      <View style={ScreenStyle} accessible>
        <RecoverPasswordScreen showHeader={this.props.showHeader} />
      </View>
    )
  }
}

export const PasswordRecoveryApp = connect<{}, DispatchProps, OwnProps>(
  (state: RootState) => ({}),
  (dispatch: Dispatch) => ({
    initializePasswordRecovery() {
      dispatch(initializePasswordRecovery())
    }
  })
)(PasswordRecoveryAppComponent)
