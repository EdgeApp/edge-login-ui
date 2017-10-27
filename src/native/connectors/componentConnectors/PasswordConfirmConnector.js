import { connect } from 'react-redux'
import {PasswordComponent} from '../../components/materialWrappers/indexMaterial'
import * as loginAction from '../../../common/actions'

export const mapStateToProps = (state, ownProps) => {
  const label = ownProps.label ? ownProps.label : 'Confirm Password'
  const value = state.create.confirmPassword ? state.create.confirmPassword : ''

  return {
    style: ownProps.style,
    value,
    error: state.create.confirmPasswordErrorMessage,
    secureTextEntry: true,
    showSecureCheckbox: true,
    showSecureCheckboxLabel: 'Show Password',
    label: label,
    returnKeyType: 'go',
    autoFocus: ownProps.autoFocus,
    onFinish: ownProps.onFinish
     // TODO localize
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeText: (data) => dispatch(loginAction.validateConfirmPassword(PasswordComponent))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordComponent)
