import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/existingAccout/ChangeAccountPasswordScreenComponent'
import * as actions from '../../../../common/actions'
import * as Constants from '../../../../common/constants'

export const mapStateToProps = (state, ownProps) => {
  return {
    styles: ownProps.styles,
    password: state.create.password,
    passwordStatus: state.create.passwordStatus,
    confirmPassword: state.create.confirmPassword,
    createPasswordErrorMessage: state.create.createPasswordErrorMessage,
    workflow: state.workflow,
    showHeader: ownProps.showHeader,
    showModal: state.create.showModal
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setWorkflow: () => dispatch(actions.startWorkflow(Constants.WORKFLOW_PASSWORD)),
    changePassword: (data) => dispatch(actions.changePassword(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
