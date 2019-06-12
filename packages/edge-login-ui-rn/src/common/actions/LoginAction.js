// @flow

import {
  createSimpleConfirmModal,
  createThreeButtonModal,
  createYesNoModal
} from 'edge-components'
import React from 'react'

import { ModalIcon as Icon } from '../../native/components/common'
import {
  enableTouchId,
  isTouchDisabled,
  isTouchEnabled,
  loginWithTouchId,
  supportsTouchId
} from '../../native/keychain.js'
import type { Dispatch, GetState, Imports } from '../../types/ReduxTypes'
import * as Constants from '../constants'
import s from '../locales/strings.js'
import { showModal, translateError } from '../util'
import {
  dispatchAction,
  dispatchActionWitString,
  dispatchActionWithData
} from './'

/**
 * Make it Thunky
 */
export function loginWithRecovery (answers: Array<string>, username: string) {
  return async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const state = getState()
    const backupKey = state.passwordRecovery.recoveryKey
    const username = state.login.username
    const { context, folder } = imports
    try {
      const account = await context.loginWithRecovery2(
        backupKey,
        username,
        answers,
        imports.accountOptions
      )
      account.watch('loggedIn', loggedIn => {
        if (!loggedIn) dispatch(dispatchAction(Constants.RESET_APP))
      })
      const touchDisabled = await isTouchDisabled(folder, account.username)
      if (!touchDisabled) {
        await enableTouchId(folder, account)
      }
      await folder
        .file('lastuser.json')
        .setText(JSON.stringify({ username: account.username }))
        .catch(e => null)
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
      dispatch(dispatchActionWithData(Constants.LOGIN_RECOVERY_SUCCEESS, obj))
    } catch (e) {
      console.log('there was an error')
      console.log(e.message)
      const incorrect = 'The answers you provided are incorrect. '
      dispatch(
        dispatchActionWitString(Constants.ON_RECOVERY_LOGIN_ERROR, incorrect)
      )
    }
  }
}

export function resetOtpReset () {
  return async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const state = getState()
    const context = imports.context
    const username = state.login.username
    const otpResetToken = state.login.otpResetToken
    try {
      const response = await context.requestOtpReset(username, otpResetToken)
      console.log(response)
      dispatch(dispatchActionWithData(Constants.OTP_RESET_REQUEST, response))
      console.log('Make it to the next scent ')
    } catch (e) {
      console.log(e)
      console.log('stop')
    }
  }
}
export function retryWithOtp () {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    dispatch(dispatchAction(Constants.START_RECOVERY_LOGIN))
    const state = getState()
    const userBackUpKey = state.login.otpUserBackupKey
    const previousAttemptType = state.login.previousAttemptType
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
export function userLoginWithTouchId (data: Object) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const { callback, context, folder } = imports
    const startFunction = () => {
      dispatch(dispatchAction(Constants.AUTH_LOGGING_IN_WITH_PIN))
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
            if (!loggedIn) dispatch(dispatchAction(Constants.RESET_APP))
          })
          folder
            .file('lastuser.json')
            .setText(JSON.stringify({ username: data.username }))
            .catch(e => null)
          await twofaReminder(account)
          dispatch(dispatchAction(Constants.LOGIN_SUCCEESS))
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
export function userLoginWithPin (data: Object, backupKey?: string) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const { callback, context, folder } = imports
    const myAccountOptions = {
      ...imports.accountOptions
    }
    if (backupKey) {
      myAccountOptions.otp = backupKey
    }
    dispatch(dispatchActionWithData(Constants.AUTH_UPDATE_PIN, data.pin))
    if (data.pin.length === 4) {
      setTimeout(async () => {
        try {
          const abcAccount = await context.loginWithPIN(
            data.username,
            data.pin,
            myAccountOptions
          )
          abcAccount.watch('loggedIn', loggedIn => {
            if (!loggedIn) dispatch(dispatchAction(Constants.RESET_APP))
          })
          const touchDisabled = await isTouchDisabled(
            folder,
            abcAccount.username
          )
          if (!touchDisabled) {
            await enableTouchId(folder, abcAccount)
          }
          await folder
            .file('lastuser.json')
            .setText(JSON.stringify({ username: abcAccount.username }))
            .catch(e => null)
          const isTouchSupported = await supportsTouchId()
          const touchEnabled = await isTouchEnabled(folder, abcAccount.username)
          const touchIdInformation = {
            isTouchSupported,
            isTouchEnabled: touchEnabled
          }
          await twofaReminder(abcAccount)
          dispatch(dispatchAction(Constants.LOGIN_SUCCEESS))
          callback(null, abcAccount, touchIdInformation)
        } catch (e) {
          console.log('LOG IN WITH PIN ERROR ', e)
          if (e.name === 'OtpError') {
            e.loginAttempt = 'PIN'
            dispatch(dispatchActionWithData(Constants.OTP_ERROR, e))
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
          dispatch(
            dispatchActionWithData(Constants.LOGIN_PIN_FAIL, {
              message,
              wait: e.wait
            })
          )
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
export function processWait (message: string) {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const state = getState()
    const wait = state.login.wait
    console.log('RL: wait ', wait)
    if (wait > 0) {
      // console.log('RL: got more than 1', wait)
      dispatch(
        dispatchActionWithData(Constants.LOGIN_PIN_FAIL, {
          message,
          wait: wait - 1
        })
      )
      setTimeout(() => {
        dispatch(processWait(message))
      }, 1000)
    }
  }
}

export function userLogin (data: Object, backupKey?: string) {
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
          if (!loggedIn) dispatch(dispatchAction(Constants.RESET_APP))
        })
        const touchDisabled = await isTouchDisabled(folder, abcAccount.username)
        if (!touchDisabled) {
          await enableTouchId(folder, abcAccount)
        }
        await folder
          .file('lastuser.json')
          .setText(JSON.stringify({ username: abcAccount.username }))
          .catch(e => null)
        const touchEnabled = await isTouchEnabled(folder, abcAccount.username)
        const isTouchSupported = await supportsTouchId()
        const touchIdInformation = {
          isTouchSupported,
          isTouchEnabled: touchEnabled
        }
        await twofaReminder(abcAccount)
        dispatch(dispatchAction(Constants.LOGIN_SUCCEESS))
        callback(null, abcAccount, touchIdInformation)
      } catch (e) {
        console.log(e)
        if (e.name === 'OtpError' && !myAccountOptions.otp) {
          e.loginAttempt = 'PASSWORD'
          dispatch(dispatchActionWithData(Constants.OTP_ERROR, e))
          return
        }
        const rawMessage = e.message
        if (e.message === 'Unexpected end of data') {
          e.message = s.strings.backup_key_incorrect
        }
        if (e.name === 'OtpError' && myAccountOptions.otp) {
          dispatch(
            dispatchActionWitString(
              Constants.OTP_LOGIN_BACKUPKEY_FAIL,
              s.strings.backup_key_incorrect
            )
          )
          return
        }
        if (myAccountOptions.otp) {
          dispatch(
            dispatchActionWitString(
              Constants.OTP_LOGIN_BACKUPKEY_FAIL,
              translateError(e.message)
            )
          )
          console.log('stop')
          return
        }
        dispatch(
          dispatch(
            dispatchActionWithData(
              Constants.LOGIN_USERNAME_PASSWORD_FAIL,
              rawMessage
            )
          )
        )
        callback(e.message, null)
      }
    }, 300)
  }
}

