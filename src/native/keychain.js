import { NativeModules } from 'react-native'
const { AbcCoreJsUi } = NativeModules

const LOGINKEY_KEY = 'key_loginkey'
// const USE_TOUCHID_KEY = 'key_use_touchid'
// const RECOVERY2_KEY = 'key_recovery2'

function createKeyWithUsername (username, key) {
  return username + '___' + key
}

export async function supportsTouchId () {
  const out = await AbcCoreJsUi.supportsTouchId()
  return out
}

export async function enableTouchId (abcAccount) {
  const supported = await supportsTouchId()

  if (supported) {
    const loginKeyKey = createKeyWithUsername(abcAccount.username, LOGINKEY_KEY)
    await AbcCoreJsUi.setKeychainString(abcAccount.loginKey, loginKeyKey)
    return true
  } else {
    throw new Error('TouchIdNotSupportedError')
  }
}

export async function disableTouchId (abcAccount) {
  const supported = await supportsTouchId()

  if (supported) {
    const loginKeyKey = createKeyWithUsername(abcAccount.username, LOGINKEY_KEY)
    await AbcCoreJsUi.clearKeychain(loginKeyKey)
    return true
  } else {
    throw new Error('TouchIdNotSupportedError')
  }
}

export async function loginWithTouchId (abcContext, username, opts) {
  const supported = await supportsTouchId()

  if (supported) {
    const loginKeyKey = createKeyWithUsername(username, LOGINKEY_KEY)
    const loginKey = await AbcCoreJsUi.getKeychainString(loginKeyKey)
    if (loginKey && loginKey.length > 10) {
      return abcContext.loginWithKey(username, loginKey, opts)
    } else {
      // No login. Just return null as AbcAccount object
      return null
    }
  } else {
    throw new Error('TouchIdNotSupportedError')
  }
}

