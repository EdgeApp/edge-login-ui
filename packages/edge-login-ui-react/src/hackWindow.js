// @flow

import type { EdgeAccount, EdgeAccountOptions, EdgeContext } from 'edge-core-js'

/**
 * The web login UI expects to find a bunch of stuff on the `window` object.
 * This is horrible, but the fastest way to get things working is to just
 * give the UI what it expects.
 */
export function hackWindow (
  account: EdgeAccount | null,
  accountOptions: EdgeAccountOptions | null,
  context: EdgeContext,
  onClose: () => mixed,
  onError: (e: Error) => mixed,
  onLogin: ((account: EdgeAccount) => mixed) | null,
  vendorImageUrl: string,
  vendorName: string
) {
  window.abcui = {
    assetPath: './',
    abcuiContext: context,
    abcAccount: account,
    accountOptions,
    vendorName,
    vendorImageUrl,

    loginCallback (error, account) {
      if (error) return onError(error)
      if (!account) throw new Error('Account not provided')
      if (!onLogin) throw new Error('Not expecting a login')

      window.abcui.abcAccount = account
      onLogin(account)
      onClose()
    },

    loginWithoutClosingCallback (error, account) {
      if (error) return onError(error)
      if (!account) throw new Error('Account not provided')
      if (!onLogin) throw new Error('Not expecting a login')

      window.abcui.abcAccount = account
      onLogin(account)
    },

    exitCallback () {
      onClose()
    }
  }
}
