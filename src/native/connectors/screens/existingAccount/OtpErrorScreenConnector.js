import { connect } from 'react-redux'
import LinkedComponent from '../../../components/screens/existingAccout/OtpErrorScreenComponent'
import * as actions from '../../../../common/actions'
import * as Constants from '../../../../common/constants'
export const mapStateToProps = (state, ownProps) => {
  const otpResetDate = state.login.otpResetDate
  const screen = otpResetDate ? Constants.OTP_SCREEN_TWO : Constants.OTP_SCREEN_ONE
  return {
    styles: ownProps.styles,
    otpResetDate,
    screen
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setbackupKey: () => dispatch(actions.retryWithOtp()),
    resetOtpToken: () => dispatch(actions.resetOtpReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedComponent)
