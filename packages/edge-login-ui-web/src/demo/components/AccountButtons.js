// @flow

import type { EdgeAccount } from 'edge-core-js/types'
import type { EdgeUiContext } from 'edge-login-ui-web'
import React, { Component } from 'react'

type Props = {
  account: EdgeAccount,
  context: EdgeUiContext,
  onLogout: () => mixed
}

export class AccountButtons extends Component<Props> {
  openManageWindow = () => {
    this.props.context.showAccountSettingsWindow(this.props.account)
  }

  render() {
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
