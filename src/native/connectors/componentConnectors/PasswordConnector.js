import { connect } from 'react-redux'
import {FormField} from '../../components/common/'
import * as loginAction from '../../../common/actions'

export const mapStateToProps = (state, ownProps) => {
  return {
    style: ownProps.style,
    value: state.login.password,
    error: state.login.createPasswordErrorMessage,
    secureTextEntry: true,
    label: 'Password' // TODO localize
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeText: (data) => dispatch(loginAction.validatePassword(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormField)
