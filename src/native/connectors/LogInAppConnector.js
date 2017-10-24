import { connect } from 'react-redux'
import LoginAppComponent from '../components/LogInAppComponent'
import * as loginAction from '../../common/actions/'

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
    launchUserLoginWithTouchId: (data) => dispatch(loginAction.userLoginWithTouchId(data)),
    userLogin: (data) => dispatch(loginAction.userLogin(data)),
    getPreviousUsers: () => dispatch(loginAction.getPreviousUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginAppComponent)
