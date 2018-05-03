// @flow

import type { EdgeAccount, EdgeContext, EdgeContextOptions } from 'edge-core-js'
import { makeContext } from 'edge-core-js'
import postRobot from 'post-robot'

import type {
  ClientDispatch,
  ConnectionMessage,
  ConnectionReply,
  FrameMessage,
  PostRobotEvent
} from '../protocol.js'
import { getLocalUsers, getWalletInfos } from './frame-selectors.js'
import { updateView } from './View.js'

/**
 * Hacking around incorrect environment detection in the core.
 */
function makeEdgeContext (opts: EdgeContextOptions) {
  return Promise.resolve(makeContext(opts))
}

/**
 * The state the client stores.
 */
export type FrameState = {
  accounts: { [accountId: string]: EdgeAccount },
  context: EdgeContext,
  hideKeys: boolean,
  nextAccountId: number,
  page: '' | 'login' | 'account',
  pageAccount: EdgeAccount | null,
  vendorImageUrl: string,
  vendorName: string,

  // Frame callbacks:
  clientDispatch: ClientDispatch
}

function frameDispatch (state: FrameState, message: FrameMessage) {
  switch (message.type) {
    case 'logout': {
      const { accountId } = message.payload
      if (!state.accounts[accountId]) throw new Error('Invalid accountId')

      state.accounts[accountId].logout()
      delete state.accounts[accountId]
      return
    }

    case 'open-login-window': {
      state.page = 'login'
      state.pageAccount = null
      updateView(state)
      return
    }

    case 'open-manage-window': {
      const { accountId } = message.payload
      if (!state.accounts[accountId]) throw new Error('Invalid accountId')

      state.page = 'account'
      state.pageAccount = state.accounts[accountId]
      updateView(state)
      return
    }
  }

  throw new Error('Unknown frame message')
}

/**
 * Creates the initial frame state object.
 */
async function makeFrameState (opts: ConnectionMessage): Promise<FrameState> {
  const {
    apiKey,
    appId,
    hideKeys,
    vendorName = '',
    vendorImageUrl = '',
    clientDispatch
  } = opts
  const context = await makeEdgeContext({ apiKey, appId })

  return {
    accounts: {},
    context,
    hideKeys,
    nextAccountId: 0,
    page: '',
    pageAccount: null,
    vendorImageUrl,
    vendorName,

    clientDispatch
  }
}

export function awaitConnection () {
  return postRobot.on(
    'connect',
    async (
      event: PostRobotEvent<ConnectionMessage>
    ): Promise<ConnectionReply> => {
      const state = await makeFrameState(event.data)
      updateView(state)
      const localUsers = await getLocalUsers(state)

      return {
        localUsers,

        createWallet (accountId: string, type: string, keys: {}) {
          return state.accounts[accountId]
            .createWallet(type, keys)
            .then(walletId => {
              const walletInfos = getWalletInfos(state, accountId)
              return { walletId, walletInfos }
            })
        },

        frameDispatch (message: FrameMessage) {
          return frameDispatch(state, message)
        }
      }
    }
  )
}
