import { openErrorModal } from '../ErrorModal/ErrorModal.action'
import { openLoading, closeLoading } from '../Loader/Loader.action'

import { userLogin } from './Login.action'

export const loginWithPassword = (username, password, callback) => {
  return ( dispatch, getState, imports ) => {
    const abcContext = imports.abcContext
    const localStorage = global ? global.localStorage : window.localStorage

    dispatch(openLoading())
    setTimeout(() => {
      abcContext(context => {
        context.loginWithPassword(username, password, null, null, (error, account) => {
          dispatch(closeLoading())
          if (error) {
            dispatch(openErrorModal(error.message))
            return callback()
          }
          if (!error) {
            localStorage.setItem('lastUser', username)
            dispatch(userLogin(account))
            callback(true)
          }
        })
      })
    },300)
  }
}

export const loginWithPin = (username, pin, callback) => {
  return ( dispatch, getState, imports ) => {
    dispatch(openLoading())
    const localStorage = global ? global.localStorage : window.localStorage
    const context = imports.abcContext
    
    setTimeout(() => {
      abcctx(context => {
        context.loginWithPIN(username, pin, (error, account) => {
          dispatch(closeLoading())
          if (error) {
            dispatch(openErrorModal(error.message))
            return callback()
          }

          if (!error) {
            localStorage.setItem('lastUser', username)
            return callback(true)
          }
        })
      })
    }, 300)
  }
}
