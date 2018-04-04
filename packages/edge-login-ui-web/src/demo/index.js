// @flow

import type { EdgeUiAccount, EdgeUiContext } from 'edge-login-ui-web'
import { makeEdgeUiContext } from 'edge-login-ui-web'
import React, { Component } from 'react'
import { render } from 'react-dom'

import { AccountScene } from './scenes/AccountScene.js'
import { WelcomeScene } from './scenes/WelcomeScene.js'

export type RootProps = {}
export type RootState = {
  account: EdgeUiAccount | void,
  context: EdgeUiContext | void
}

// Constants:
const apiKey = '0b5776a91bf409ac10a3fe5f3944bf50417209a0' // <- your key here
const appId = 'com.mydomain.myapp'
const vendorName = 'Cloud Chain'
const vendorImageUrl =
  'https://airbitz.co/go/wp-content/uploads/2016/10/GenericEdgeLoginIcon.png'

/**
 * The top-level component in the demo.
 * Manages the edge context and app state, switching between screens as needed.
 */
export class Root extends Component<RootProps, RootState> {
  constructor (props: RootProps) {
    super(props)
    this.state = { account: void 0, context: void 0 }

    const assetsPath = /localhost/.test(window.location)
      ? 'http://localhost:11234/'
      : './iframe/index.html'

    // Create the Edge context:
    makeEdgeUiContext({
      apiKey,
      appId,
      assetsPath,
      frameTimeout: 10000,
      vendorName,
      vendorImageUrl
    }).then(context => {
      this.setState({ context })

      // Close the context if our page reloads during development:
      // $FlowFixMe
      if (module.hot) module.hot.dispose(() => context.dispose())
    })
  }

  // Event handlers:
  onLogin = (account: EdgeUiAccount) => this.setState({ account })
  onLogout = () => this.setState({ account: void 0 })

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
