// @flow
/* eslint-disable no-use-before-define */

import type { EdgeWalletInfo } from 'edge-core-js'

import type {
  EdgeUserInfos,
  EdgeWalletInfos,
  EthererumTransaction
} from '../edge-types.js'

export { makeEdgeUiContext } from './client-context.js'

// context ------------------------------------------------------------

export type EdgeUiContextCallbacks = {
  +onError?: (e: Error) => mixed
}

export type EdgeUiContextOptions = {
  apiKey: string,
  appId: string,
  assetsPath?: string,
  callbacks?: EdgeUiContextCallbacks,
  hideKeys?: boolean,
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

  localUsers: EdgeUserInfos,
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
  walletInfos: EdgeWalletInfos,
  createWallet(type: string, keys: {}): Promise<string>,
  getFirstWalletInfo(type: string): EdgeWalletInfo | null,

  // Currency wallets:
  createCurrencyWallet(type: string): Promise<mixed>,

  // Temporary solution for Ethereum apps, pending proper wallet API:
  signEthereumTransaction(
    walletId: string,
    transaction: EthererumTransaction
  ): Promise<string>
}
