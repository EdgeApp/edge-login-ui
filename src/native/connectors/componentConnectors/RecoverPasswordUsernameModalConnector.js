import { connect } from 'react-redux'
import {FormField} from '../../components/common'
import * as actions from '../../../common/actions'
import * as Constants from '../../../common/constants'

export const mapStateToProps = (state, ownProps) => {
  return {
   /*
    value,
    error,
    secureTextEntry: true,
    showSecureCheckbox: true,
    showSecureCheckboxLabel: 'Show Password',
    label: label, // TODO localize
    returnKeyType: 'next',
    autoFocus: ownProps.autoFocus */
    value: state.login.username,
    label: 'Username',
    error: state.login.errorMessage,
    style: ownProps.style,
    returnKeyType: 'go',
    forceFocus: true
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeText: (data) => dispatch(actions.dispatchActionWithData(Constants.AUTH_UPDATE_USERNAME, data)),
    onSubmitEditing: ownProps.onSubmitEditing
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormField)
