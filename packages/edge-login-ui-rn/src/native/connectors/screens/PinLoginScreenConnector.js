// @flow

import { connect } from 'react-redux'

import * as actions from '../../../common/actions'
import * as Constants from '../../../common/constants'
import type { Dispatch, State } from '../../../types/ReduxTypes'
import LinkedComponent from '../../components/screens/PinLogInScreenComponent'

export const mapStateToProps = (state: State) => {
  const pinLength = state.login.pin ? state.login.pin.length : 0
  const loginSuccess = state.login.loginSuccess
  const wait = state.login.wait
  const isTouchIdDisabled =
    loginSuccess || wait || state.login.isLoggingInWithPin || pinLength === 4
  return {
    username: state.login.username,
    loginSuccess,
    previousUsers: state.previousUsers.userList,
    usersWithPin: state.previousUsers.usersWithPinList,
    workflow: state.workflow,
    showModal: state.workflow.showModal,
    wait,
    isTouchIdDisabled
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeUser: (data: string) =>
      dispatch(
        actions.dispatchActionWitString(Constants.AUTH_UPDATE_USERNAME, data)
      ),
    userLogin: (data: Object) => dispatch(actions.userLoginWithPin(data)),
    launchUserLoginWithTouchId: (data: Object) =>
      dispatch(actions.userLoginWithTouchId(data)),
    deleteUserFromDevice: (data: string) =>
      dispatch(actions.deleteUserFromDevice(data)),
    launchDeleteModal: () =>
      dispatch(actions.dispatchAction(Constants.WORKFLOW_LAUNCH_MODAL)),
    gotoLoginPage: () =>
      dispatch(actions.startWorkflow(Constants.WORKFLOW_PASSWORD))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
