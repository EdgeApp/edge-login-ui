import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/existingAccout/RecoverPasswordScreenComponent.js'
// import * as actions from '../../../../common/actions'
// import * as Constants from '../../../../common/constants'
export const mapStateToProps = (state, ownProps) => {
  return {
    styles: ownProps.styles,
    showHeader: ownProps.showHeader,
    questionsList: state.passwordRecovery.questionsList,
    submitButton: 'Submit'
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    /* setbackupKey: () => dispatch(actions.retryWithOtp()),
    resetOtpToken: () => dispatch(actions.resetOtpReset()) */
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)

/*
// @flow
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
