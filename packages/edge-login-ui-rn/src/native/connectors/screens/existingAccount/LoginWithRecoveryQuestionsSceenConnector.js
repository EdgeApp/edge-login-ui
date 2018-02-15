import { connect } from 'react-redux'
import LinkedComponent
  from '../../../components/screens/existingAccout/LoginWithRecoveryQuestionsScreenComponent'
import * as actions from '../../../../common/actions'
import * as Constants from '../../../../common/constants'
export const mapStateToProps = (state, ownProps) => {
  const isEnabled = true
  const question1 = state.passwordRecovery.userQuestions.length > 0
    ? state.passwordRecovery.userQuestions[0]
    : 'Choose recovery question'
  const question2 = state.passwordRecovery.userQuestions.length > 1
    ? state.passwordRecovery.userQuestions[1]
    : 'Choose recovery question'
  const loginError = state.login.errorMessage || ''
  const username = state.login.username || ''
  return {
    styles: ownProps.styles,
    showHeader: true,
    questionsList: state.passwordRecovery.questionsList,
    userQuestions: state.passwordRecovery.userQuestions,
    question1,
    question2,
    submitButton: 'Submit',
    disableButton: 'Disable',
    isEnabled,
    loginError,
    username,
    showRecoverSuccessDialog: state.login.showRecoverSuccessDialog
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submit: answers => dispatch(actions.loginWithRecovery(answers)),
    getQuestions: () => dispatch(actions.getRecoveryQuestions()),
    onCancel: () =>
      dispatch(actions.dispatchAction(Constants.CANCEL_RECOVERY_KEY)),
    updateUsername: username =>
      dispatch(
        actions.dispatchActionWithData(Constants.AUTH_UPDATE_USERNAME, username)
      ),
    changePassword: () => dispatch(actions.dispatchAction(Constants.WORKFLOW_NEXT))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
