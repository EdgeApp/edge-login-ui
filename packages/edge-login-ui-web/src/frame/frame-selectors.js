// @flow

import type { EdgeUserInfos, EdgeWalletInfos } from '../edge-types.js'
import type { FrameState } from './frame-state.js'

/**
 * Builds a table of users that are available on this device.
 */
export async function getLocalUsers (state: FrameState): Promise<EdgeUserInfos> {
  const usernames: Array<string> = await state.context.listUsernames()

  const out: EdgeUserInfos = {}
  for (const username of usernames) {
    out[username] = {
      hasPin: await state.context.pinLoginEnabled(username),
      username
    }
  }
  return out
}

/**
 * Grabs the wallet infos out of an account object, sanitizing them as needed.
 */
export function getWalletInfos (
  state: FrameState,
  accountId: string
): EdgeWalletInfos {
  const account = state.accounts[accountId]
  const locked: boolean = false

  const out = {}
  for (const walletInfo of account.allKeys) {
    const { type, id, archived, deleted, sortIndex } = walletInfo
    out[walletInfo.id] = { type, id, archived, deleted, sortIndex }
    if (!locked) {
      out[walletInfo.id].keys = walletInfo.keys
      out[walletInfo.id].appIds = walletInfo.appIds
    }
  }
  return out
}
