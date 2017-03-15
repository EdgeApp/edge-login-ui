import { openErrorModal } from '../ErrorModal/ErrorModal.action'
import { openLoading, closeLoading } from '../Loader/Loader.action'

import { userLogin, requestEdgeLogin } from './Login.action'

export const loginWithPassword = (username, password, callback) => {
  return (dispatch, getState, imports) => {
    const t = imports.t
    const abcContext = imports.abcContext
    const localStorage = global ? global.localStorage : window.localStorage

    dispatch(openLoading())
    setTimeout(() => {
      abcContext(context => {
        context.loginWithPassword(username, password, null, null, (error, account) => {
          if (error) {
            dispatch(closeLoading())
            let type = error.type === "OtpError" ? "server_error_bad_otp" : "server_error_bad_password";
            dispatch(openErrorModal(t(type)))
            return callback(error, null)
          }
          if (!error) {
            localStorage.setItem('lastUser', username)
            dispatch(userLogin(account))
            callback(null, account)
          }
        })
      })
    }, 300)
  }
}

export const loginWithPin = (username, pin, callback) => {
  return (dispatch, getState, imports) => {
    const t = imports.t    
    dispatch(openLoading())
    const localStorage = global ? global.localStorage : window.localStorage
    const abcctx = imports.abcContext

    setTimeout(() => {
      abcctx(context => {
        context.loginWithPIN(username, pin, (error, account) => {

          dispatch(closeLoading())
          if (error) {
            dispatch(openErrorModal(t('server_error_bad_pin')))
            return callback(error, null)
          }

          if (!error) {
            localStorage.setItem('lastUser', username)
            dispatch(userLogin(account))
            return callback(null, account)
          }
        })
      })
    }, 300)
  }
}

export const edgeLogin = (handleEdgeLogin, handleProcessLogin) => {
  return (dispatch, getState, imports) => {
    const abcContext = imports.abcContext
    abcContext(context => {
      context.requestEdgeLogin({
        displayName: abcContext.vendorName,
        displayImageUrl: abcContext.vendorImageUrl,
        onLogin: handleProcessLogin,
        onProcessLogin: handleProcessLogin
      }, (error, results) => {
        if (error) {
          console.log(error)
        } else if (results) {
          dispatch(requestEdgeLogin(results))
        }
      })
    })
  }
}
