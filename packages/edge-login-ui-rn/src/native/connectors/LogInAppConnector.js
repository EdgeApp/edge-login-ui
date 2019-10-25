// @flow

import { connect } from 'react-redux'

import * as loginAction from '../../common/actions/'
import * as Constants from '../../common/constants'
import type { Dispatch, State } from '../../types/ReduxTypes'
import type { OwnProps } from '../components/LogInAppComponent'
import { LoginAppComponent } from '../components/LogInAppComponent'

export const mapStateToProps = (state: State, ownProps: OwnProps) => {
  const previousUsers = state.previousUsers
  const lastUser = state.previousUsers ? state.previousUsers.lastUser : null
  return {
    styles: ownProps.styles,
    previousUsers,
    lastUser,
    lastUserPinEnabled: lastUser ? lastUser.pinEnabled : false,
    lastUserTouchEnabled: lastUser ? lastUser.touchEnabled : false,
    workflow: state.workflow
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getPreviousUsers: () => dispatch(loginAction.getPreviousUsers()),
    startRecoveryWorkflow: (backupKey: string) => {
      dispatch(
        loginAction.dispatchActionWitString(
          Constants.SET_RECOVERY_KEY,
          backupKey
        )
      )
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginAppComponent)
