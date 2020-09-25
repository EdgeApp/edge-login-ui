// @flow

import { type EdgeAccount } from 'edge-core-js'
import * as React from 'react'
import { sprintf } from 'sprintf-js'

import s from '../common/locales/strings.js'
import { ButtonsModal } from '../components/modals/ButtonsModal.js'
import { Airship } from '../components/services/AirshipInstance.js'
import * as Constants from '../constants/index.js'
import {
  enableTouchId,
  isTouchDisabled,
  isTouchEnabled,
  supportsTouchId
} from '../keychain.js'
import {
  type Dispatch,
  type GetState,
  type Imports
} from '../types/ReduxTypes.js'
import { setMostRecentUsers } from './PreviousUsersActions.js'

/**
 * The user has just logged in, so figure out what do to next.
 */
export const completeLogin = (account: EdgeAccount) => async (
  dispatch: Dispatch,
  getState: GetState,
  imports: Imports
) => {
  await setMostRecentUsers(account.username)

  // Problem logins:
  const { otpResetDate, pendingVouchers = [] } = account
  if (otpResetDate != null || pendingVouchers.length > 0) {
    dispatch({ type: 'START_SECURITY_ALERT', data: account })
    return
  }

  // Recovery logins:
  if (account.recoveryLogin) {
    await Airship.show(bridge => (
      <ButtonsModal
        bridge={bridge}
        message={s.strings.recovery_successful}
        buttons={{ ok: { label: s.strings.ok } }}
      />
    ))
    dispatch({ type: 'START_RESECURE', data: account })
    return
  }

  // Normal logins:
  await twofaReminder(account)
  dispatch(submitLogin(account))
}

/**
 * The resecure workflow calls this when it is done.
 */
export function completeResecure() {
  return (dispatch: Dispatch, getState: GetState, imports: Imports) => {
    const state = getState()
    const { account } = state.login
    dispatch({ type: 'CLOSE_NOTIFICATION_MODAL' })
    dispatch(submitLogin(account))
  }
}

/**
 * Everything is done, and we can pass the account to the outside world.
 */
export const submitLogin = (account: EdgeAccount) => async (
  dispatch: Dispatch,
  getState: GetState,
  imports: Imports
) => {
  const { callback, folder } = imports

  account.watch('loggedIn', loggedIn => {
    if (!loggedIn) dispatch({ type: 'RESET_APP' })
  })

  const touchDisabled = await isTouchDisabled(folder, account.username)
  if (!touchDisabled) {
    await enableTouchId(folder, account).catch(e => {
      console.log(e) // Fail quietly
    })
  }

  const isTouchSupported = await supportsTouchId()
  const touchEnabled = await isTouchEnabled(folder, account.username)
  const touchIdInformation = {
    isTouchSupported,
    isTouchEnabled: touchEnabled
  }

  dispatch({ type: 'LOGIN_SUCCEESS' })
  Airship.clear()
  callback(null, account, touchIdInformation)
}

async function twofaReminder(account: EdgeAccount) {
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
