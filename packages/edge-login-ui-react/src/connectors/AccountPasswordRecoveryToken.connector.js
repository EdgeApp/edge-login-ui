import { connect } from 'react-redux'

import { changePasswordRecoveryEmail } from '../actions/AccountPasswordRecoveryToken.action.js'
import { openPasswordRecoverySuccessModal } from '../actions/ModalPasswordRecoverySuccess.action'
import { openNotification } from '../actions/Notification.action'
import AccountPasswordRecoveryToken from '../components/AccountPasswordRecoveryToken'
import { checkEmail } from '../middlewares/AccountPasswordRecoveryToken.middleware.js'

const mapStateToProps = state => {
  return {
    account: state.user,
    token: state.passwordRecoveryToken.token,
    email: state.passwordRecoveryToken.email,
    error: state.passwordRecoveryToken.error,
    passwordRecoverySuccess: state.modal.passwordRecoverySuccess
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeEmaileValue: value => dispatch(changePasswordRecoveryEmail(value)),
    handleSubmit: (address, email, token, username, callback) =>
      dispatch(checkEmail(address, email, token, username, callback)),
    handleError: error => dispatch(openNotification(error)),
    handleSuccess: () => dispatch(openPasswordRecoverySuccessModal())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPasswordRecoveryToken)
