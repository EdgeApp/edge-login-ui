import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/newAccount/NewAccountPasswordScreenComponent'
import * as actions from '../../../../common/actions'

export const mapStateToProps = (state, ownProps) => {
  const error = state.create.confirmPasswordErrorMessage ? state.create.confirmPasswordErrorMessage : ''
  const error2 = state.create.createPasswordErrorMessage ? state.create.createPasswordErrorMessage : ''
  return {
    styles: ownProps.styles,
    password: state.create.password,
    passwordStatus: state.create.passwordStatus,
    confirmPassword: state.create.confirmPassword,
    createPasswordErrorMessage: state.create.createPasswordErrorMessage,
    workflow: state.workflow,
    error,
    error2
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    checkTheConfirmPassword: () => dispatch(actions.validateConfirmPassword()),
    nextScreen: () => dispatch(actions.nextScreen())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
