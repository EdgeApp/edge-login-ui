// @flow

import type { Dispatch, GetState, Imports } from '../types/ReduxTypes.js'

export const requestOtpReset = () => async (
  dispatch: Dispatch,
  getState: GetState,
  imports: Imports
): Promise<void> => {
  const state = getState()
  const { username, otpError } = state.login
  const { context } = imports
  if (otpError == null) {
    throw new Error('Missing OtpError')
  }
  const { resetToken } = otpError
  if (resetToken == null) {
    throw new Error('Missing OTP reset token')
  }

  const date = await context.requestOtpReset(username, resetToken)
  dispatch({ type: 'OTP_RESET_REQUEST', data: date })
}
