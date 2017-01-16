import { openErrorModal } from '../ErrorModal/ErrorModal.action'
import { openLoading, closeLoading } from '../Loader/Loader.action'
import { getDetails } from '../ReviewDetails/ReviewDetails.action'

export const signupUser = (username, password, pin, callback) => {
  return ( dispatch, getState, imports ) => {
    const t = imports.t
    const abcContext = imports.abcContext
    // dispatch(
    //   getDetails({
    //     username: username,
    //     password: password,
    //     pin: pin
    //   })
    // )
    // callback()
    dispatch(openLoading(t('fragment_signup_creating_account')))
    abcContext(ctx => {
      ctx.createAccount(username, password, pin, (err, result) => {
        dispatch(closeLoading())
        if (err) {
          return dispatch(openErrorModal(t('activity_signup_failed') + ': ' + err.message))
        }
        if (!err) {
          dispatch(
            getDetails({
              username: username,
              password: password,
              pin: pin
            })
          )
          callback()
        }
      })
    })
  }
}

const checkPermissions = () => {
  return dispatch => {
    checkCameraPermission((errorCamera, camera) => {
      if (errorCamera) {
        console.log(errorCamera)
      }
      if (!errorCamera) {
        console.log('camera permissions', camera)

        checkReadContactPermission((errorContact, contact) => {
          if (errorContact) {
            console.log(errorContact)
          }
          if (!errorContact) {
            console.log('contact permissions', contact)
          }
          dispatch(closeLoading())
          if (!camera) {
            Actions.cameraNotification()
          }
          if (camera && !contact) {
            Actions.contactNotification()
          }
          if (camera && contact) {
            Actions.review()
          }
        })
      }
    })
  }
}
