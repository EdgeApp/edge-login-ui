import { openErrorModal } from '../ErrorModal/ErrorModal.action'
import { openLoading, closeLoading } from '../Loader/Loader.action'
import { userLogin, requestEdgeLogin, enableTimeout, disableTimeout, refreshTimeout } from './Login.action'
import { selectUserToLogin } from '../CachedUsers/CachedUsers.action'
import store from '../../lib/web/configureStore'

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
            let type = (error.type === "OtpError") ? "server_error_bad_otp" : "server_error_bad_password";
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
            let currentWaitSpan = 10
            let reEnableLoginTime = Date.now() + currentWaitSpan * 1000
            enableTimer(reEnableLoginTime, dispatch)       
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


export const enableTimer = (target, dispatch) => {
  var currentCountdown = Math.floor((target - Date.now()) / 1000)
  scheduleTick(target, dispatch)    
  dispatch(enableTimeout(currentCountdown))    
}

export const scheduleTick = (targetTime, dispatch) => {
  var difference = Math.floor( ( targetTime - Date.now() ) / 1000 )   
  if(difference > 0) {
    var scheduleTickTimeout = setTimeout(() => scheduleTick(targetTime, dispatch), 1000)      
    dispatch(refreshTimeout(difference))
  } else {
    clearTimeout(scheduleTickTimeout)
    dispatch(disableTimeout())
  }
}


export const edgeLogin = (callback) => {

  return (dispatch, getState, imports) => {
    const abcContext = imports.abcContext
    const t = imports.t

    const onProcess = (username) => {
      dispatch(selectUserToLogin(username))
      return dispatch(openLoading(String.format(t('edge_logging_in'), username)))
    }

    const onLogin = (error, account) => {
      localStorage.setItem('lastUser', account.username)
      dispatch(userLogin(account))
      return callback(error, account)
    }

    abcContext(context => {
      context.requestEdgeLogin({
        displayName: abcContext.vendorName,
        displayImageUrl: abcContext.vendorImageUrl,
        onLogin: onLogin,
        onProcessLogin: onProcess
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
