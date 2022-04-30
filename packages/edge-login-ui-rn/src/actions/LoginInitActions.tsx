import { makeReactNativeDisklet } from 'disklet'
import { EdgeLoginMessages } from 'edge-core-js'
import * as React from 'react'
import { NativeModules, Platform } from 'react-native'
import {
  checkNotifications,
  openSettings,
  requestNotifications,
  RESULTS
} from 'react-native-permissions'
import { sprintf } from 'sprintf-js'

import s from '../common/locales/strings'
import { ButtonsModal } from '../components/modals/ButtonsModal'
import { SecurityAlertsModal } from '../components/modals/SecurityAlertsModal'
import { Airship, showError } from '../components/services/AirshipInstance'
import { getSupportedBiometryType } from '../keychain'
import { Branding } from '../types/Branding'
import { Dispatch, GetState, Imports } from '../types/ReduxTypes'
import { Theme } from '../types/Theme'
import { launchPasswordRecovery } from './LoginAction'
import { getPreviousUsers } from './PreviousUsersActions'

const { AbcCoreJsUi } = NativeModules

const disklet = makeReactNativeDisklet()
const permissionsUserFile = 'notificationsPermisions.json'

/**
 * Fires off all the things we need to do to get the login scene up & running.
 */
export const initializeLogin = (theme: Theme, branding: Branding) => async (
  dispatch: Dispatch,
  getState: GetState,
  imports: Imports
) => {
  const { customPermissionsFunction } = imports
  const touchPromise = dispatch(getTouchMode())
  const usersPromise = dispatch(getPreviousUsers())
  dispatch(checkSecurityMessages()).catch(error => console.log(error))
  customPermissionsFunction
    ? customPermissionsFunction()
    : dispatch(checkAndRequestNotifications(theme, branding)).catch(error =>
        console.log(error)
      )

  await Promise.all([touchPromise, usersPromise])
  const state = getState()

  // Loading is done, so send the user to the initial route:
  const { previousUsers, touch } = state
  const { startupUser } = previousUsers

  const { recoveryKey } = imports
  if (recoveryKey) {
    dispatch({ type: 'START_LANDING' })
    dispatch(launchPasswordRecovery(recoveryKey))
  } else if (startupUser == null) {
    dispatch({ type: 'START_LANDING' })
  } else if (
    startupUser.pinEnabled ||
    (startupUser.touchEnabled && touch !== false)
  ) {
    dispatch({ type: 'START_PIN_LOGIN' })
  } else {
    dispatch({ type: 'START_PASSWORD_LOGIN' })
  }
}

const checkSecurityMessages = () => async (
  dispatch: Dispatch,
  getState: GetState,
  imports: Imports
) => {
  const { context } = imports
  const messages = await context.fetchLoginMessages()

  const relevantMessages: EdgeLoginMessages = {}
  for (const username of Object.keys(messages)) {
    const message = messages[username]

    // Skip users who haven't fully logged in:
    const info = context.localUsers.find(info => info.username === username)
    if (info == null || !info.keyLoginEnabled) continue

    const { otpResetPending, pendingVouchers = [] } = message
    if (otpResetPending || pendingVouchers.length > 0) {
      relevantMessages[username] = message
    }
  }

  if (Object.keys(relevantMessages).length > 0) {
    Airship.show(bridge => (
      <SecurityAlertsModal
        bridge={bridge}
        messages={relevantMessages}
        selectUser={username =>
          dispatch({ type: 'AUTH_UPDATE_USERNAME', data: username })
        }
      />
    ))
  }
}

//
// Logic for showing notification/app refresh request
//
// 0 = false, 1 = true
// nr = notifications and app refresh request message
// r = notifications request message
// r = app refresh request only message
//
// | Notif Enabled |  Notif Block | App Refresh Enabled || Message |
// |---------------|--------------|---------------------||---------|
// |       0       |       0      |           0         >>    nr   |
// |       0       |       0      |           1         >>    n    |
// |       0       |       1      |           0         >>    r    |
// |       0       |       1      |           1         >>         |
// |       1       |       0      |           0         >>    r    |
// |       1       |       0      |           1         >>         |
// |       1       |       1      |           0         >>    r    |
// |       1       |       1      |           1         >>         |
//
const isIos = Platform.OS === 'ios'

