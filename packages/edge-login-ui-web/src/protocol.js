// @flow

import type { EdgeWalletInfo } from 'edge-core-js'

// We need this until post-robot ships with its own types:
export type PostRobotEvent<Data> = {
  data: Data,
  origin: string,
  source: Object
}

// client -------------------------------------------------------------------

/** The current window was closed. */
export type ClientClose = {
  type: 'close'
}

/** Something went wrong. */
export type ClientError = {
  type: 'error',
  payload: Error
}

/** The user logged in. */
export type ClientLogin = {
  type: 'login',
  payload: {
    accountId: string,
    username: string,
    walletInfos: { [walletId: string]: EdgeWalletInfo }
  }
}

/** The user added, removed, or edited their wallet list. */
export type ClientWalletListChanged = {
  type: 'wallet-list-changed',
  payload: {
    accountId: string,
    walletInfos: { [walletId: string]: EdgeWalletInfo }
  }
}

export type ClientMessage =
  | ClientClose
  | ClientError
  | ClientLogin
  | ClientWalletListChanged

// frame --------------------------------------------------------------------

export type FrameLogout = {
  type: 'logout',
  payload: {
    accountId: string
  }
}

export type FrameOpenLoginWindow = {
  type: 'open-login-window'
}

export type FrameOpenManageWindow = {
  type: 'open-manage-window',
  payload: {
    accountId: string
  }
}

export type FrameMessage =
  | FrameLogout
  | FrameOpenLoginWindow
  | FrameOpenManageWindow

// connection ---------------------------------------------------------------

export type ClientDispatch = (message: ClientMessage) => mixed
export type FrameDispatch = (message: FrameMessage) => mixed

/** The client sends this to connect to the iframe. */
export type ConnectionMessage = {
  apiKey: string,
  appId: string,
  vendorName?: string,
  vendorImageUrl?: string,

  clientDispatch: ClientDispatch
}

export type ConnectionReply = {
  // We can add other API methods here...

  frameDispatch: FrameDispatch
}
