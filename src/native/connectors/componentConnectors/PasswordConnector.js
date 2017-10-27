import { connect } from 'react-redux'
import {FormField} from '../../components/common'
import * as actions from '../../../common/actions'

export const mapStateToProps = (state, ownProps) => {
  const label = ownProps.label ? ownProps.label : 'Password'
  const value = state.create.password ? state.create.password : ''
  const error = state.create.createPasswordErrorMessage ? state.create.createPasswordErrorMessage : ''
  return {
    style: ownProps.style,
    value,
    error,
    secureTextEntry: true,
    showSecureCheckbox: true,
    showSecureCheckboxLabel: 'Show Password',
    label: label, // TODO localize
    returnKeyType: 'next',
    autoFocus: ownProps.autoFocus,
    onFinish: ownProps.onFinish,
    onBlur: ownProps.onBlur,
    onFocus: ownProps.onFocus
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeText: (data) => dispatch(actions.validatePassword(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormField)
