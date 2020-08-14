// @flow

import { makeReactNativeDisklet } from 'disklet'
import React from 'react'
import { sprintf } from 'sprintf-js'

import s from '../common/locales/strings.js'
import { ButtonsModal } from '../components/modals/ButtonsModal.js'
import { Airship } from '../components/services/AirshipInstance.js'
import * as Constants from '../constants/index.js'
import {
  enableTouchId,
  isTouchDisabled,
  isTouchEnabled,
  loginWithTouchId,
  supportsTouchId
} from '../keychain.js'
import type { Dispatch, GetState, Imports } from '../types/ReduxTypes.js'
import { translateError } from '../util/ErrorMessageUtil.js'

/**
 * Make it Thunky
 */
export function loginWithRecovery(
  answers: Array<string>,
  otpBackUpKey?: string
) {
  return async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const state = getState()
    const backupKey = state.passwordRecovery.recoveryKey || ''
    const username = state.login.username
    const { context, folder } = imports
    try {
      const account = await context.loginWithRecovery2(
        backupKey,
        username,
        answers,
        {
          ...imports.accountOptions,
          otp: otpBackUpKey
        }
      )
      account.watch('loggedIn', loggedIn => {
        if (!loggedIn) dispatch({ type: 'RESET_APP' })
      })
      const touchDisabled = await isTouchDisabled(folder, account.username)
      if (!touchDisabled) {
        await enableTouchId(folder, account).catch(e => {
          console.log(e) // Fail quietly
        })
      }
      await setMostRecentUsers(account.username)
      const isTouchSupported = await supportsTouchId()
      const touchEnabled = await isTouchEnabled(folder, account.username)
      const touchIdInformation = {
        isTouchSupported,
        isTouchEnabled: touchEnabled
      }
      const obj = {
        account,
        touchIdInformation
      }
      dispatch({ type: 'LOGIN_RECOVERY_SUCCEESS', data: obj })
    } catch (e) {
      if (e.name === 'OtpError') {
        dispatch({
          type: 'OTP_ERROR',
          data: {
            error: e,
            loginAttempt: 'RECOVERY',
            loginAttemptData: answers
          }
        })
        return
      }
      console.log(e.message)
      const incorrect = 'The answers you provided are incorrect. '
      dispatch({ type: 'ON_RECOVERY_LOGIN_ERROR', data: incorrect })
    }
  }
}

