// @flow

import { connect } from 'react-redux'

import { validateConfirmPassword } from '../../../actions/CreateAccountActions.js'
import s from '../../../common/locales/strings.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import { FormField } from '../../components/common'

type OwnProps = {
  label?: string,
  autoFocus: boolean,
  onFinish(): void
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const label = ownProps.label
    ? ownProps.label
    : s.strings.confirm_password_text
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

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {
    onChangeText: (data: string) => dispatch(validateConfirmPassword(data)),
    onSubmitEditing: ownProps.onFinish
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormField)
