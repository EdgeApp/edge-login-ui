import { connect } from 'react-redux'

import { closeForgotPasswordModal } from '../actions/ModalForgotPassword.action'
import ModalForgotPassword from '../components/ModalForgotPassword'

const mapStateToProps = state => {
  return {
    view: state.modal.forgotPassword
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    closeModalForgotPassword: () => dispatch(closeForgotPasswordModal())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalForgotPassword)
