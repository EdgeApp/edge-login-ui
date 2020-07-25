// @flow

import { connect } from 'react-redux'

import {
  resetOtpReset,
  retryWithOtp
} from '../../../../common/actions/LoginAction.js'
import * as Constants from '../../../../common/constants'
import { type Dispatch, type RootState } from '../../../../types/ReduxTypes.js'
import LinkedComponent from '../../../components/screens/existingAccout/OtpErrorScreenComponent'

export const mapStateToProps = (state: RootState) => {
  const otpResetDate = state.login.otpResetDate
  const screen = otpResetDate
    ? Constants.OTP_SCREEN_TWO
    : Constants.OTP_SCREEN_ONE
  const backupKeyError = state.login.otpErrorMessage || false
  return {
    otpResetDate,
    screen,
    loginSuccess: state.login.loginSuccess,
    backupKeyError
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setbackupKey: () => dispatch(retryWithOtp()),
    resetOtpToken: () => dispatch(resetOtpReset())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkedComponent)
