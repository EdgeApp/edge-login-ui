// @flow
import { connect } from 'react-redux'
import { FormField } from '../../components/common'
import * as actions from '../../../common/actions'
import type { State, Dispatch } from '../../../types/ReduxTypes'

type OwnProps = {
  label: string,
  autoFocus: boolean,
  onFinish(): void,
  onBlur(): void,
  onFocus(): void
}

export const mapStateToProps = (state: State, ownProps: OwnProps) => {
  const label = ownProps.label ? ownProps.label : 'Password'
  const value = state.create.password ? state.create.password : ''
  const error = state.create.createPasswordErrorMessage
    ? state.create.createPasswordErrorMessage
    : ''
  return {
    value,
    error,
    secureTextEntry: true,
    showSecureCheckbox: true,
    showSecureCheckboxLabel: 'Show Password',
    label: label, // TODO localize
    returnKeyType: 'next',
    autoFocus: ownProps.autoFocus
  }
}

export const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {
    onChangeText: (data: string) => dispatch(actions.validatePassword(data)),
    onSubmitEditing: ownProps.onFinish,
    onBlur: ownProps.onBlur,
    onFocus: ownProps.onFocus
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormField)
