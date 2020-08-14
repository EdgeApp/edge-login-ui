// @flow

import { getSupportedBiometryType } from '../keychain.js'
import {
  type Dispatch,
  type GetState,
  type Imports
} from '../types/ReduxTypes.js'
import { checkingForOTP } from '../util/checkingForOTP.js'
import { getPreviousUsers } from './PreviousUsersActions.js'

/**
 * Fires off all the things we need to do to get the login scene up & running.
 */
export const initializeLogin = () => async (
  dispatch: Dispatch,
  getState: GetState,
  imports: Imports
) => {
  const touchPromise = dispatch(getTouchMode())
  const usersPromise = dispatch(getPreviousUsers())
  checkingForOTP(imports.context)

  await Promise.all([touchPromise, usersPromise])
  const state = getState()

  // Loading is done, so send the user to the initial route:
  const { previousUsers, touch } = state
  const firstUser = previousUsers.lastUser

  if (imports.recoveryKey) {
    dispatch({
      type: 'SET_RECOVERY_KEY',
      data: imports.recoveryKey
    })
  } else if (firstUser == null) {
    dispatch({ type: 'WORKFLOW_START', data: 'landingWF' })
  } else if (
    firstUser.pinEnabled ||
    (firstUser.touchEnabled && touch !== 'none')
  ) {
    dispatch({ type: 'WORKFLOW_START', data: 'pinWF' })
  } else {
    dispatch({ type: 'WORKFLOW_START', data: 'passwordWF' })
  }
}

/**
 * Figures out whether or not biometric logins are available.
 */
const getTouchMode = () => async (dispatch: Dispatch, getState: GetState) => {
  try {
    const touch = await getSupportedBiometryType()
    switch (touch) {
      case 'FaceID':
      case 'TouchID':
        return dispatch({ type: 'SET_TOUCH', data: touch })
      case 'Fingerprint':
        return dispatch({ type: 'SET_TOUCH', data: 'TouchID' })
      default:
        return dispatch({
          type: 'SET_TOUCH',
          data: touch ? 'TouchID' : false
        })
    }
  } catch (error) {
    console.log(error)
    return dispatch({ type: 'SET_TOUCH', data: false })
  }
}
