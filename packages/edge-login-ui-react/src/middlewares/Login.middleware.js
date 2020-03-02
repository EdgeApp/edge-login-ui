import { sprintf } from 'sprintf-js'

import { closeLoading, openLoading } from '../actions/Loader.action'
import {
  disablePasswordTimeout,
  disablePinTimeout,
  enablePasswordTimeout,
  enablePinTimeout,
  refreshPasswordTimeout,
  refreshPinTimeout,
  requestEdgeLogin,
  userLogin
} from '../actions/Login.action'
import { selectUserToLogin } from '../actions/LoginCachedUsers.action'
import { errorHandling, lastUser } from '../lib/helper'

export const loginWithPassword = (username, password, callback) => {
  return (dispatch, _, imports) => {
    const t = imports.t
    const localStorage = global ? global.localStorage : window.localStorage

    dispatch(openLoading())
    setTimeout(() => {
      const context = window.abcui.abcuiContext
      const accountOptions = window.abcui.accountOptions
      context
        .loginWithPassword(username, password, accountOptions)
        .then(account => {
          localStorage.setItem(lastUser, username)
          dispatch(userLogin(account))
          dispatch(closeLoading())
          callback(null, account)
        })
        .catch(error => {
          dispatch(closeLoading())
          if (error.wait > 0) {
            const currentWaitSpan = error.wait
            const reEnableLoginTime = Date.now() + currentWaitSpan * 1000
            enableTimer(reEnableLoginTime, t('string_password'), dispatch, t)
          }
          return callback(t(errorHandling(error.name)), null)
        })
    }, 300)
  }
}

export const loginWithPin = (username, pin, callback) => {
  return (dispatch, _, imports) => {
    const t = imports.t
    dispatch(openLoading())
    const localStorage = global ? global.localStorage : window.localStorage

    setTimeout(() => {
      const context = window.abcui.abcuiContext
      const accountOptions = window.abcui.accountOptions
      context
        .loginWithPIN(username, pin, accountOptions)
        .then(account => {
          localStorage.setItem(lastUser, username)
          dispatch(userLogin(account))
          dispatch(closeLoading())
          return callback(null, account)
        })
        .catch(error => {
          dispatch(closeLoading())
          if (error.wait > 0) {
            const currentWaitSpan = error.wait
            const reEnableLoginTime = Date.now() + currentWaitSpan * 1000
            enableTimer(reEnableLoginTime, t('string_pin'), dispatch, t)
          }
          return callback(t('error_server_bad_pin'), null)
        })
    }, 300)
  }
}

export const edgeLogin = callback => {
  return (dispatch, _, imports) => {
    const t = imports.t
    const context = window.abcui.abcuiContext
    const cleanups: Array<() => void> = []

    cleanups.push(
      context.on('loginStart', ({ username }) => {
        dispatch(selectUserToLogin(username))
        return dispatch(
          openLoading(sprintf(t('loading_edge_logging_in'), username))
        )
      })
    )
    cleanups.push(
      context.on('loginError', ({ error }) => {
        cleanups.forEach(cleanup => cleanup())
        callback(error)
      })
    )
    cleanups.push(
      context.on('login', account => {
        window.localStorage.setItem(lastUser, account.username)
        dispatch(userLogin(account))
        dispatch(closeLoading())
        cleanups.forEach(cleanup => cleanup())
        return callback(undefined, account)
      })
    )

    const accountOptions = window.abcui.accountOptions
    context
      .requestEdgeLogin({
        displayName: context.displayName,
        displayImageUrl: context.displayImageUrl,
        ...accountOptions
      })
      .then(results => {
        dispatch(closeLoading())
        dispatch(requestEdgeLogin(results))
      })
      .catch(error => {
        dispatch(closeLoading())
        return callback(t(errorHandling(error.name)), null)
      })
  }
}

const enableTimer = (target, source, dispatch, t) => {
  const currentCountdown = Math.floor((target - Date.now()) / 1000)
  scheduleTick(target, source, dispatch, t)
  if (source === t('string_pin')) {
    dispatch(enablePinTimeout(currentCountdown))
  } else if (source === t('string_password')) {
    dispatch(enablePasswordTimeout(currentCountdown))
  }
}

const scheduleTick = (targetTime, source, disp, t) => {
  const difference = Math.floor((targetTime - Date.now()) / 1000)
  if (difference > 0) {
    if (source === t('string_pin')) {
      disp(refreshPinTimeout(difference))
    } else if (source === t('string_password')) {
      disp(refreshPasswordTimeout(difference))
    }
  } else {
    const scheduleTickTimeout = setTimeout(
      () => scheduleTick(targetTime, source, disp),
      1000
    )

    clearTimeout(scheduleTickTimeout, source)
    if (source === t('string_pin')) {
      disp(disablePinTimeout())
    } else if (source === t('string_password')) {
      disp(disablePasswordTimeout())
    }
  }
}
