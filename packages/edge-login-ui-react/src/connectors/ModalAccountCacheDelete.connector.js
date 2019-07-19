import { connect } from 'react-redux'

import {
  closeAccountCacheDeleteModal,
  openAccountCacheDeleteModal
} from '../actions/ModalAccountCacheDelete.action.js'
import ModalAccountCacheDelete from '../components/ModalAccountCacheDelete'
import { deleteUserToCache } from '../middlewares/LoginCachedUsers.middleware.js'

const mapStateToProps = state => {
  return {
    view: state.modal.accountCacheDelete,
    name: state.cachedUsers.userToDeleteFromUserCache
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    closeModalAccountCacheDelete: () =>
      dispatch(closeAccountCacheDeleteModal()),
    deleteUserFromCache: user => {
      dispatch(deleteUserToCache(user))
      dispatch(openAccountCacheDeleteModal())
      return dispatch(closeAccountCacheDeleteModal(user))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAccountCacheDelete)
