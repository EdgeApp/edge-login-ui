import { connect } from 'react-redux'

import { changeAccountPage } from '../actions/Account.action'
import { changePinValue } from '../actions/AccountChangePin.action'
import { openNotification } from '../actions/Notification.action'
import AccountChangePin from '../components/AccountChangePin'
import { checkAndChangePin } from '../middlewares/AccountChangePin.middleware'

const mapStateToProps = state => {
  return {
    pin: state.changePin.pin,
    account: state.user,
    loading: state.loader.loading,
    error: state.changePin.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openAccountHomeScreen: () => {
      dispatch(changePinValue(''))
      dispatch(changeAccountPage('home'))
    },
    changePinValue: value => dispatch(changePinValue(value)),
    handleSubmit: (pin, account, callback) =>
      dispatch(checkAndChangePin(pin, account, callback)),
    handleError: error => dispatch(openNotification(error)),
    handleSuccess: message => {
      dispatch(changePinValue(''))
      dispatch(openNotification(message, 'success'))
      dispatch(changeAccountPage('home'))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountChangePin)
