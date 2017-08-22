import { connect } from 'react-redux'
import {FormField} from '../../components/common/'
import * as loginAction from '../../../common/actions'

export const mapStateToProps = (state, ownProps) => {
  return {
    style: ownProps.style,
    value: state.create.confirmPassword,
    error: state.create.confirmPasswordErrorMessage,
    secureTextEntry: true,
    showSecureCheckbox: true,
    showSecureCheckboxLabel: 'Show Password',
    label: 'Confirm Password',
    returnKeyType: 'go',
    autoFocus: ownProps.autoFocus
     // TODO localize
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeText: (data) => dispatch(loginAction.validateConfirmPassword(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormField)
