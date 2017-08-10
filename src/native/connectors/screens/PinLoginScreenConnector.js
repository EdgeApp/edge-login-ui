import { connect } from 'react-redux'
import LinkedComponent from '../../components/screens/PinLogInScreenComponent'
import * as actions from '../../../common/actions'
import * as Constants from '../../../common/constants'

export const mapStateToProps = (state, ownProps) => {
  return {
    styles: ownProps.styles,
    auth: state.login,
    loginSuccess: state.login.loginSuccess,
    previousUsers: state.previousUsers,
    workflow: state.workflow
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    userLogin: (data) => dispatch(actions.userLoginWithPin(data)),
    gotoLoginPage: () => dispatch(actions.startWorkflow(Constants.WORKFLOW_PASSWORD))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
