import { connect } from 'react-redux'
import {FormField} from '../../components/common'
import * as loginAction from '../../../common/actions'

export const mapStateToProps = (state, ownProps) => {
  const label = ownProps.label ? ownProps.label : 'Password'
  const value = state.create.password ? state.create.password : ''
  return {
    style: ownProps.style,
    value,
    error: state.create.createPasswordErrorMessage,
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
    onChangeText: (data) => dispatch(loginAction.validatePassword(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormField)
