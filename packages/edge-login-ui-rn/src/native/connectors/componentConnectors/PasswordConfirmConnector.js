// @flow

import { connect } from 'react-redux'

import * as actions from '../../../common/actions'
import s from '../../../common/locales/strings.js'
import type { Dispatch, State } from '../../../types/ReduxTypes'
import { FormField } from '../../components/common'

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
    showSecureCheckboxLabel: s.strings.show_password,
    label: label,
    returnKeyType: 'go',
    autoFocus: ownProps.autoFocus
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
