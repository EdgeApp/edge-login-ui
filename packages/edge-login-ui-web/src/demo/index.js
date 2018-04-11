// @flow

import type { EdgeUiAccount, EdgeUiContext } from 'edge-login-ui-web'
import React, { Component } from 'react'
import { render } from 'react-dom'

import { prepareContext } from './edgeHelpers.js'
import { restoreCachedState } from './hmrCache.js'
import { AccountScene } from './scenes/AccountScene.js'
import { WelcomeScene } from './scenes/WelcomeScene.js'

// Props and state for the root component:
export type RootProps = {}
export type RootState = {
  account: EdgeUiAccount | void,
  context: EdgeUiContext | void
}

/**
 * The top-level component in the demo.
 * Manages the edge context and app state, switching between screens as needed.
 */
class Root extends Component<RootProps, RootState> {
  constructor (props: RootProps) {
    super(props)

    // Create the Edge context on the initial page load:
    if (!restoreCachedState(module, this)) {
      this.state = { account: void 0, context: void 0 }
      prepareContext().then(context => this.setState({ context }))
    }
  }

  // Event handlers:
  onLogin = (account: EdgeUiAccount) => {
    this.setState({ account })
  }
  onLogout = () => {
    this.setState({ account: void 0 })
  }

  render () {
    // Select the appropriate screen to render based on login state:
    const scene =
      this.state.account && this.state.context ? (
        <AccountScene
          context={this.state.context}
          account={this.state.account}
          onLogout={this.onLogout}
        />
      ) : (
        <WelcomeScene context={this.state.context} onLogin={this.onLogin} />
      )

    return (
      <div id="page">
        <div id="header">Edge Login Demo</div>
        {scene}
      </div>
    )
  }
}

// Render the main component to the document body:
const root = document.getElementById('app')
if (root) render(<Root />, root)