const logicMap: Array<Array<Array<string | undefined>>> = [
  [[], []],
  [[], []]
]

logicMap[0][0][0] = s.strings.notifications_and_refresh_permissions_branded
logicMap[0][0][1] = s.strings.notifications_permissions_branded
logicMap[0][1][0] = s.strings.refresh_permission_branded
logicMap[0][1][1] = undefined
logicMap[1][0][0] = s.strings.refresh_permission_branded
logicMap[1][0][1] = undefined
logicMap[1][1][0] = s.strings.refresh_permission_branded
logicMap[1][1][1] = undefined

const checkAndRequestNotifications = (
  theme: Theme,
  branding: Branding
) => async (dispatch: Dispatch, getState: GetState, imports: Imports) => {
  const notificationPermission = await checkNotifications()
  const notificationStatus = notificationPermission.status
  const notifEnabled =
    notificationStatus !== RESULTS.BLOCKED &&
    notificationStatus !== RESULTS.DENIED
      ? 1
      : 0

  const statusAppRefresh = isIos
    ? await AbcCoreJsUi.backgroundAppRefreshStatus().catch((error: undefined) =>
        console.log(error)
      )
    : undefined
  const refreshEnabled = statusAppRefresh !== RESULTS.BLOCKED ? 1 : 0

  const userPermissionStatus = await disklet
    .getText(permissionsUserFile)
    .catch(error => console.log(error))
  const notifBlockedBool = userPermissionStatus
    ? JSON.parse(userPermissionStatus).isNotificationBlocked
    : false
  const notifBlocked = notifBlockedBool ? 1 : 0

  const permissionMessage =
    logicMap[notifEnabled][notifBlocked][refreshEnabled] != null
      ? sprintf(
          logicMap[notifEnabled][notifBlocked][refreshEnabled] ?? '',
          branding.appName
        )
      : undefined

  console.log(`checkAndRequestNotifications`)
  console.log(
    `notificationStatus:${notificationStatus} statusAppRefresh:${statusAppRefresh}`
  )
  console.log(
    `notifEnabled:${notifEnabled} notifBlocked:${notifBlocked} refreshEnabled:${refreshEnabled}`
  )
  console.log(`permissionMessage:${permissionMessage}`)

  if (permissionMessage != null) {
    const message: string = permissionMessage // XXX Typescript hack
    Airship.show(bridge => (
      <ButtonsModal
        bridge={bridge}
        title={s.strings.alert_modal_title}
        message={message}
        borderColor={theme.warningText}
        borderWidth={4}
        buttons={{
          enable: { label: s.strings.enable },
          cancel: { label: s.strings.cancel, type: 'escape' }
        }}
      />
    ))
      .then(async result => {
        console.log(`checkAndRequestNotifications result ${result}`)
        if (result === 'cancel') {
          return await disklet.setText(
            permissionsUserFile,
            JSON.stringify({ isNotificationBlocked: true })
          )
        }
        if (result === 'enable' && notificationStatus === RESULTS.DENIED) {
          requestNotifications(
            isIos ? ['alert', 'badge', 'sound'] : []
          ).catch(error => console.log(error))
        }
        if (
          result === 'enable' &&
          (notificationStatus === RESULTS.BLOCKED ||
            statusAppRefresh === RESULTS.BLOCKED)
        ) {
          openSettings().catch(error => console.log(error))
        }
      })
      .catch(showError)
  }
}

/**
 * Figures out whether or not biometric logins are available.
 */
const getTouchMode = () => async (dispatch: Dispatch, getState: GetState) => {
  try {
    const touch = await getSupportedBiometryType()
    switch (touch) {
      case 'FaceID':
      case 'TouchID':
        return dispatch({ type: 'SET_TOUCH', data: touch })
      case 'Fingerprint':
        return dispatch({ type: 'SET_TOUCH', data: 'TouchID' })
      default:
        return dispatch({
          type: 'SET_TOUCH',
          data: touch ? 'TouchID' : false
        })
    }
  } catch (error) {
    console.log(error)
    return dispatch({ type: 'SET_TOUCH', data: false })
  }
}
