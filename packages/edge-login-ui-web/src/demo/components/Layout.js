// @flow

import type { EdgeUiAccount, EdgeUiContext } from 'edge-login-ui-web'
import React from 'react'

import { AccountButtons } from './AccountButtons.js'
import { AccountInfo } from './AccountInfo.js'
import { ContextInfo } from './ContextInfo.js'
import { WelcomeButtons } from './WelcomeButtons.js'

// Props and state for the root component:
export type LayoutProps = {
  account: EdgeUiAccount | void,
  context: EdgeUiContext | void,
  onLogin: (account: EdgeUiAccount) => mixed,
  onLogout: () => mixed
}

/**
 * The top-level component in the demo.
 * Manages the edge context and app state, switching between screens as needed.
 */
export function Layout (props: LayoutProps) {
  const { account, context, onLogout, onLogin } = props

  return (
    <div id="page">
      <div id="header">Edge Login Demo</div>
      {account ? (
        <AccountButtons account={account} onLogout={onLogout} />
      ) : (
        <WelcomeButtons context={context} onLogin={onLogin} />
      )}
      <div id="content">
        {account != null ? <AccountInfo account={account} /> : null}
        {context != null ? <ContextInfo context={context} /> : null}
      </div>
    </div>
  )
}
