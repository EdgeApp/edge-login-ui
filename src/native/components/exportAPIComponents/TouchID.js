// import * as keychain from '../../../native/keychain'

function touchIdEnabled (account) {
  /* const out = keychain.isTouchEnabled()
  console.log('touch Id Enabled ' + out)
  return out */
  // TODO: Allen get integrated with keychain
  return false
}
function enableTouchId (arg, account) {
  // TODO: Allen- This is where we turn on or off
}

function supportsTouchId () {
  // TODO: integrate with Keychain call
  // currently throwing an error
  // keychain.supportsTouchId()
  return true
}

export { touchIdEnabled, supportsTouchId, enableTouchId }
