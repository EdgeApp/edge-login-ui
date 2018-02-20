import { NativeModules, Platform } from 'react-native'
const { AbcCoreJsUi } = NativeModules

const LOGINKEY_KEY = 'key_loginkey'
// const USE_TOUCHID_KEY = 'key_use_touchid'
// const RECOVERY2_KEY = 'key_recovery2'

function createKeyWithUsername (username, key) {
  return username + '___' + key
}

const emptyTouchIdUsers = {
  enabledUsers: [],
  disabledUsers: []
}

export async function isTouchEnabled (context, username) {
  const supported = await supportsTouchId()
  if (supported) {
    const fingerprint = await context.io.folder
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

export async function isTouchDisabled (context, username) {
  const supported = await supportsTouchId()
  if (supported) {
    const fingerprint = await context.io.folder
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

async function addTouchIdUser (context, username) {
  const fingerprint = await context.io.folder
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
  await context.io.folder.file('fingerprint.json').setText(fingerprintJson)
}

async function removeTouchIdUser (context, username) {
  const fingerprint = await context.io.folder
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
  await context.io.folder.file('fingerprint.json').setText(fingerprintJson)
}

export async function enableTouchId (context, abcAccount) {
  const supported = await supportsTouchId()

  if (supported) {
    const loginKeyKey = createKeyWithUsername(abcAccount.username, LOGINKEY_KEY)
    await AbcCoreJsUi.setKeychainString(abcAccount.loginKey, loginKeyKey)
    await addTouchIdUser(context, abcAccount.username)
  } else {
    throw new Error('TouchIdNotSupportedError')
  }
}

export async function disableTouchId (context, abcAccount) {
  const supported = await supportsTouchId()

  if (supported) {
    const loginKeyKey = createKeyWithUsername(abcAccount.username, LOGINKEY_KEY)
    await AbcCoreJsUi.clearKeychain(loginKeyKey)
    await removeTouchIdUser(context, abcAccount.username)
  } else {
    // throw new Error('TouchIdNotSupportedError')
  }
}

export async function loginWithTouchId (
  abcContext,
  username,
  promptString,
  fallbackString,
  opts,
  callback
) {
  const supported = await supportsTouchId()

  if (supported) {
    const disabled = await isTouchDisabled(abcContext, username)
    if (disabled) {
      return null
    }
    const enabled = await isTouchEnabled(abcContext, username)
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
