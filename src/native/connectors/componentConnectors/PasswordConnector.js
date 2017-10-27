import { connect } from 'react-redux'
import {PasswordComponent} from '../../components/materialWrappers/indexMaterial'
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
    returnKeyType: 'go',
    autoFocus: ownProps.autoFocus,
    onFinish: ownProps.onFinish
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeText: (data) => dispatch(loginAction.validatePassword(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordComponent)
