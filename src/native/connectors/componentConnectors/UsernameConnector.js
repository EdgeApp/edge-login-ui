import { connect } from 'react-redux'
import { FormField } from '../../components/common/'
import * as loginAction from '../../../common/actions'

export const mapStateToProps = (state, ownProps) => {
  return {
    style: ownProps.style,
    value: state.login.username,
    error: state.login.usernameErrorMessage,
    label: 'Username'
  }
}
export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeText: data => dispatch(loginAction.validateUsername(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormField)
