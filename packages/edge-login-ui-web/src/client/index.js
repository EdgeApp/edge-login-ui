// @flow
/* eslint-disable no-use-before-define */

import type { EdgeWalletInfo } from 'edge-core-js'

export { makeEdgeUiContext } from './client-context.js'

// context ------------------------------------------------------------

export type EdgeUiContextCallbacks = {
  +onError?: (e: Error) => mixed
}

export type EdgeUiContextOptions = {
  apiKey: string,
  appId: string,
  assetsPath: string,
  callbacks?: EdgeUiContextCallbacks,
  frameTimeout?: number,
  vendorImageUrl?: string,
  vendorName?: string
}

export type EdgeLoginWindowOptions = {
  +onLogin?: (account: EdgeUiAccount) => mixed,
  +onClose?: () => mixed
}

export type EdgeUiContext = {
  dispose(): mixed,
  openLoginWindow(opts: EdgeLoginWindowOptions): Promise<mixed>
}

// account ------------------------------------------------------------

export type { EdgeWalletInfo } from 'edge-core-js'

export type EdgeManageWindowOptions = {
  +onClose?: () => mixed
}

export type EdgeUiAccount = {
  appId: string,
  username: string,

  // Lifetime:
  logout(): void,

  // Account credentials:
  openManageWindow(opts?: EdgeManageWindowOptions): Promise<mixed>,

  // All wallet infos:
  walletInfos: { [walletId: string]: EdgeWalletInfo },
  createWallet(type: string, keys: {}): Promise<string>
}
