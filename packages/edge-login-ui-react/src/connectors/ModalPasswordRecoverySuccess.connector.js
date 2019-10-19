import { connect } from 'react-redux'

import { changeAccountPage } from '../actions/Account.action'
import { changePasswordRecoveryEmail } from '../actions/AccountPasswordRecoveryToken.action.js'
import { closePasswordRecoverySuccessModal } from '../actions/ModalPasswordRecoverySuccess.action'
import ModalPasswordRecoverySuccess from '../components/ModalPasswordRecoverySuccess'

const mapStateToProps = state => {
  return {
    view: state.modal.passwordRecoverySuccess
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    finishPasswordRecoveryToken: () => {
      dispatch(changePasswordRecoveryEmail(''))
      dispatch(changeAccountPage('home'))
      dispatch(closePasswordRecoverySuccessModal())
    },
    closePasswordRecoverySuccessModal: () =>
      dispatch(closePasswordRecoverySuccessModal())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalPasswordRecoverySuccess)
