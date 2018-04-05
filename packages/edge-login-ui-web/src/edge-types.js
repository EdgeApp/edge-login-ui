// @flow
// These are extra Edge types that could eventually migrate to the core.

import type { EdgeWalletInfo } from 'edge-core-js'

export type EdgeUserInfo = {
  hasPin: boolean,
  username: string
}

export type EdgeUserInfos = { [username: string]: EdgeUserInfo }

export type EdgeWalletInfos = { [walletId: string]: EdgeWalletInfo }
