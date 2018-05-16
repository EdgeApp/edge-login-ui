// @flow

import type { EdgeWalletInfo } from 'edge-core-js'

import type { EthererumTransaction } from '../edge-types.js'
import type { ClientState } from './client-state.js'
import { showFrame } from './iframe.js'
import type { EdgeManageWindowOptions, EdgeUiAccount } from './index.js'

/**
 * Returns a context API object with all the required methods.
 */
export function makeAccountApi (
  state: ClientState,
  accountId: string
): EdgeUiAccount {
  const account = state.accounts[accountId]

  return {
    get appId () {
      return state.appId
    },
    get username () {
      return account.username
    },

    // Lifetime:
    logout () {
      delete state.accounts[accountId]
      state.frameDispatch({ type: 'logout', payload: { accountId } })
    },

    // Account credentials:
    openManageWindow (opts: EdgeManageWindowOptions = {}) {
      state.onClose = opts.onClose
      return state
        .frameDispatch({
          type: 'open-manage-window',
          payload: { accountId }
        })
        .then(() => showFrame(state.frame))
    },

    // All wallet infos:
    get walletInfos () {
      return account.walletInfos
    },

    createWallet (type: string, keys: {}): Promise<string> {
      return state
        .createWallet(accountId, type, keys)
        .then(({ walletId, walletInfos }) => {
          account.walletInfos = walletInfos
          return walletId
        })
    },

    getFirstWalletInfo (type: string): EdgeWalletInfo | null {
      for (const walletId of Object.keys(account.walletInfos)) {
        const walletInfo = account.walletInfos[walletId]
        if (walletInfo.type === type) return walletInfo
      }
      return null
    },

    createCurrencyWallet (type: string): Promise<mixed> {
      return state
        .createCurrencyWallet(accountId, type)
        .then(({ walletId, walletInfos }) => {
          account.walletInfos = walletInfos
          return null // TODO: EdgeCurrencyWallet type
        })
    },

    signEthereumTransaction (
      walletId: string,
      transaction: EthererumTransaction
    ): Promise<string> {
      return state.signEthereumTransaction(accountId, walletId, transaction)
    },

    // Deprecated stuff:
    getFirstWallet (type: string) {
      console.warn('EdgeUiAccount.getFirstWallet is deprecated')
      return this.getFirstWalletInfo(type)
    }
  }
}
