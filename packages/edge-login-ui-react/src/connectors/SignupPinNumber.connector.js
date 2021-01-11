import { connect } from 'react-redux'

import { openNotification } from '../actions/Notification.action'
import { changeSignupPage } from '../actions/Signup.action'
import { changePinNumberValue } from '../actions/SignupPinNumber.action'
import SignupPinNumber from '../components/SignupPinNumber'
import { checkPIN } from '../middlewares/SignupPinNumber.middleware'

const mapStateToProps = state => {
  return {
    pin: state.pin.pin,
    error: state.pin.error
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    openUsernameScreen: () => dispatch(changeSignupPage('username')),
    openPasswordScreen: () => dispatch(changeSignupPage('password')),
    changePinNumberValue: value => dispatch(changePinNumberValue(value)),
    handleSubmit: (pin, callback) => dispatch(checkPIN(pin, callback)),
    handleError: message => dispatch(openNotification(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPinNumber)
