import { connect } from 'react-redux'
import {Input} from '../../components/common/'
import * as loginAction from '../../../common/actions'

export const mapStateToProps = (state, ownProps) => {
  return {
    style: ownProps.style,
    value: state.login.password,
    error: state.login.passwordErrorMessage,
    secureTextEntry: true
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeText: (data) => dispatch(loginAction.validatePassword(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input)
