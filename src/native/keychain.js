import { NativeModules } from 'react-native'
const { AbcCoreJsUi } = NativeModules

const LOGINKEY_KEY = 'key_loginkey'
// const USE_TOUCHID_KEY = 'key_use_touchid'
// const RECOVERY2_KEY = 'key_recovery2'

function createKeyWithUsername (username, key) {
  return username + '___' + key
}

export async function isTouchEnabled (abcAccount) {
  console.log('Touch Enabled Check ')
  // const supported = await supportsTouchId()
  // console.log(supported)
  console.log(' Dont throw error , what do we got. ')
  return false
}

export async function supportsTouchId () {
  if (!AbcCoreJsUi) {
    console.warn('AbcCoreJsUi  is unavailable')
    return false
  }
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
    //throw new Error('TouchIdNotSupportedError')
  }
}

export async function disableTouchId (abcAccount) {
  const supported = await supportsTouchId()

  if (supported) {
    const loginKeyKey = createKeyWithUsername(abcAccount.username, LOGINKEY_KEY)
    await AbcCoreJsUi.clearKeychain(loginKeyKey)
    return true
  } else {
    // throw new Error('TouchIdNotSupportedError')
  }
}

export async function loginWithTouchId (
  abcContext,
  username,
  promptString,
  fallbackString,
  opts
) {
  const supported = await supportsTouchId()

  if (supported) {
    const loginKeyKey = createKeyWithUsername(username, LOGINKEY_KEY)
    const loginKey = await AbcCoreJsUi.getKeychainString(loginKeyKey)
    if (loginKey && loginKey.length > 10) {
      console.log('loginKey valid. Launching TouchID modal...')
      const success = await AbcCoreJsUi.authenticateTouchID(
        promptString,
        fallbackString
      )
      if (success) {
        console.log('TouchID authenticated. Calling loginWithKey')
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
  } else {
    console.log('TouchIdNotSupportedError')
    // throw new Error('TouchIdNotSupportedError')
  }
}
