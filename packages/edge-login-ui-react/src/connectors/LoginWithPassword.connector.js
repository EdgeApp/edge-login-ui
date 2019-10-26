import { connect } from 'react-redux'

import {
  loginPassword,
  loginUsername,
  openLoginUsingEdge,
  openUserList
} from '../actions/Login.action'
import { openForgotPasswordModal } from '../actions/ModalForgotPassword.action'
import { openNotification } from '../actions/Notification.action'
import LoginWithPassword from '../components/LoginWithPassword'
import { loginWithPassword } from '../middlewares/Login.middleware'

const mapStateToProps = state => {
  return {
    username: state.login.username,
    password: state.login.password,
    cachedUsers: state.cachedUsers.users,
    showCachedUsers: state.login.showCachedUsers,
    edgeObject: state.login.edgeLoginResults,
    modalForgotPassword: state.modal.forgotPassword,
    modalAccountCacheDelete: state.modal.accountCacheDelete,
    loading: state.loader.loading
  }
}

export const mapDispatchToProps = (dispatch, props) => {
  return {
    gotoSignupPage: () => props.history.push('/signup'),
    changeUsernameValue: e => dispatch(loginUsername(e.target.value)),
    changePasswordValue: e => dispatch(loginPassword(e.target.value)),
    openLoginEdgePage: () => dispatch(openLoginUsingEdge()),
    openCachedUsers: () => dispatch(openUserList()),
    openModalForgotPassword: () => dispatch(openForgotPasswordModal()),
    unmountLoginPasswordScreen: () => dispatch(loginPassword('')),
    handleSubmit: data => {
      const { username, password } = data
      const callback = (error, account) => {
        if (error) {
          return dispatch(openNotification(error))
        }
        if (window.abcui.loginCallback) {
          if (props.edgeObject) {
            props.edgeObject.cancelRequest()
          }
          return window.abcui.loginCallback(null, account)
        }
        dispatch(closeLoading())
        return props.history.push('/account')
      }
      return dispatch(loginWithPassword(username, password, callback))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginWithPassword)