export function resetOtpReset() {
  return async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const state = getState()
    const context = imports.context
    const username = state.login.username
    if (
      state.login.otpError == null ||
      state.login.otpError.resetToken == null
    ) {
      throw new Error('No reset token')
    }
    const otpResetToken = state.login.otpError.resetToken
    try {
      const response = await context.requestOtpReset(username, otpResetToken)
      console.log(response)
      dispatch({ type: 'OTP_RESET_REQUEST', data: response })
      console.log('Make it to the next scent ')
    } catch (e) {
      console.log(e)
      console.log('stop')
    }
  }
}
export function retryWithOtp() {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    dispatch({ type: 'START_RECOVERY_LOGIN' })
    const state = getState()
    const userBackUpKey = state.login.otpUserBackupKey
    const previousAttemptType = state.login.previousAttemptType
    const previousAttemptData = state.login.previousAttemptData
    if (previousAttemptType === 'RECOVERY') {
      loginWithRecovery(previousAttemptData, userBackUpKey)(
        dispatch,
        getState,
        imports
      )
      return dispatch({ type: 'WORKFLOW_START', data: 'resecureWF' })
    }
    if (previousAttemptType === 'PASSWORD') {
      return userLogin(
        { username: state.login.username, password: state.login.password },
        userBackUpKey
      )(dispatch, getState, imports)
    }
    return userLoginWithPin(
      { username: state.login.username, pin: state.login.pin },
      userBackUpKey
    )(dispatch, getState, imports)
  }
}
export function userLoginWithTouchId(data: Object) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const { callback, context, folder } = imports
    const startFunction = () => {
      dispatch({ type: 'AUTH_LOGGING_IN_WITH_PIN' })
    }
    loginWithTouchId(
      context,
      folder,
      data.username,
      'Touch to login user: `' + data.username + '`',
      s.strings.login_with_password,
      imports.accountOptions,
      startFunction
    )
      .then(async account => {
        if (account) {
          account.watch('loggedIn', loggedIn => {
            if (!loggedIn) dispatch({ type: 'RESET_APP' })
          })
          await setMostRecentUsers(data.username)
          await twofaReminder(account)
          dispatch({ type: 'LOGIN_SUCCEESS' })
          const touchIdInformation = {
            isTouchSupported: true,
            isTouchEnabled: true
          }
          callback(null, account, touchIdInformation)
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
}
export function userLoginWithPin(data: Object, backupKey?: string) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const { callback, context, folder } = imports
    const myAccountOptions = {
      ...imports.accountOptions
    }
    if (backupKey) {
      myAccountOptions.otp = backupKey
    }
    dispatch({ type: 'AUTH_UPDATE_PIN', data: data.pin })
    if (data.pin.length === 4) {
      setTimeout(async () => {
        try {
          const abcAccount = await context.loginWithPIN(
            data.username,
            data.pin,
            myAccountOptions
          )
          abcAccount.watch('loggedIn', loggedIn => {
            if (!loggedIn) dispatch({ type: 'RESET_APP' })
          })
          const touchDisabled = await isTouchDisabled(
            folder,
            abcAccount.username
          )
          if (!touchDisabled) {
            await enableTouchId(folder, abcAccount).catch(e => {
              console.log(e) // Fail quietly
            })
          }
          await setMostRecentUsers(data.username)
          const isTouchSupported = await supportsTouchId()
          const touchEnabled = await isTouchEnabled(folder, abcAccount.username)
          const touchIdInformation = {
            isTouchSupported,
            isTouchEnabled: touchEnabled
          }
          await twofaReminder(abcAccount)
          dispatch({ type: 'LOGIN_SUCCEESS' })
          callback(null, abcAccount, touchIdInformation)
        } catch (e) {
          console.log('LOG IN WITH PIN ERROR ', e)
          if (e.name === 'OtpError') {
            dispatch({
              type: 'OTP_ERROR',
              data: {
                error: e,
                loginAttempt: 'PIN'
              }
            })
            return
          }
          if (e.message === 'Unexpected end of data') {
            e.message = s.strings.backup_key_incorrect
          }
          const message =
            e.name === 'PasswordError'
              ? s.strings.invalid_pin
              : e.name === 'UsernameError'
              ? s.strings.pin_not_enabled
              : e.message
          dispatch({
            type: 'LOGIN_PIN_FAIL',
            data: {
              message,
              wait: e.wait
            }
          })
          if (e.wait) {
            setTimeout(() => {
              dispatch(processWait(message))
            }, 1000)
          }
          callback(e.message, null)
        }
      }, 300)
    }
    // dispatch(openLoading()) Legacy dealt with state for showing a spinner
    // the timeout is a hack until we put in interaction manager.
  }
}
export function processWait(message: string) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const state = getState()
    const wait = state.login.wait
    console.log('RL: wait ', wait)
    if (wait > 0) {
      // console.log('RL: got more than 1', wait)
      dispatch({
        type: 'LOGIN_PIN_FAIL',
        data: {
          message,
          wait: wait - 1
        }
      })
      setTimeout(() => {
        dispatch(processWait(message))
      }, 1000)
    }
  }
}