export function getEdgeLoginQrCode () {
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
      dispatch(dispatchActionWithData(Constants.START_EDGE_LOGIN_REQUEST, qr))
    } catch (e) {
      console.log(e.name)
      console.log(e.message)
      console.log(e)
    }
  }
}
export function recoveryLoginComplete () {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const state = getState()
    const account = state.login.account
    const touchIdInformation = state.login.touchIdInformation
    const callback = imports.callback
    dispatch(dispatchAction(Constants.CLOSE_NOTIFICATION_MODAL))
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
    const modal = createSimpleConfirmModal({
      title: s.strings.otp_authentication_header,
      icon: <Icon name={Constants.CREATE} type={Constants.ION_ICONS} />,
      message: account.otpKey,
      buttonText: s.strings.ok
    })
    return await showModal(modal)
  }

  const createOtpCheckModal = async () => {
    const modal = createYesNoModal({
      title: s.strings.otp_reset_modal_header,
      icon: (
        <Icon
          name={Constants.WARNING}
          type={Constants.ION_ICONS}
          style={{ color: Constants.ACCENT_RED }}
        />
      ),
      message: s.strings.otp_reset_modal_message,
      yesButtonText: s.strings.enable,
      noButtonText: s.strings.skip_button
    })
    return await showModal(modal)
  }

  const createOtpCheckModalDontAsk = async () => {
    const modal = createThreeButtonModal({
      title: s.strings.otp_reset_modal_header,
      icon: (
        <Icon
          name={Constants.WARNING}
          type={Constants.ION_ICONS}
          style={{ color: Constants.ACCENT_RED }}
        />
      ),
      message: s.strings.otp_reset_modal_message,
      primaryButton: {
        text: s.strings.enable,
        returnValue: 'enable'
      },
      secondaryButton: {
        text: s.strings.cancel,
        returnValue: 'cancel'
      },
      tertiaryButton: {
        text: s.strings.otp_reset_modal_dont_ask,
        returnValue: 'dontAsk'
      }
    })
    return await showModal(modal)
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
