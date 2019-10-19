import { connect } from 'react-redux'

import { changeAccountPage } from '../actions/Account.action'
import {
  changeNewPasswordRepeatValue,
  changeNewPasswordValue,
  changePasswordHidePassword,
  changePasswordShowPassword,
  passwordChanged
} from '../actions/AccountChangePassword.action'
import { openNotification } from '../actions/Notification.action'
import AccountChangePassword from '../components/AccountChangePassword'
import { checkAndChangePassword } from '../middlewares/AccountChangePassword.middleware'
import { validate } from '../middlewares/PasswordValidation.middleware'

const mapStateToProps = state => {
  return {
    visibility: state.changePassword.revealPassword,
    password: state.changePassword.newPassword,
    passwordRepeat: state.changePassword.newPasswordRepeat,
    validation: state.password.validation,
    loading: state.loader.loading,
    account: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openAccountHomeScreen: () => {
      dispatch(passwordChanged())
      dispatch(changeAccountPage('home'))
    },
    changePasswordValue: e => {
      dispatch(changeNewPasswordValue(e.target.value))
      dispatch(validate(e.target.value))
    },
    changePasswordRepeatValue: e =>
      dispatch(changeNewPasswordRepeatValue(e.target.value)),
    togglePasswordVisibility: state => {
      if (state) {
        return dispatch(changePasswordHidePassword())
      }
      return dispatch(changePasswordShowPassword())
    },
    handleSubmit: (password, passwordRepeat, account, callback) =>
      dispatch(
        checkAndChangePassword(password, passwordRepeat, account, callback)
      ),
    handleError: error => dispatch(openNotification(error)),
    handleSuccess: message => {
      dispatch(openNotification(message, 'success'))
      dispatch(passwordChanged())
      dispatch(changeAccountPage('home'))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountChangePassword)
