// @flow
// These are extra Edge types that could eventually migrate to the core.

import type { EdgeWalletInfo } from 'edge-core-js'

export type EdgeUserInfo = {
  hasPin: boolean,
  username: string
}

export type EdgeUserInfos = { [username: string]: EdgeUserInfo }

export type EdgeWalletInfos = { [walletId: string]: EdgeWalletInfo }

export type EthererumTransaction = {
  chainId: number, // Not part of raw data, but needed for signing
  nonce: string,
  gasPrice: string,
  gasLimit: string,
  to: string,
  value: string,
  data: string,
  // The transaction is unsigned, so these are not present:
  v?: string,
  r?: string,
  s?: string
}
