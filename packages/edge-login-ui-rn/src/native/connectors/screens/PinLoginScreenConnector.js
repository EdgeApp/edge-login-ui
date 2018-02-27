// @flow
import { connect } from 'react-redux'
import LinkedComponent from '../../components/screens/PinLogInScreenComponent'
import * as actions from '../../../common/actions'
import * as Constants from '../../../common/constants'
import type { State, Dispatch } from '../../../types/ReduxTypes'

export const mapStateToProps = (state: State) => {
  return {
    username: state.login.username,
    loginSuccess: state.login.loginSuccess,
    previousUsers: state.previousUsers.userList,
    usersWithPin: state.previousUsers.usersWithPinList,
    workflow: state.workflow,
    showModal: state.workflow.showModal
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
