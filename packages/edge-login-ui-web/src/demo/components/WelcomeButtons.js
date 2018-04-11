// @flow

import type { EdgeUiAccount, EdgeUiContext } from 'edge-login-ui-web'
import React, { Component } from 'react'

export type WelcomeButtonProps = {
  context: EdgeUiContext | void,
  onLogin: (account: EdgeUiAccount) => mixed
}

export class WelcomeButtons extends Component<WelcomeButtonProps> {
  openLoginWindow = () => {
    if (this.props.context) {
      this.props.context.openLoginWindow({ onLogin: this.props.onLogin })
    }
  }

  render () {
    return (
      <p id="buttons">
        <button disabled={!this.props.context} onClick={this.openLoginWindow}>
          Login With Edge
        </button>
      </p>
    )
  }
}
