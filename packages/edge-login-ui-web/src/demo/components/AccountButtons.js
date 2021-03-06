// @flow

import type { EdgeAccount } from 'edge-core-js'
import type { EdgeUiContext } from 'edge-login-ui-web'
import React, { Component } from 'react'

type Props = {
  account: EdgeAccount,
  context: EdgeUiContext,
  onLogout: () => mixed
}

export class AccountButtons extends Component<Props> {
  handleManageWindow = () => {
    this.props.context.showAccountSettingsWindow(this.props.account)
  }

  render() {
    return (
      <p id="buttons">
        <button onClick={this.handleManageWindow}>Manage Settings</button>
        <button className="secondary" onClick={this.props.onLogout}>
          Logout
        </button>
      </p>
    )
  }
}
