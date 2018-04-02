// @flow

import { connect } from 'react-redux'

import * as actions from '../../../../common/actions'
import * as Constants from '../../../../common/constants'
import type { Dispatch, State } from '../../../../types/ReduxTypes'
import LinkedComponent from '../../../components/screens/existingAccout/ChangeAccountPasswordScreenComponent'
import type { OwnProps } from '../../../components/screens/existingAccout/ChangeAccountPasswordScreenComponent'

export const mapStateToProps = (state: State, ownProps: OwnProps) => {
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
    showHeader: ownProps.showHeader,
    showModal: state.create.showModal,
    error,
    error2
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setWorkflow: () =>
      dispatch(actions.startWorkflow(Constants.WORKFLOW_PASSWORD)),
    checkTheConfirmPassword: () => dispatch(actions.validateConfirmPassword()),
    changePassword: (data: string) => dispatch(actions.changePassword(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
