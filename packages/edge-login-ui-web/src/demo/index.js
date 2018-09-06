// @flow

import 'regenerator-runtime/runtime'

import type { EdgeAccount, EdgeUiContext } from 'edge-login-ui-web'
import React, { Component } from 'react'
import { render } from 'react-dom'

import { Layout } from './components/Layout.js'
import { prepareAccount, prepareContext } from './edgeHelpers.js'
import { restoreCachedState } from './hmrCache.js'

// Props and state for the root component:
export type RootProps = {}
export type RootState = {
  account: EdgeAccount | void,
  context: EdgeUiContext | void
}

/**
 * The top-level component in the demo.
 * Manages the edge context and login state.
 */
class Root extends Component<RootProps, RootState> {
  constructor (props: RootProps) {
    super(props)

    // Just use the previous state if the page live-reloads:
    if (restoreCachedState(module, this)) return

    // Create a context object:
    this.state = { account: void 0, context: void 0 }
    prepareContext().then(context => {
      context.on('login', async account => {
        try {
          // Make sure the account has the keys we need:
          await prepareAccount(account)
          this.setState({ account })
        } catch (e) {
          console.error(e)
        }
      })
      this.setState({ context })
    })
  }

  onLogout = () => {
    if (this.state.account) this.state.account.logout()
    this.setState({ account: void 0 })
  }

  render () {
    return (
      <Layout
        account={this.state.account}
        context={this.state.context}
        onLogout={this.onLogout}
      />
    )
  }
}

// Render the main component to the document body:
const root = document.getElementById('app')
if (root) render(<Root />, root)
