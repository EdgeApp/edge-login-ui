import { pinChanged, hidePinView} from './ChangePin.action'
import { openErrorModal } from '../ErrorModal/ErrorModal.action'
// import { signupUser } from '../Signup/Signup.middleware'

export const checkPin = ( oldPin, newPin, callback ) => {
  return ( dispatch, getState, imports ) => {
    const abcContext = imports.abcContext
    const t = imports.t

      dispatch(pinChanged())
      return dispatch(hidePinView())

  }
}

