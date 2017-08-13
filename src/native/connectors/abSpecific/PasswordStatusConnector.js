import { connect } from 'react-redux'
import PasswordStatusComponent
  from '../../components/abSpecific/PasswordStatusComponent'
import * as loginAction from '../../../common/actions'

export const mapStateToProps = (state, ownProps) => {
  return {
    style: ownProps.style,
    status: state.login.passwordStatus
  }
}
export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChangeText: data => dispatch(loginAction.validateUsername(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  PasswordStatusComponent
)
