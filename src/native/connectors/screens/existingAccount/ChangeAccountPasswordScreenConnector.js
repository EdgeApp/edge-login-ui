import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/existingAccout/ChangeAccountPasswordScreenComponent'
import * as actions from '../../../../common/actions'
import * as Constants from '../../../../common/constants'

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
    showHeader: ownProps.showHeader,
    showModal: state.create.showModal,
    error,
    error2
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setWorkflow: () => dispatch(actions.startWorkflow(Constants.WORKFLOW_PASSWORD)),
    changePassword: (data) => dispatch(actions.changePassword(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
