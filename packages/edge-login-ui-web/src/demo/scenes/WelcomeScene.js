// @flow

import type { EdgeUiAccount, EdgeUiContext } from 'edge-login-ui-web'
import React, { Component } from 'react'

export type WelcomeProps = {
  context: EdgeUiContext | void,
  onLogin: (account: EdgeUiAccount) => mixed
}

export class WelcomeScene extends Component<WelcomeProps> {
  openLoginWindow = () => {
    if (this.props.context) {
      this.props.context.openLoginWindow({ onLogin: this.props.onLogin })
    }
  }

  render () {
    return (
      <div id="content">
        <p className="center">
          <button disabled={!this.props.context} onClick={this.openLoginWindow}>
            Login With Edge
          </button>
        </p>
      </div>
    )
  }
}
