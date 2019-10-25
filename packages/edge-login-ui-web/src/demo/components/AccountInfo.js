// @flow

import type { EdgeAccount } from 'edge-core-js'
import React from 'react'
import ReactJson from 'react-json-view'

type Props = {
  account: EdgeAccount
}

export function AccountInfo(props: Props) {
  const { account } = props

  return (
    <div>
      <h1>Account</h1>
      <p>You are logged in as &quot;{account.username}&quot;.</p>
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