export function userLogin(data: Object, backupKey?: string) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const { callback, context, folder } = imports
    const myAccountOptions = {
      ...imports.accountOptions
    }
    if (backupKey) myAccountOptions.otp = backupKey
    // dispatch(openLoading()) Legacy dealt with state for showing a spinner
    // the timeout is a hack until we put in interaction manager.
    setTimeout(async () => {
      try {
        const abcAccount = await context.loginWithPassword(
          data.username,
          data.password,
          myAccountOptions
        )
        abcAccount.watch('loggedIn', loggedIn => {
          if (!loggedIn) dispatch({ type: 'RESET_APP' })
        })
        const touchDisabled = await isTouchDisabled(folder, abcAccount.username)
        if (!touchDisabled) {
          await enableTouchId(folder, abcAccount).catch(e => {
            console.log(e) // Fail quietly
          })
        }
        await setMostRecentUsers(abcAccount.username)
        const touchEnabled = await isTouchEnabled(folder, abcAccount.username)
        const isTouchSupported = await supportsTouchId()
        const touchIdInformation = {
          isTouchSupported,
          isTouchEnabled: touchEnabled
        }
        await twofaReminder(abcAccount)
        dispatch({ type: 'LOGIN_SUCCEESS' })
        callback(null, abcAccount, touchIdInformation)
      } catch (e) {
        console.log(e)
        if (e.name === 'OtpError' && !myAccountOptions.otp) {
          dispatch({
            type: 'OTP_ERROR',
            data: {
              error: e,
              loginAttempt: 'PASSWORD'
            }
          })
          return
        }
        const rawMessage = e.message
        if (e.message === 'Unexpected end of data') {
          e.message = s.strings.backup_key_incorrect
        }
        if (e.name === 'OtpError' && myAccountOptions.otp) {
          dispatch({
            type: 'OTP_LOGIN_BACKUPKEY_FAIL',
            data: s.strings.backup_key_incorrect
          })
          return
        }
        if (myAccountOptions.otp) {
          dispatch({
            type: 'OTP_LOGIN_BACKUPKEY_FAIL',
            data: translateError(e.message)
          })
          console.log('stop')
          return
        }
        dispatch(
          dispatch({ type: 'LOGIN_USERNAME_PASSWORD_FAIL', data: rawMessage })
        )
        callback(e.message, null)
      }
    }, 300)
  }
}

export function getEdgeLoginQrCode() {
  return async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const context = imports.context
    const myAccountOptions = {
      ...imports.accountOptions,
      displayImageUrl:
        'https://github.com/Airbitz/edge-brand-guide/blob/master/Logo/Mark/Edge-Final-Logo_Mark-Green.png',
      displayName: 'Edge Wallet'
    }
    try {
      const qr = await context.requestEdgeLogin(myAccountOptions)
      console.log(qr)
      dispatch({ type: 'START_EDGE_LOGIN_REQUEST', data: qr })
    } catch (e) {
      console.log(e.name)
      console.log(e.message)
      console.log(e)
    }
  }
}
export function recoveryLoginComplete() {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const state = getState()
    const account = state.login.account
    const touchIdInformation = state.login.touchIdInformation
    const callback = imports.callback
    dispatch({ type: 'CLOSE_NOTIFICATION_MODAL' })
    callback(null, account, touchIdInformation)
  }
}
// validateUsername check

