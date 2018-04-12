// @flow

import type { EdgeUiAccount } from 'edge-login-ui-web'
import React, { Component } from 'react'

export type AccountButtonsProps = {
  account: EdgeUiAccount,
  onLogout: () => mixed
}

export class AccountButtons extends Component<AccountButtonsProps> {
  openManageWindow = () => {
    this.props.account.openManageWindow({})
  }

  render () {
    return (
      <p id="buttons">
        <button onClick={this.openManageWindow}>Manage Settings</button>
        <button className="secondary" onClick={this.props.onLogout}>
          Logout
        </button>
      </p>
    )
  }
}
