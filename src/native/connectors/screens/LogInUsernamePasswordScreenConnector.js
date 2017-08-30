import { connect } from 'react-redux'
import LinkedComponent
  from '../../components/screens/LoginUsernamePasswordScreenComponent'
import * as action from '../../../common/actions'
import * as Constants from '../../../common/constants'

export const mapStateToProps = (state, ownProps) => {
  let pv = false
  if (state.previousUsers.userList.length > 0) {
    pv = true
  }
  return {
    styles: ownProps.styles,
    auth: state.login,
    loginSuccess: state.login.loginSuccess,
    workflow: state.workflow,
    username: state.login.username,
    error: state.login.errorMessage,
    previousUsers: state.previousUsers.userList,
    usernameList: state.previousUsers.usernameOnlyList,
    filteredUsernameList: state.previousUsers.filteredUsernameList,
    hasUsers: pv
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    userLogin: data => dispatch(action.userLogin(data)),
    gotoCreatePage: () =>
      dispatch(action.startWorkflow(Constants.WORKFLOW_CREATE)),
    onForgotPassword: () => dispatch(action.testAction()),
    clearLogin: () => dispatch(action.dispatchActionWithData(Constants.AUTH_UPDATE_USERNAME, '')),
    updateUsername: (data) => dispatch(action.dispatchActionWithData(Constants.AUTH_UPDATE_USERNAME, data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
