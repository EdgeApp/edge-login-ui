import { connect } from 'react-redux'
import {DeleteUserModal}
  from '../../components/abSpecific/DeleteUserModal.js'
import * as actions from '../../../common/actions'

export const mapStateToProps = (state, ownProps) => {
  return {
    style: ownProps.style,
    username: ownProps.username
  }
}
export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    cancelFunc: () => dispatch(actions.cancelSkipStep()),
    deleteFunc: (data) => dispatch(actions.deleteUserFromDevice(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUserModal)
