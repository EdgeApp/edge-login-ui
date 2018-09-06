// @flow

import type { EdgeAccount } from 'edge-login-ui-web'
import React from 'react'
import ReactJson from 'react-json-view'

import { Wallet } from './Wallet.js'

export function AccountInfo (props: { account: EdgeAccount }) {
  const { account } = props

  return (
    <div>
      <h1>Edge Account</h1>
      <p>You are logged in as &quot;{account.username}&quot;.</p>
      {Object.keys(account.currencyWallets).map(id => (
        <Wallet
          account={account}
          key={id}
          wallet={account.currencyWallets[id]}
        />
      ))}
      <h2>All Wallet Infos</h2>
      <ReactJson
        collapsed={2}
        displayDataTypes={false}
        displayObjectSize={false}
        name="walletInfos"
        src={account.allKeys}
      />
    </div>
  )
}
