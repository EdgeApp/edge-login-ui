import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/existingAccout/LoginWithRecoveryQuestionsScreenComponent'
import * as actions from '../../../../common/actions'
export const mapStateToProps = (state, ownProps) => {
  const isEnabled = true
  const question1 = state.passwordRecovery.userQuestions.length > 0 ? state.passwordRecovery.userQuestions[0] : 'Choose recovery question'
  const question2 = state.passwordRecovery.userQuestions.length > 1 ? state.passwordRecovery.userQuestions[1] : 'Choose recovery question'
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
    loginError: state.login.errorMessage
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submit: (answers) => {
      console.log(answers)
      dispatch(actions.loginWithRecovery(answers))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
