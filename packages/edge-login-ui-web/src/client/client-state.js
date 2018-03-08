// @flow

import postRobot from 'post-robot'

import type {
  ClientMessage,
  ConnectionMessage,
  ConnectionReply,
  FrameMessage,
  PostRobotEvent
} from '../protocol.js'
import { makeAccountApi } from './client-account.js'
import { hideFrame, makeFrame } from './iframe.js'
import type {
  EdgeUiAccount,
  EdgeUiContextOptions,
  EdgeWalletInfo
} from './index.js'

/**
 * The state we store per-account.
 */
export type AccountState = {
  username: string,
  walletInfos: { [walletId: string]: EdgeWalletInfo }
}

/**
 * The state the client stores.
 */
export type ClientState = {
  accounts: { [accountId: string]: AccountState },
  appId: string,
  frame: HTMLIFrameElement,

  // Client callbacks:
  onClose: ?() => mixed,
  onError: (e: Error) => mixed,
  onLogin: ?(account: EdgeUiAccount) => mixed,

  // Frame callbacks:
  frameDispatch: (message: FrameMessage) => Promise<mixed>
}

/**
 * Handles incoming messages from the frame.
 */
function clientDispatch (state: ClientState, message: ClientMessage) {
  switch (message.type) {
    case 'error': {
      state.onError(message.payload)
      return
    }

    case 'close': {
      hideFrame(state.frame)
      if (state.onClose) state.onClose()
      return
    }

    case 'login': {
      const { accountId, username, walletInfos } = message.payload
      state.accounts[accountId] = { username, walletInfos }
      const account = makeAccountApi(state, accountId)

      hideFrame(state.frame)
      if (state.onLogin) state.onLogin(account)
      return
    }

    case 'wallet-list-changed': {
      const { accountId, walletInfos } = message.payload
      state.accounts[accountId].walletInfos = walletInfos
      return
    }
  }

  throw new Error('Unknown client message')
}

function onErrorNop (e: Error) {
  console.error(e)
}

/**
 * Creates the initial client state object.
 */
export function makeClientState (
  opts: EdgeUiContextOptions
): Promise<ClientState> {
  const {
    apiKey,
    appId,
    assetsPath,
    callbacks = {},
    frameTimeout = 5000,
    vendorImageUrl,
    vendorName
  } = opts
  const { onError = onErrorNop } = callbacks

  let state: ClientState
  const message: ConnectionMessage = {
    apiKey,
    appId,
    vendorName,
    vendorImageUrl,
    clientDispatch: message => clientDispatch(state, message)
  }

  // Set up the frame:
  const frame = makeFrame(assetsPath)
  return postRobot
    .send(frame, 'connect', message, { timeout: frameTimeout })
    .then((reply: PostRobotEvent<ConnectionReply>) => {
      const frameDispatch: any = reply.data.frameDispatch
      state = {
        accounts: {},
        appId,
        frame,
        frameDispatch,
        onClose: void 0,
        onError,
        onLogin: void 0
      }
      return state
    })
}
