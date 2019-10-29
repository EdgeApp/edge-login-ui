// @flow

import 'edge-login-ui-react/lib/styles.css'

import type { EdgeAccount, EdgeContext, EdgeUserInfo } from 'edge-core-js'
import { makeEdgeContext } from 'edge-core-js'
import { ethereumCurrencyPluginFactory } from 'edge-currency-ethereum'
import { coincapPlugin, shapeshiftPlugin } from 'edge-exchange-plugins'
import { AccountScreen, LoginScreen } from 'edge-login-ui-react'
import React from 'react'
import { render } from 'react-dom'
import {
  bridgifyObject,
  close,
  emit,
  onMethod,
  update,
  watchMethod
} from 'yaob'

import type { EdgeUiContext, EdgeUiContextOptions } from './index.js'

export async function makeUiContext(opts: EdgeUiContextOptions) {
  const {
    apiKey,
    appId,
    hideKeys = false,
    vendorName = '',
    vendorImageUrl = ''
  } = opts

  // Core context:
  const core: EdgeContext = await makeEdgeContext({
    apiKey,
    appId,
    hideKeys,
    plugins: [ethereumCurrencyPluginFactory, shapeshiftPlugin, coincapPlugin]
  })

  // iframe root:
  const root = document.getElementById('app')
  if (root == null) throw new Error('Cannot find document root')

  // State:
  let localUsers: Array<EdgeUserInfo> = core.localUsers
  let windowVisible = false

  const out: EdgeUiContext = {
    on: onMethod,
    watch: watchMethod,

    get localUsers(): Array<EdgeUserInfo> {
      return localUsers
    },

    get windowVisible(): boolean {
      return windowVisible
    },

    async hideWindow(): Promise<mixed> {
      render(<div />, root)
      windowVisible = false
      update(out)
    },

    async showLoginWindow(): Promise<mixed> {
      render(
        <LoginScreen
          accountOptions={{}}
          context={core}
          onClose={() => out.hideWindow()}
          onError={e => emit(out, 'error', e)}
          onLogin={account => emit(out, 'login', account)}
          vendorImageUrl={vendorImageUrl}
          vendorName={vendorName}
        />,
        root
      )
      windowVisible = true
      update(out)
    },

    async showAccountSettingsWindow(account: EdgeAccount): Promise<mixed> {
      render(
        <AccountScreen
          account={account}
          context={core}
          onClose={() => out.hideWindow()}
          onError={e => emit(out, 'error', e)}
          vendorImageUrl={vendorImageUrl}
          vendorName={vendorName}
        />,
        root
      )
      windowVisible = true
      update(out)
    },

    close() {
      if (unsubscribeLocalUsers != null) unsubscribeLocalUsers()
      out.hideWindow()
      close(out)
    }
  }
  bridgifyObject(out)

  // Subscribe:
  const unsubscribeLocalUsers = core.watch('localUsers', users => {
    localUsers = users
    update(out)
  })

  return out
}
