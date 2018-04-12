// @flow

import type {
  EdgeUiAccount,
  EdgeUiContext,
  EdgeUiContextOptions
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
export async function prepareContext (): Promise<EdgeUiContext> {
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
export async function prepareAccount (account: EdgeUiAccount): Promise<void> {
  // If there is no Ethereum wallet, make one:
  if (account.getFirstWalletInfo('wallet:ethereum') == null) {
    const keys = {
      ethereumKey: Buffer.from(secureRandom(32)).toString('hex')
    }
    await account.createWallet('wallet:ethereum', keys)
  }
}

function secureRandom (size) {
  const out = new Uint8Array(size)
  window.crypto.getRandomValues(out)
  return out
}
