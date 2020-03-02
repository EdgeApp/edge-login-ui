// @flow

import 'regenerator-runtime/runtime'

import type { EdgeAccount, EdgeCurrencyWallet } from 'edge-core-js/types'
import type { EdgeUiContext, EdgeUiContextOptions } from 'edge-login-ui-web'
import { makeEdgeUiContext } from 'edge-login-ui-web'
import React, { Component } from 'react'

import { restoreCachedState } from '../hmrCache.js'
import { AccountButtons } from './AccountButtons.js'
import { AccountInfo } from './AccountInfo.js'
import { ContextInfo } from './ContextInfo.js'
import { WalletInfo } from './WalletInfo.js'
import { WelcomeButtons } from './WelcomeButtons.js'

type Props = {}

type State = {
  account: EdgeAccount | void,
  context: EdgeUiContext | void,
  wallet: EdgeCurrencyWallet | void
}

/**
 * The top-level component in the demo.
 * Manages the edge context and login state.
 */
export class Page extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    // Just use the previous state if the page live-reloads:
    if (restoreCachedState(module, this)) return
    this.state = { account: undefined, context: undefined, wallet: undefined }

    // Make the context:
    this.makeEdgeContext()
  }

  /**
   * Creates an EdgeUiContext and saves it in state.
   */
  async makeEdgeContext() {
    // This demo needs some adjustments in development mode:
    const assetsPath = /localhost/.test(window.location)
      ? 'http://localhost:11234/'
      : './iframe/index.html'

    // Customize these constants for your own application:
    const options: EdgeUiContextOptions = {
      apiKey: '0b5776a91bf409ac10a3fe5f3944bf50417209a0',
      appId: 'com.mydomain.myapp',
      assetsPath,
      vendorImageUrl:
        'https://airbitz.co/go/wp-content/uploads/2016/10/GenericEdgeLoginIcon.png',
      vendorName: 'Cloud Chain'
    }

    const context = await makeEdgeUiContext(options)
    this.setState({ context })

    // Sign up to be notified when the context logs in:
    context.on('login', account => this.onLogin(account))
  }

  /**
   * Handles logging in.
   */
  async onLogin(account: EdgeAccount) {
    console.log('Login for', account.username)
    try {
      // Find the app wallet, or create one if necessary:
      const walletInfo = account.getFirstWalletInfo('wallet:ethereum')
      const wallet =
        walletInfo == null
          ? await account.createCurrencyWallet('wallet:ethereum')
          : await account.waitForCurrencyWallet(walletInfo.id)

      this.setState({ account, wallet })
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * Logout button was clicked.
   */
  onLogout = () => {
    if (this.state.account) this.state.account.logout()
    this.setState({ account: undefined, wallet: undefined })
  }

  render() {
    const { account, context, wallet } = this.state

    // Login / logout buttons:
    const buttons =
      account == null || context == null ? (
        <WelcomeButtons context={context} />
      ) : (
        <AccountButtons
          account={account}
          context={context}
          onLogout={this.onLogout}
        />
      )

    // Content area:
    const content = []
    if (wallet != null && account != null) {
      content.push(
        <WalletInfo account={account} wallet={wallet} key="wallet" />
      )
    }
    if (account != null) {
      content.push(<AccountInfo account={account} key="account" />)
    }
    if (context != null) {
      content.push(<ContextInfo context={context} key="context" />)
    }

    return (
      <div id="page">
        <div id="header">Edge Login Demo</div>
        {buttons}
        <div id="content">{content}</div>
      </div>
    )
  }
}
