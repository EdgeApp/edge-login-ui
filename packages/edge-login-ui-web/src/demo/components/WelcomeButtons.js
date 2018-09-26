// @flow

import type { EdgeUiContext } from 'edge-login-ui-web'
import React, { Component } from 'react'

export type WelcomeButtonProps = {
  context: EdgeUiContext | void
}

export class WelcomeButtons extends Component<WelcomeButtonProps> {
  openLoginWindow = () => {
    if (this.props.context) {
      this.props.context.showLoginWindow()
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
