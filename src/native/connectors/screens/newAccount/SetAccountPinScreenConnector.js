import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/newAccount/SetAccountPinScreenComponent'
import * as loginAction from '../../../../common/actions'

export const mapStateToProps = (state, ownProps) => {
  return {
    styles: ownProps.styles,
    username: state.login.username,
    password: state.login.password,
    pin: state.login.pin,
    pinError: state.login.pinError,
    workflow: state.workflow
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createUser: (data) => dispatch(loginAction.createUser(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
