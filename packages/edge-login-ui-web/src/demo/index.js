// @flow

import 'regenerator-runtime/runtime'

import type { EdgeUiAccount, EdgeUiContext } from 'edge-login-ui-web'
import React, { Component } from 'react'
import { render } from 'react-dom'

import { Layout } from './components/Layout.js'
import { prepareAccount, prepareContext } from './edgeHelpers.js'
import { restoreCachedState } from './hmrCache.js'

// Props and state for the root component:
export type RootProps = {}
export type RootState = {
  account: EdgeUiAccount | void,
  context: EdgeUiContext | void
}

/**
 * The top-level component in the demo.
 * Manages the edge context and login state.
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
  onLogin = async (account: EdgeUiAccount) => {
    // Make sure the account has the keys we need before finishing the login:
    await prepareAccount(account)

    this.setState({ account })
  }
  onLogout = () => {
    this.setState({ account: void 0 })
  }

  render () {
    return (
      <Layout
        account={this.state.account}
        context={this.state.context}
        onLogin={this.onLogin}
        onLogout={this.onLogout}
      />
    )
  }
}

// Render the main component to the document body:
const root = document.getElementById('app')
if (root) render(<Root />, root)
