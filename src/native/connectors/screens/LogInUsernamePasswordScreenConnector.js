import { connect } from 'react-redux'
import LinkedComponent from '../../components/screens/LoginUsernamePasswordScreenComponent'
import * as action from '../../../common/actions'
import * as Constants from '../../../common/constants'

export const mapStateToProps = (state, ownProps) => {
  return {
    styles: ownProps.styles,
    auth: state.login,
    loginSuccess: state.login.loginSuccess,
    workflow: state.workflow
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    userLogin: (data) => dispatch(action.userLogin(data)),
    gotoCreatePage: () => dispatch(action.startWorkflow(Constants.WORKFLOW_CREATE)),
    onForgotPassword: () => dispatch(action.testAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
