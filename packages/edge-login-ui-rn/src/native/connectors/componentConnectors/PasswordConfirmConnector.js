import { connect } from 'react-redux'
import {FormField} from '../../components/common'
import * as actions from '../../../common/actions'

export const mapStateToProps = (state, ownProps) => {
  const label = ownProps.label ? ownProps.label : 'Confirm Password'
  const value = state.create.confirmPassword ? state.create.confirmPassword : ''
  const error = state.create.confirmPasswordErrorMessage ? state.create.confirmPasswordErrorMessage : ''
  return {
    style: ownProps.style,
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

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeText: (data) => dispatch(actions.validateConfirmPassword(data)),
    onSubmitEditing: ownProps.onFinish
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormField)
