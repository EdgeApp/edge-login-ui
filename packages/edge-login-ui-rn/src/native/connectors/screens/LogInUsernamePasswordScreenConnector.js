// @flow

import { connect } from 'react-redux'

import * as action from '../../../common/actions'
import * as Constants from '../../../common/constants'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes'
import LinkedComponent from '../../components/screens/LoginUsernamePasswordScreenComponent'

export const mapStateToProps = (state: RootState) => {
  let pv = false
  if (state.previousUsers.userList.length > 0) {
    pv = true
  }
  const usernameList = state.previousUsers.usernameOnlyList
  const usernameOnlyList = state.previousUsers.usernameOnlyList
  return {
    auth: state.login,
    loginSuccess: state.login.loginSuccess,
    workflow: state.workflow,
    username: state.login.username,
    password: state.login.password,
    error: state.login.errorMessage,
    previousUsers: state.previousUsers.userList,
    usernameList,
    usernameOnlyList,
    hasUsers: pv,
    showModal: state.workflow.showModal
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    launchUserLoginWithTouchId: (data: Object) =>
      dispatch(action.userLoginWithTouchId(data)),
    userLogin: (data: Object) => dispatch(action.userLogin(data)),
    gotoCreatePage: () =>
      dispatch({ type: 'WORKFLOW_START', data: Constants.WORKFLOW_CREATE }),
    gotoPinLoginPage: () =>
      dispatch({ type: 'WORKFLOW_START', data: Constants.WORKFLOW_PIN }),
    updateUsername: (data: string) =>
      dispatch({ type: 'AUTH_UPDATE_USERNAME', data: data }),
    updatePassword: (data: string) =>
      dispatch({ type: 'AUTH_UPDATE_LOGIN_PASSWORD', data: data }),
    deleteUserFromDevice: (data: string) =>
      dispatch({ type: 'DELETE_USER_FROM_DEVICE', data: data }),
    launchDeleteModal: () => dispatch({ type: 'WORKFLOW_LAUNCH_MODAL' }),
    recoverPasswordLogin: () => dispatch(action.recoverPasswordLogin()),
    dismissRecoveryError: () => dispatch({ type: 'DISMISS_REOVERY_ERROR' })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkedComponent)
