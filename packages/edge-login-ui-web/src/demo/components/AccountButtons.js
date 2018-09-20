// @flow

import type { EdgeAccount, EdgeUiContext } from 'edge-login-ui-web'
import React, { Component } from 'react'

export type AccountButtonsProps = {
  account: EdgeAccount,
  context: EdgeUiContext,
  onLogout: () => mixed
}

export class AccountButtons extends Component<AccountButtonsProps> {
  openManageWindow = () => {
    this.props.context.showAccountSettingsWindow(this.props.account)
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
