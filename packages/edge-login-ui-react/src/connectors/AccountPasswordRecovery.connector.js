import { connect } from 'react-redux'

import { changeAccountPage } from '../actions/Account.action'
import * as action from '../actions/AccountPasswordRecovery.action'
import { setPasswordRecoveryToken } from '../actions/AccountPasswordRecoveryToken.action'
import { openNotification } from '../actions/Notification.action'
import AccountPasswordRecovery from '../components/AccountPasswordRecovery'
import { checkAndChangePasswordRecovery } from '../middlewares/AccountPasswordRecovery.middleware.js'

const mapStateToProps = state => {
  return {
    account: state.user,
    questions: state.passwordRecovery.questions,
    firstQuestion: state.passwordRecovery.firstQuestion,
    firstAnswer: state.passwordRecovery.firstAnswer,
    secondQuestion: state.passwordRecovery.secondQuestion,
    secondAnswer: state.passwordRecovery.secondAnswer,
    error: {
      firstQuestion: state.passwordRecovery.error.firstQuestion,
      secondQuestion: state.passwordRecovery.error.secondQuestion,
      firstAnswer: state.passwordRecovery.error.firstAnswer,
      secondAnswer: state.passwordRecovery.error.secondAnswer
    },
    loadingQuestions: state.passwordRecovery.loadingQuestions,
    loading: state.loader.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openAccountHomeScreen: () => {
      dispatch(action.finishPasswordRecovery())
      dispatch(changeAccountPage('home'))
    },
    changeFirstPasswordRecoveryQuestionValue: value =>
      dispatch(action.changeFirstPasswordRecoveryQuestionValue(value)),
    changeFirstPasswordRecoveryAnswerValue: value =>
      dispatch(action.changeFirstPasswordRecoveryAnswerValue(value)),
    changeSecondPasswordRecoveryQuestionValue: value =>
      dispatch(action.changeSecondPasswordRecoveryQuestionValue(value)),
    changeSecondPasswordRecoveryAnswerValue: value =>
      dispatch(action.changeSecondPasswordRecoveryAnswerValue(value)),
    checkPasswordRecovery: (payload, callback) =>
      dispatch(checkPasswordRecovery(payload, callback)),
    clearPasswordRecovery: () => dispatch(action.clearPasswordRecovery()),
    loadQuestions: () => {
      const ctx = window.abcui.abcuiContext
      dispatch(action.openLoadingQuestions())
      ctx
        .listRecoveryQuestionChoices()
        .then(results => {
          const questions = results
            .filter(result => result.category === 'recovery2')
            .map(result => result.question)
          dispatch(action.setPasswordRecoveryQuestions(questions))
          dispatch(action.closeLoadingQuestions())
        })
        .catch(error => {
          dispatch(openNotification(error.name))
          dispatch(action.closeLoadingQuestions())
        })
    },
    handleSubmit: (password, passwordRepeat, account, callback) =>
      dispatch(
        checkAndChangePasswordRecovery(
          password,
          passwordRepeat,
          account,
          callback
        )
      ),
    handleError: error => dispatch(openNotification(error)),
    handleSuccess: token => {
      dispatch(setPasswordRecoveryToken(token))
      dispatch(action.finishPasswordRecovery())
      dispatch(changeAccountPage('token'))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPasswordRecovery)
