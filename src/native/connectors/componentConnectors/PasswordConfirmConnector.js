import { connect } from 'react-redux'
import {Input} from '../../components/common/'
import * as loginAction from '../../../common/actions'

export const mapStateToProps = (state, ownProps) => {
  return {
    style: ownProps.style,
    value: state.login.confirmPassword,
    error: state.login.confirmPasswordErrorMessage,
    secureTextEntry: true
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeText: (data) => dispatch(loginAction.validateConfirmPassword(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input)
