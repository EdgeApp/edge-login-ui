import * as keychain from '../../../native/keychain'

async function touchIdEnabled (account) {
  const out = await keychain.isTouchEnabled(account)
  return out
}
function enableTouchId (arg, account) {
  if (arg) {
    return keychain.enableTouchId(account)
  }
  keychain.disableTouchId(account)
}

async function supportsTouchId () {
  return await keychain.supportsTouchId()
}

export { touchIdEnabled, supportsTouchId, enableTouchId }
