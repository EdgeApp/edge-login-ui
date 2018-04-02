// @flow

import type { EdgeUiAccount, EdgeUiContext } from 'edge-login-ui-web'
import React, { Component } from 'react'
import ReactJson from 'react-json-view'

export type AccountProps = {
  account: EdgeUiAccount,
  context: EdgeUiContext,
  onLogout: () => mixed
}

export class AccountScene extends Component<AccountProps> {
  openManageWindow = () => {
    this.props.account.openManageWindow({})
  }

  render () {
    return (
      <div id="content">
        <p className="center">
          <button onClick={this.openManageWindow}>Manage Settings</button>
          <button className="secondary" onClick={this.props.onLogout}>
            Logout
          </button>
        </p>
        <h1>Account Information</h1>
        <p>You are logged in as &quot;{this.props.account.username}&quot;.</p>
        <h2>Keys</h2>
        <ReactJson
          collapsed={2}
          displayDataTypes={false}
          displayObjectSize={false}
          name="walletInfos"
          src={this.props.account.walletInfos}
        />
      </div>
    )
  }
}