const twofaReminder = async account => {
  const { otpKey, dataStore } = account
  const pluginList = await dataStore.listStoreIds()
  const storeName = pluginList.includes(Constants.OTP_REMINDER_STORE_NAME)
    ? Constants.OTP_REMINDER_STORE_NAME
    : null
  const itemList = storeName
    ? await dataStore.listItemIds(Constants.OTP_REMINDER_STORE_NAME)
    : null
  const createdAtString =
    itemList && itemList.includes(Constants.OTP_REMINDER_KEY_NAME_CREATED_AT)
      ? await dataStore.getItem(
          Constants.OTP_REMINDER_STORE_NAME,
          Constants.OTP_REMINDER_KEY_NAME_CREATED_AT
        )
      : null
  const createdAt = createdAtString ? parseInt(createdAtString) : null
  const reminderCreatedAtDate = createdAt
    ? createdAt + Constants.OTP_REMINDER_MILLISECONDS
    : null
  const lastOtpCheckString =
    itemList &&
    itemList.includes(Constants.OTP_REMINDER_KEY_NAME_LAST_OTP_CHECKED)
      ? await dataStore.getItem(
          Constants.OTP_REMINDER_STORE_NAME,
          Constants.OTP_REMINDER_KEY_NAME_LAST_OTP_CHECKED
        )
      : null
  const lastOtpCheck = lastOtpCheckString ? parseInt(lastOtpCheckString) : null
  const reminderLastOtpCheckDate = lastOtpCheck
    ? lastOtpCheck + Constants.OTP_REMINDER_MILLISECONDS
    : null
  const dontAsk =
    itemList && itemList.includes(Constants.OTP_REMINDER_KEY_NAME_DONT_ASK)
      ? await dataStore.getItem(
          Constants.OTP_REMINDER_STORE_NAME,
          Constants.OTP_REMINDER_KEY_NAME_DONT_ASK
        )
      : null

  const enableOtp = async account => {
    await account.enableOtp()
    return Airship.show(bridge => (
      <ButtonsModal
        bridge={bridge}
        title={s.strings.otp_authentication_header}
        message={sprintf(s.strings.otp_authentication_message, account.otpKey)}
        buttons={{ ok: { label: s.strings.ok } }}
      />
    ))
  }

  const createOtpCheckModal = async () => {
    const result = await Airship.show(bridge => (
      <ButtonsModal
        bridge={bridge}
        title={s.strings.otp_reset_modal_header}
        message={s.strings.otp_reset_modal_message}
        buttons={{
          yes: { label: s.strings.enable },
          no: { label: s.strings.skip_button, type: 'secondary' }
        }}
      />
    ))
    return result === 'yes'
  }

  const createOtpCheckModalDontAsk = async () => {
    return Airship.show(bridge => (
      <ButtonsModal
        bridge={bridge}
        header={s.strings.otp_reset_modal_header}
        message={s.strings.otp_reset_modal_message}
        buttons={{
          enable: { label: s.strings.enable, type: 'primary' },
          cancel: { label: s.strings.skip_button, type: 'secondary' },
          dontAsk: {
            label: s.strings.otp_reset_modal_dont_ask,
            type: 'secondary'
          }
        }}
      />
    ))
  }

  if (otpKey) {
    return true
  }

  if (dontAsk) {
    return true
  }

  if (!storeName) {
    const resolve = await createOtpCheckModal()
    if (resolve) {
      await enableOtp(account)
      await account.dataStore.setItem(
        Constants.OTP_REMINDER_STORE_NAME,
        Constants.OTP_REMINDER_KEY_NAME_LAST_OTP_CHECKED,
        Date.now().toString()
      )
      return true
    }
    await account.dataStore.setItem(
      Constants.OTP_REMINDER_STORE_NAME,
      Constants.OTP_REMINDER_KEY_NAME_LAST_OTP_CHECKED,
      Date.now().toString()
    )
    return false
  }

  if (
    lastOtpCheckString &&
    lastOtpCheck &&
    reminderLastOtpCheckDate &&
    Date.now() > reminderLastOtpCheckDate
  ) {
    const resolve = await createOtpCheckModalDontAsk()
    if (resolve === 'enable') {
      await enableOtp(account)
      return true
    }
    if (resolve === 'dontAsk') {
      await account.dataStore.setItem(
        Constants.OTP_REMINDER_STORE_NAME,
        Constants.OTP_REMINDER_KEY_NAME_DONT_ASK,
        'true'
      )
      return false
    }
    await account.dataStore.setItem(
      Constants.OTP_REMINDER_STORE_NAME,
      Constants.OTP_REMINDER_KEY_NAME_LAST_OTP_CHECKED,
      Date.now().toString()
    )
    return false
  }

  if (lastOtpCheckString) {
    return true
  }

  if (
    createdAtString &&
    createdAt &&
    reminderCreatedAtDate &&
    Date.now() > reminderCreatedAtDate
  ) {
    const resolve = await createOtpCheckModal()
    if (resolve) {
      await enableOtp(account)
      await account.dataStore.setItem(
        Constants.OTP_REMINDER_STORE_NAME,
        Constants.OTP_REMINDER_KEY_NAME_LAST_OTP_CHECKED,
        Date.now().toString()
      )
      return true
    }
    await account.dataStore.setItem(
      Constants.OTP_REMINDER_STORE_NAME,
      Constants.OTP_REMINDER_KEY_NAME_LAST_OTP_CHECKED,
      Date.now().toString()
    )
    return false
  }

  return true
}

export const setMostRecentUsers = async (username: string) => {
  const disklet = makeReactNativeDisklet()
  const lastUsers = await disklet
    .getText('lastusers.json')
    .then(text => JSON.parse(text))
    .catch(_ => [])
  if (lastUsers && lastUsers.length > 0) {
    const filteredLastUsers = lastUsers.filter(
      (lastUser: string) => lastUser !== username
    )
    return disklet.setText(
      'lastusers.json',
      JSON.stringify([username, ...filteredLastUsers])
    )
  }
  return disklet.setText('lastusers.json', JSON.stringify([username]))
}
