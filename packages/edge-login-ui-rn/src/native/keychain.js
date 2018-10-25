// @flow

import type { DiskletFolder } from 'disklet'
import type { EdgeAccount, EdgeContext } from 'edge-core-js'
import { NativeModules, Platform } from 'react-native'
const { AbcCoreJsUi } = NativeModules

const LOGINKEY_KEY = 'key_loginkey'
// const USE_TOUCHID_KEY = 'key_use_touchid'
// const RECOVERY2_KEY = 'key_recovery2'

// TODO: Remove this hack! Pass via io object in Core

if (Platform.OS === 'android' && AbcCoreJsUi.fetch) {
  global.androidFetch = async (url: string, options: Object) => {
    const headers: Array<string> = []
    for (const h in options.headers) {
      if (options.headers.hasOwnProperty(h)) {
        headers.push(`${h}______${options.headers[h]}`)
      }
    }
    const result = await AbcCoreJsUi.fetch(
      url,
      options.method,
      options.body,
      headers
    )
    return result
  }
}

function createKeyWithUsername (username, key) {
  return username + '___' + key
}

const emptyTouchIdUsers = {
  enabledUsers: [],
  disabledUsers: []
}

export async function isTouchEnabled (folder: DiskletFolder, username: string) {
  const supported = await supportsTouchId()
  if (supported) {
    const fingerprint = await folder
      .file('fingerprint.json')
      .getText()
      .then(text => JSON.parse(text))
      .catch(e => emptyTouchIdUsers)

    // Check if user is in array
    if (
      fingerprint.enabledUsers &&
      fingerprint.enabledUsers.indexOf(username) !== -1
    ) {
      return true
    }
  }
  return false
}

export async function isTouchDisabled (folder: DiskletFolder, username: string) {
  const supported = await supportsTouchId()
  if (supported) {
    const fingerprint = await folder
      .file('fingerprint.json')
      .getText()
      .then(text => JSON.parse(text))
      .catch(e => emptyTouchIdUsers)

    // Check if user is in array
    if (
      fingerprint.disabledUsers &&
      fingerprint.disabledUsers.indexOf(username) !== -1
    ) {
      return true
    } else {
      return false
    }
  }
  return true
}

export async function supportsTouchId () {
  if (!AbcCoreJsUi) {
    console.warn('AbcCoreJsUi  is unavailable')
    return false
  }
  const out = await AbcCoreJsUi.supportsTouchId()
  return !!out
}

async function addTouchIdUser (folder: DiskletFolder, username: string) {
  const fingerprint = await folder
    .file('fingerprint.json')
    .getText()
    .then(text => JSON.parse(text))
    .catch(e => emptyTouchIdUsers)

  if (fingerprint.enabledUsers.indexOf(username) === -1) {
    fingerprint.enabledUsers.push(username)
  }
  const index = fingerprint.disabledUsers.indexOf(username)
  if (index !== -1) {
    fingerprint.disabledUsers.splice(index, 1)
  }
  const fingerprintJson = JSON.stringify(fingerprint)
  await folder.file('fingerprint.json').setText(fingerprintJson)
}

async function removeTouchIdUser (folder: DiskletFolder, username: string) {
  const fingerprint = await folder
    .file('fingerprint.json')
    .getText()
    .then(text => JSON.parse(text))
    .catch(e => emptyTouchIdUsers)

  if (fingerprint.disabledUsers.indexOf(username) === -1) {
    fingerprint.disabledUsers.push(username)
  }

  const index = fingerprint.enabledUsers.indexOf(username)
  if (index !== -1) {
    fingerprint.enabledUsers.splice(index, 1)
  }

  const fingerprintJson = JSON.stringify(fingerprint)
  await folder.file('fingerprint.json').setText(fingerprintJson)
}

export async function enableTouchId (
  folder: DiskletFolder,
  abcAccount: EdgeAccount
) {
  const supported = await supportsTouchId()

  if (supported) {
    const loginKeyKey = createKeyWithUsername(abcAccount.username, LOGINKEY_KEY)
    await AbcCoreJsUi.setKeychainString(abcAccount.loginKey, loginKeyKey)
    await addTouchIdUser(folder, abcAccount.username)
  } else {
    throw new Error('TouchIdNotSupportedError')
  }
}

export async function disableTouchId (
  folder: DiskletFolder,
  abcAccount: EdgeAccount
) {
  const supported = await supportsTouchId()

  if (supported) {
    const loginKeyKey = createKeyWithUsername(abcAccount.username, LOGINKEY_KEY)
    await AbcCoreJsUi.clearKeychain(loginKeyKey)
    await removeTouchIdUser(folder, abcAccount.username)
  } else {
    // throw new Error('TouchIdNotSupportedError')
  }
}

export async function loginWithTouchId (
  abcContext: EdgeContext,
  folder: DiskletFolder,
  username: string,
  promptString: string,
  fallbackString: string,
  opts: Object,
  callback: any
): Promise<?EdgeAccount> {
  const supported = await supportsTouchId()

  if (supported) {
    const disabled = await isTouchDisabled(folder, username)
    if (disabled) {
      return null
    }
    const enabled = await isTouchEnabled(folder, username)
    if (!enabled) {
      return null
    }
    const loginKeyKey = createKeyWithUsername(username, LOGINKEY_KEY)

    if (Platform.OS === 'ios') {
      const loginKey = await AbcCoreJsUi.getKeychainString(loginKeyKey)
      if (loginKey && loginKey.length > 10) {
        console.log('loginKey valid. Launching TouchID modal...')

        const success = await AbcCoreJsUi.authenticateTouchID(
          promptString,
          fallbackString
        )
        if (success) {
          console.log('TouchID authenticated. Calling loginWithKey')
          callback()
          const abcAccount = abcContext.loginWithKey(username, loginKey, opts)
          console.log('abcAccount logged in: ' + username)
          return abcAccount
        } else {
          console.log('Failed to authenticate TouchID')
          return null
        }
      } else {
        console.log('No valid loginKey for TouchID')
        return null
      }
    } else if (Platform.OS === 'android') {
      try {
        const loginKey = await AbcCoreJsUi.getKeychainStringWithFingerprint(
          loginKeyKey,
          promptString
        )
        callback()
        const abcAccount = abcContext.loginWithKey(username, loginKey, opts)
        console.log('abcAccount logged in: ' + username)
        return abcAccount
      } catch (e) {
        console.log(e)
        return null
      }
    }
  } else {
    console.log('TouchIdNotSupportedError')
    return null
    // throw new Error('TouchIdNotSupportedError')
  }
}
