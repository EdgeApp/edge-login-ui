// @flow

import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import { initializePasswordRecovery } from '../../../common/actions/PasswordRecoveryActions.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import * as Styles from '../../styles/index.js'
import { RecoverPasswordScreen } from '../screens/existingAccout/RecoverPasswordScreenComponent.js'

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

export const PasswordRecoveryApp = connect(
  (state: RootState) => ({}),
  (dispatch: Dispatch) => ({
    initializePasswordRecovery() {
      dispatch(initializePasswordRecovery())
    }
  })
)(PasswordRecoveryAppComponent)
