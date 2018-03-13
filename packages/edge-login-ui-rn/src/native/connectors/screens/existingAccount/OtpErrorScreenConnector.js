import { connect } from 'react-redux'

import * as actions from '../../../../common/actions'
import * as Constants from '../../../../common/constants'
import LinkedComponent from '../../../components/screens/existingAccout/OtpErrorScreenComponent'

export const mapStateToProps = (state, ownProps) => {
  const otpResetDate = state.login.otpResetDate
  const screen = otpResetDate
    ? Constants.OTP_SCREEN_TWO
    : Constants.OTP_SCREEN_ONE
  const backupKeyError = state.login.otpErrorMessage || false
  return {
    styles: ownProps.styles,
    otpResetDate,
    screen,
    loginSuccess: state.login.loginSuccess,
    backupKeyError
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setbackupKey: () => dispatch(actions.retryWithOtp()),
    resetOtpToken: () => dispatch(actions.resetOtpReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
