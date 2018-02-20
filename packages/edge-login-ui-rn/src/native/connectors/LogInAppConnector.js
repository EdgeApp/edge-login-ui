import { connect } from 'react-redux'
import LoginAppComponent from '../components/LogInAppComponent'
import * as loginAction from '../../common/actions/'
import * as Constants from '../../common/constants'
export const mapStateToProps = (state, ownProps) => {
  return {
    context: ownProps.context,
    onLogin: ownProps.onLogin,
    previousUsers: state.previousUsers,
    workflow: state.workflow
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    userLogin: data => dispatch(loginAction.userLogin(data)),
    getPreviousUsers: () => dispatch(loginAction.getPreviousUsers()),
    startRecoveryWorkflow: backupKey => {
      dispatch(
        loginAction.dispatchActionWithData(
          Constants.SET_RECOVERY_KEY,
          backupKey
        )
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginAppComponent)
