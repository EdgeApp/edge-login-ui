import { connect } from 'react-redux'

import { openNotification } from '../actions/Notification.action'
import { changeSignupPage } from '../actions/Signup.action'
import { changeUsernameValue } from '../actions/SignupUsername.action'
import SignupUsername from '../components/SignupUsername'
import { checkUsername } from '../middlewares/SignupUsername.middleware'

const mapStateToProps = state => {
  return {
    username: state.username.username,
    loading: state.loader.loading
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    gotoLogin: () => props.history.push('/login'),
    changeUsernameValue: e => dispatch(changeUsernameValue(e.target.value)),
    openSignupPinPage: text => dispatch(changeSignupPage('pin')),
    handleSubmit: (username, callback) =>
      dispatch(checkUsername(username, callback)),
    handleError: text => dispatch(openNotification(text))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupUsername)
