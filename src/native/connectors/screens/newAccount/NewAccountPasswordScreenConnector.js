import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/newAccount/NewAccountPasswordScreenComponent'
import * as actions from '../../../../common/actions'

export const mapStateToProps = (state, ownProps) => {
  return {
    styles: ownProps.styles,
    password: state.login.password,
    passwordStatus: state.login.passwordStatus,
    confirmPassword: state.login.confirmPassword,
    createPasswordErrorMessage: state.login.createPasswordErrorMessage,
    workflow: state.workflow
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    nextScreen: () => dispatch(actions.nextScreen())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
