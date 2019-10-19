import { connect } from 'react-redux'

import {
  closeLoginUsingPin,
  loginPIN,
  openUserList
} from '../actions/Login.action'
import { openNotification } from '../actions/Notification.action'
import LoginWithPin from '../components/LoginWithPin'
import { loginWithPin } from '../middlewares/Login.middleware'

const mapStateToProps = state => {
  return {
    pin: state.login.pin,
    user: state.cachedUsers.selectedUserToLogin,
    edgeObject: state.login.edgeLoginResults,
    showCachedUsers: state.login.showCachedUsers,
    modalAccountCacheDelete: state.modal.accountCacheDelete,
    loading: state.loader.loading
  }
}

export const mapDispatchToProps = (dispatch, props) => {
  return {
    closeLoginWithPinScreen: () => dispatch(closeLoginUsingPin()),
    openCachedUsers: () => dispatch(openUserList()),
    handleLoginPin: pin => dispatch(loginPIN(pin)),
    handleSubmit: ({ user, pin }) => {
      const callback = (error, account) => {
        dispatch(loginPIN(''))
        if (error) {
          return dispatch(openNotification(error))
        }
        if (window.abcui.loginCallback) {
          return window.abcui.loginCallback(null, account)
        }
        dispatch(closeLoading())
        return props.history.push('/account')
      }
      return dispatch(loginWithPin(user, pin, callback))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginWithPin)
