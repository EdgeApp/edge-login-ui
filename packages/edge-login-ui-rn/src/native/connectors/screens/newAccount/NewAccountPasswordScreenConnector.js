// @Flow
import { connect } from 'react-redux'

import * as actions from '../../../../common/actions'
import type { Dispatch, State } from '../../../../types/ReduxTypes'
import LinkedComponent from '../../../components/screens/newAccount/NewAccountPasswordScreenComponent'

export const mapStateToProps = (state: State) => {
  const error = state.create.confirmPasswordErrorMessage
    ? state.create.confirmPasswordErrorMessage
    : ''
  const error2 = state.create.createPasswordErrorMessage
    ? state.create.createPasswordErrorMessage
    : ''
  return {
    password: state.create.password,
    passwordStatus: state.create.passwordStatus,
    confirmPassword: state.create.confirmPassword,
    createPasswordErrorMessage: state.create.createPasswordErrorMessage,
    workflow: state.workflow,
    error,
    error2
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    checkTheConfirmPassword: () => dispatch(actions.validateConfirmPassword()),
    skipPassword: () => dispatch(actions.validateConfirmPassword()),
    nextScreen: () => dispatch(actions.nextScreen())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
