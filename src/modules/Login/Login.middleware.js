import { openErrorModal } from '../ErrorModal/ErrorModal.action'
import { openLoading, closeLoading } from '../Loader/Loader.action'

import { userLogin } from './Login.action'

export const loginWithPassword = (username, password, callback) => {
  return ( dispatch, getState, imports ) => {
    const abcContext = imports.abcContext
    dispatch(openLoading())
    abcContext(context => {
      context.loginWithPassword(username, password, null, null, (error, account) => {
        dispatch(closeLoading())
        if (error) {
          dispatch(openErrorModal(error.message))
        }
        if (!error) {
          global.localStorage.setItem('lastUser', username)
          dispatch(userLogin(account))
          callback()
        }
      })
    })
  }
}

export const loginWithPin = (username, pin, callback) => {
  return ( dispatch, getState, imports ) => {
    dispatch(openLoading())
    setTimeout(() => {
      abcctx(context => {
        try {
          context.loginWithPIN(username, pin, (error, account) => {
            dispatch(closeLoading())
            if (error) {
              dispatch(openErrorModal(error.message))
            }

            if (!error) {
              global.localStorage.setItem('lastUser', username)
              Actions.home()
            }
          })
        } catch (e) {
          console.log(e)
        }
      })
    }, 300)
  }
}
