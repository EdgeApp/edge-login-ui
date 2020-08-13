// @flow

import { getSupportedBiometryType } from '../keychain.js'
import { type Dispatch, type GetState } from '../types/ReduxTypes.js'
import { getPreviousUsers } from './PreviousUsersActions.js'

/**
 * Fires off all the things we need to do to get the login scene up & running.
 */
export const initializeLogin = () => (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch(getTouchMode())
  dispatch(getPreviousUsers())
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
