import { connect } from 'react-redux'

import * as actions from '../../../../common/actions'
import LinkedComponent from '../../../components/screens/existingAccout/ChangeAccountPasswordScreenComponent'

export const mapStateToProps = (state, ownProps) => {
  const error = state.create.confirmPasswordErrorMessage
    ? state.create.confirmPasswordErrorMessage
    : ''
  const error2 = state.create.createPasswordErrorMessage
    ? state.create.createPasswordErrorMessage
    : ''
  return {
    styles: ownProps.styles,
    password: state.create.password,
    passwordStatus: state.create.passwordStatus,
    confirmPassword: state.create.confirmPassword,
    createPasswordErrorMessage: state.create.createPasswordErrorMessage,
    workflow: state.workflow,
    showHeader: true,
    showModal: state.create.showModal,
    error,
    error2
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setWorkflow: () => {
      console.log('dont use on this component')
    },
    checkTheConfirmPassword: () => dispatch(actions.validateConfirmPassword()),
    changePassword: data => dispatch(actions.recoveryChangePassword(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
