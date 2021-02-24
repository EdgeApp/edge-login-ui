// @flow

import type { EdgeUiContext } from 'edge-login-ui-web'
import React, { Component } from 'react'

type Props = {
  context: EdgeUiContext | void
}

export class WelcomeButtons extends Component<Props> {
  handleLoginWindow = () => {
    if (this.props.context) {
      this.props.context.showLoginWindow()
    }
  }

  render() {
    return (
      <p id="buttons">
        <button disabled={!this.props.context} onClick={this.handleLoginWindow}>
          Login With Edge
        </button>
      </p>
    )
  }
}
