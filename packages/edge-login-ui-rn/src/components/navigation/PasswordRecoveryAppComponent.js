// @flow

import React, { Component } from 'react'
import { View } from 'react-native'

import { initializeChangeRecovery } from '../../actions/PasswordRecoveryActions.js'
import * as Styles from '../../styles/index.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { PublicChangeRecoveryScreen } from '../screens/existingAccout/ChangeRecoveryScreen.js'
import { connect } from '../services/ReduxStore.js'

type OwnProps = {
  showHeader: boolean
}
type DispatchProps = {
  initializeChangeRecovery(): void
}
type Props = OwnProps & DispatchProps

class PasswordRecoveryAppComponent extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.props.initializeChangeRecovery()
  }

  render() {
    const { ScreenStyle } = Styles
    return (
      <View style={ScreenStyle} accessible>
        <PublicChangeRecoveryScreen showHeader={this.props.showHeader} />
      </View>
    )
  }
}

export const PasswordRecoveryApp = connect<{}, DispatchProps, OwnProps>(
  (state: RootState) => ({}),
  (dispatch: Dispatch) => ({
    initializeChangeRecovery() {
      dispatch(initializeChangeRecovery())
    }
  })
)(PasswordRecoveryAppComponent)
