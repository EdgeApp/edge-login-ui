// @flow

import 'edge-login-ui-react/lib/styles.css'

import type { EdgeAccount } from 'edge-core-js'
import { AccountScreen, LoginScreen } from 'edge-login-ui-react'
import React, { Component } from 'react'
import { render } from 'react-dom'

import { getLocalUsers, getWalletInfos } from './frame-selectors.js'
import type { FrameState } from './frame-state.js'

type ViewProps = {
  state: FrameState
}

/**
 * The top-level React component in the frame.
 * Shows the appropriate scene based on the current state.
 */
class View extends Component<ViewProps> {
  accountOptions = {
    callbacks: {}
  }

  onClose = () => {
    this.props.state.page = ''
    this.forceUpdate()
    this.props.state.clientDispatch({ type: 'close' })
  }

  onError = (e: Error) => {
    this.props.state.clientDispatch({ type: 'error', payload: e })
  }

  onLogin = (account: EdgeAccount) => {
    const { state } = this.props
    const accountId = `account${state.nextAccountId++}`
    state.accounts[accountId] = account
    const username = account.username
    const localUsers = getLocalUsers(state)
    const walletInfos = getWalletInfos(state, accountId)

    return state.clientDispatch({
      type: 'login',
      payload: { accountId, username, localUsers, walletInfos }
    })
  }

  render () {
    const { state } = this.props

    if (state.page === 'login') {
      return (
        <LoginScreen
          accountOptions={this.accountOptions}
          context={state.context}
          onClose={this.onClose}
          onError={this.onError}
          onLogin={this.onLogin}
          vendorImageUrl={state.vendorImageUrl}
          vendorName={state.vendorName}
        />
      )
    }

    if (state.page === 'account' && state.pageAccount) {
      return (
        <AccountScreen
          account={state.pageAccount}
          context={state.context}
          onClose={this.onClose}
          onError={this.onError}
          vendorImageUrl={state.vendorImageUrl}
          vendorName={state.vendorName}
        />
      )
    }

    return null
  }
}

/**
 * Refresh the HTML in response to state changes.
 */
export function updateView (state: FrameState) {
  const root = document.getElementById('app')
  if (root) render(<View state={state} />, root)
}
