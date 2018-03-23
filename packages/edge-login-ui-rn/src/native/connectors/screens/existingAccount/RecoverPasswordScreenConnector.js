// @flow

import { connect } from 'react-redux'

import * as actions from '../../../../common/actions'
import * as Constants from '../../../../common/constants'
import s from '../../../../common/locales/strings'
import type { Dispatch, State } from '../../../../types/ReduxTypes.js'
import LinkedComponent from '../../../components/screens/existingAccout/RecoverPasswordScreenComponent.js'
import type { OwnProps } from '../../../components/screens/existingAccout/RecoverPasswordScreenComponent.js'

export const mapStateToProps = (state: State, ownProps: OwnProps) => {
  const isEnabled = state.passwordRecovery.userQuestions.length > 0 || false
  const question1 =
    state.passwordRecovery.userQuestions.length > 0
      ? state.passwordRecovery.userQuestions[0]
      : 'Choose recovery question'
  const question2 =
    state.passwordRecovery.userQuestions.length > 1
      ? state.passwordRecovery.userQuestions[1]
      : s.strings.choose_recovery_question
  const username = returnTrunatedUsername(state.login.username)
  return {
    showHeader: ownProps.showHeader,
    questionsList: state.passwordRecovery.questionsList,
    userQuestions: state.passwordRecovery.userQuestions,
    question1,
    question2,
    submitButton: s.strings.submit,
    doneButton: s.strings.done,
    saveButton: s.strings.save,
    disableButton: s.strings.disable_password_recovery,
    isEnabled,
    username,
    backupKey: state.passwordRecovery.recoveryKey,
    showEmailDialog: state.passwordRecovery.showRecoveryEmailDialog
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    submit: (questions: Array<string>, answers: Array<string>) =>
      dispatch(actions.changeRecoveryAnswers(questions, answers)),
    deleteRecovery: () => dispatch(actions.deleteRecovery()),
    cancel: () => {
      dispatch(actions.deleteRecovery())
      dispatch(actions.cancelRecoverySettingsScene())
      dispatch(actions.dispatchAction(Constants.DISMISS_EMAIL_MODAL))
    },
    returnToSettings: () => dispatch(actions.cancelRecoverySettingsScene())
  }
}

function returnTrunatedUsername (arg) {
  if (arg) {
    return arg.charAt(0) + arg.charAt(1) + '***'
  }
  return arg
}
export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)

/*
import {connect} from 'react-redux'
import * as SETTINGS_SELECTORS from '../../modules/UI/Settings/selectors.js'
import type {Dispatch, State} from '../../modules/ReduxTypes'
import PasswordRecoveryComponent from '../../modules/UI/scenes/PasswordRecovery/PasswordRecoveryComponent.ui'
// import * as Constants from '../../constants/indexConstants.js'

export const mapStateToProps = (state: State) => {
  return {
    recoveryQuestions: SETTINGS_SELECTORS.getRecoveryQuestionChoices(state)
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  setAnswers: (obj: Object) => dispatch()
})

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecoveryComponent) */
