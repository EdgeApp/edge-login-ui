import { connect } from 'react-redux'
import LinkedComponent from '../../components/screens/LoginUsernamePasswordScreenComponent'
import * as loginAction from '../../../common/actions'

export const mapStateToProps = (state, ownProps) => {
  return {
    styles: ownProps.styles,
    auth: state.login,
    loginSuccess: state.login.loginSuccess,
    workflow: state.workflow
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    userLogin: (data) => dispatch(loginAction.userLogin(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
