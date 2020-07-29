// @flow

import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import { WORKFLOW_PASSWORD } from '../../common/constants'
import { type Dispatch, type RootState } from '../../types/ReduxTypes'
import { ChangeAccountPasswordScreen } from './screens/existingAccout/ChangeAccountPasswordScreenComponent'

type OwnProps = {
  styles: Object,
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

export const ChangePasswordApp = connect(
  (state: RootState) => ({}),
  (dispatch: Dispatch): DispatchProps => ({
    setWorkflow() {
      dispatch({ type: 'WORKFLOW_START', data: WORKFLOW_PASSWORD })
    }
  })
)(ChangePasswordAppComponent)
