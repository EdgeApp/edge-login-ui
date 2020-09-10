// @flow

import type { Dispatch, GetState, Imports } from '../types/ReduxTypes.js'

export const requestOtpReset = () => async (
  dispatch: Dispatch,
  getState: GetState,
  imports: Imports
): Promise<void> => {
  const state = getState()
  const { otpAttempt, otpError } = state.login
  const { context } = imports
  if (otpAttempt == null || otpError == null) {
    throw new Error('No OTP retry data')
  }
  const { resetToken } = otpError
  if (resetToken == null) {
    throw new Error('No OTP reset token')
  }

  const date = await context.requestOtpReset(otpAttempt.username, resetToken)
  dispatch({ type: 'OTP_RESET_REQUEST', data: date })
}
