import { connect } from 'react-redux'

import { openNotification } from '../actions/Notification.action'
import { changeSignupPage } from '../actions/Signup.action'
import {
  changePasswordRepeatValue,
  changePasswordValue,
  hidePassword,
  showPassword
} from '../actions/SignupPassword.action'
import { getDetails } from '../actions/SignupReviewDetails.action'
import SignupPassword from '../components/SignupPassword'
import { validate } from '../middlewares/PasswordValidation.middleware'
import { checkPassword } from '../middlewares/SignupPassword.middleware'

const mapStateToProps = state => {
  return {
    inputState: state.password.inputState,
    password: state.password.password,
    passwordRepeat: state.password.passwordRepeat,
    validation: state.password.validation,
    username: state.username.username,
    pin: state.pin.pin,
    loading: state.loader.loading
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    openPinScreen: () => dispatch(changeSignupPage('pin')),
    openReviewScreen: () => dispatch(changeSignupPage('review')),
    changePasswordValue: e => {
      dispatch(changePasswordValue(e.target.value))
      return dispatch(validate(e.target.value))
    },
    changePasswordRepeatValue: e =>
      dispatch(changePasswordRepeatValue(e.target.value)),
    togglePasswordVisibility: state => {
      if (!state) {
        return dispatch(showPassword())
      }
      return dispatch(hidePassword())
    },
    setReviewDetails: details => dispatch(getDetails(details)),
    handleSubmit: (data, callback) => dispatch(checkPassword(data, callback)),
    handleError: message => dispatch(openNotification(message))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPassword)
