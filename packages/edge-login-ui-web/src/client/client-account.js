// @flow

import type { ClientState } from './client-state.js'
import { showFrame } from './iframe.js'
import type {
  EdgeManageWindowOptions,
  EdgeUiAccount,
  EdgeWalletInfo
} from './index.js'

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
    createWallet (): Promise<EdgeWalletInfo> {
      throw new Error('not implemented')
    }
  }
}
