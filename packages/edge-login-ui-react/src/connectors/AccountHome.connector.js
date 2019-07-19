import { connect } from 'react-redux'

import { userLogin } from '../actions/Login.action'
import { openAccountPasswordCheckModal } from '../actions/ModalAccountPasswordCheck.action.js'
import AccountHome from '../components/AccountHome'

const mapStateToProps = state => {
  return {
    account: state.user,
    passwordCheckModal: state.modal.accountPasswordCheck.view
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogin: account => dispatch(userLogin(account)),
    openAccountPasswordCheckModal: screen =>
      dispatch(openAccountPasswordCheckModal(screen))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountHome)
