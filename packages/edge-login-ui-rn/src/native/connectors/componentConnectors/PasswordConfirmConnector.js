// @flow
import { connect } from 'react-redux'
import { FormField } from '../../components/common'
import * as actions from '../../../common/actions'
import type { State, Dispatch } from '../../../types/ReduxTypes'

type OwnProps = {
  label: string,
  autoFocus: boolean,
  onFinish(): void
}

export const mapStateToProps = (state: State, ownProps: OwnProps) => {
  const label = ownProps.label ? ownProps.label : 'Confirm Password'
  const value = state.create.confirmPassword ? state.create.confirmPassword : ''
  const error = state.create.confirmPasswordErrorMessage
    ? state.create.confirmPasswordErrorMessage
    : ''
  return {
    value,
    error,
    secureTextEntry: true,
    showSecureCheckbox: true,
    showSecureCheckboxLabel: 'Show Password',
    label: label,
    returnKeyType: 'go',
    autoFocus: ownProps.autoFocus
    // TODO localize
  }
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {
    onChangeText: (data: string) =>
      dispatch(actions.validateConfirmPassword(data)),
    onSubmitEditing: ownProps.onFinish
  }
}
// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(FormField)
