import { connect } from 'react-redux'
import {FormField} from '../../components/common/'
import * as loginAction from '../../../common/actions'

export const mapStateToProps = (state, ownProps) => {
  let label = ownProps.label ? ownProps.label : 'Password'
  return {
    style: ownProps.style,
    value: state.create.password,
    error: state.create.createPasswordErrorMessage,
    secureTextEntry: true,
    showSecureCheckbox: true,
    showSecureCheckboxLabel: 'Show Password',
    label: label, // TODO localize
    returnKeyType: 'go',
    autoFocus: ownProps.autoFocus
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeText: (data) => dispatch(loginAction.validatePassword(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormField)
