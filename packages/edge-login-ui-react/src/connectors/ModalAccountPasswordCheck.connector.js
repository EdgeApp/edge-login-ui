import { connect } from 'react-redux'

import { changeAccountPage } from '../actions/Account.action'
import {
  changeAccountPasswordCheckModalPassword,
  closeAccountPasswordCheckModal,
  openAccountPasswordCheckModal
} from '../actions/ModalAccountPasswordCheck.action.js'
import { openNotification } from '../actions/Notification.action'
import ModalAccountPasswordCheck from '../components/ModalAccountPasswordCheck'
import { checkPassword } from '../middlewares/Account.middleware'

const mapStateToProps = state => {
  return {
    user: state.user,
    password: state.modal.accountPasswordCheck.password,
    view: state.modal.accountPasswordCheck.view,
    route: state.modal.accountPasswordCheck.route,
    loading: state.loader.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openAccountScreen: route => dispatch(changeAccountPage(route)),
    changePassworValue: value =>
      dispatch(changeAccountPasswordCheckModalPassword(value)),
    openAcountPassowordCheckModal: () =>
      dispatch(openAccountPasswordCheckModal()),
    closeAcountPasswordCheckModal: () =>
      dispatch(closeAccountPasswordCheckModal()),
    checkPassword: (password, user, callback) =>
      dispatch(checkPassword(password, user, callback)),
    handleError: message => dispatch(openNotification(message))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAccountPasswordCheck)
