// @flow

import { connect } from 'react-redux'

import { loginWithRecovery } from '../../../../common/actions/LoginAction.js'
import { getRecoveryQuestions } from '../../../../common/actions/PasswordRecoveryActions.js'
import s from '../../../../common/locales/strings.js'
import { type Dispatch, type RootState } from '../../../../types/ReduxTypes.js'
import LinkedComponent from '../../../components/screens/existingAccout/LoginWithRecoveryQuestionsScreenComponent'

export const mapStateToProps = (state: RootState) => {
  const isEnabled = true
  const question1 =
    state.passwordRecovery.userQuestions.length > 0
      ? state.passwordRecovery.userQuestions[0]
      : s.strings.choose_recovery_question
  const question2 =
    state.passwordRecovery.userQuestions.length > 1
      ? state.passwordRecovery.userQuestions[1]
      : s.strings.choose_recovery_question
  const loginError = state.login.errorMessage || ''
  const username = state.login.username || ''
  return {
    showHeader: true,
    questionsList: state.passwordRecovery.questionsList,
    userQuestions: state.passwordRecovery.userQuestions,
    question1,
    question2,
    submitButton: s.strings.submit,
    disableButton: s.strings.disable,
    isEnabled,
    loginError,
    username,
    showRecoverSuccessDialog: state.login.showRecoverSuccessDialog
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    submit: (answers: Array<string>) => dispatch(loginWithRecovery(answers)),
    getQuestions: () => dispatch(getRecoveryQuestions()),
    onCancel: () => dispatch({ type: 'CANCEL_RECOVERY_KEY' }),
    updateUsername: (username: string) =>
      dispatch({ type: 'AUTH_UPDATE_USERNAME', data: username }),
    changePassword: () => dispatch({ type: 'WORKFLOW_NEXT' })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkedComponent)
