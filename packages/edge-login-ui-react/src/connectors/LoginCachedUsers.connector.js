import { connect } from 'react-redux'

import { loginUsername } from '../actions/Login.action'
import {
  selectUserToDeleteFromUserCache,
  selectUserToLogin
} from '../actions/LoginCachedUsers.action'
import { openAccountCacheDeleteModal } from '../actions/ModalAccountCacheDelete.action.js'
import LoginCachedUsers from '../components/LoginCachedUsers'
import { deleteUserToCache } from '../middlewares/LoginCachedUsers.middleware.js'

const mapStateToProps = state => {
  return {
    users: state.cachedUsers.users,
    cachedUsersWithPinEnabled: state.cachedUsers.usersWithPinEnabled
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectUserToDeleteFromUserCache: user => {
      dispatch(selectUserToDeleteFromUserCache(user))
      return dispatch(openAccountCacheDeleteModal())
    },
    loginUsername: ({ cachedUsersWithPinEnabled, user }) => {
      if (cachedUsersWithPinEnabled.includes(user)) {
        dispatch(selectUserToLogin(user))
      } else {
        dispatch(loginUsername(user))
      }
    },
    deleteUserFromCache: user => {
      dispatch(deleteUserToCache(user))
      return dispatch(openAccountCacheDeleteModal())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginCachedUsers)
