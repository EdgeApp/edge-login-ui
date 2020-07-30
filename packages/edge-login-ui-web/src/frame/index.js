// @flow

import 'regenerator-runtime/runtime'

import type { EdgeAccount, EdgeUserInfo } from 'edge-core-js'
import type { Subscriber } from 'yaob'

import { sendRoot } from './root-api.js'

sendRoot()

// EdgeUiContext ------------------------------------------------------

export type EdgeUiContextOptions = {
  apiKey: string,
  appId: string,
  assetsPath?: string,
  hideKeys?: boolean,
  vendorImageUrl?: string,
  vendorName?: string,

  // This is a temporary solution, which will be replaced at the next
  // edge-core-js version upgrade. At that point, this will change to:
  // plugins: { ethereum: { etherscanApiKey: string[] } }
  etherscanApiKey?: string
}

export type EdgeUiContextEvents = {
  login: EdgeAccount
}

export type EdgeUiContext = {
  +on: Subscriber<EdgeUiContextEvents>,
  +watch: Subscriber<EdgeUiContext>,

  +localUsers: Array<EdgeUserInfo>,

  +windowVisible: boolean,
  hideWindow(): Promise<mixed>,
  showLoginWindow(): Promise<mixed>,
  showAccountSettingsWindow(account: EdgeAccount): Promise<mixed>,

  close(): mixed
}

export type BridgeRoot = {
  makeContext(opts: EdgeUiContextOptions): Promise<EdgeUiContext>
}
