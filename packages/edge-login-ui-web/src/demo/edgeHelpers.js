// @flow

import type {
  EdgeUiAccount,
  EdgeUiContext,
  EdgeUiContextOptions,
  EdgeWalletInfo
} from 'edge-login-ui-web'
import { makeEdgeUiContext } from 'edge-login-ui-web'

// Customize these constants for your own application:
const EDGE_API_KEY = '0b5776a91bf409ac10a3fe5f3944bf50417209a0'
const EDGE_ASSETS_PATH = './iframe/index.html'
const YOUR_APP_ID = 'com.mydomain.myapp'
const YOUR_APP_LOGO =
  'https://airbitz.co/go/wp-content/uploads/2016/10/GenericEdgeLoginIcon.png'
const YOUR_APP_NAME = 'Cloud Chain'

/**
 * Creates an EdgeUiContext object with the app-specific settings.
 */
export function prepareContext (): Promise<EdgeUiContext> {
  const options: EdgeUiContextOptions = {
    apiKey: EDGE_API_KEY,
    appId: YOUR_APP_ID,
    assetsPath: EDGE_ASSETS_PATH,
    vendorImageUrl: YOUR_APP_LOGO,
    vendorName: YOUR_APP_NAME
  }

  // This demo needs some adjustments in development mode:
  if (/localhost/.test(window.location)) {
    options.assetsPath = 'http://localhost:11234/'
    options.frameTimeout = 15000 // Give the asset bundler more time
  }

  return makeEdgeUiContext(options)
}

/**
 * Makes an Edge account ready for the application to use
 * by ensuring that it contains the necessary private keys.
 */
export function prepareAccount (
  account: EdgeUiAccount
): Promise<EdgeWalletInfo> {
  // Find the first Ethereum wallet in the account:
  const walletInfo = account.getFirstWalletInfo('wallet:ethereum')

  // If the account already has the necessary wallet, just return its info:
  if (walletInfo != null) {
    return Promise.resolve(walletInfo)
  }

  // If there is no Ethereum wallet, make one and return its info:
  const keys = {
    ethereumKey: Buffer.from(secureRandom(32)).toString('hex')
  }
  return account
    .createWallet('wallet:ethereum', keys)
    .then(walletId => account.walletInfos[walletId])
}

function secureRandom (size) {
  const out = new Uint8Array(size)
  window.crypto.getRandomValues(out)
  return out
}
