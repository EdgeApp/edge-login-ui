import { connect } from 'react-redux'

import { closeNotification } from '../actions/Notification.action'
import Notification from '../components/Notification'

const mapStateToProps = state => {
  return {
    view: state.notification.view,
    message: state.notification.message,
    theme: state.notification.theme
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    closeNotification: () => dispatch(closeNotification())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
