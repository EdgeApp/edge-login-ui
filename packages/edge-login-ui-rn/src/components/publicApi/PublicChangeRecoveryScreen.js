// @flow

import { makeReactNativeFolder } from 'disklet'
import { type EdgeAccount, type EdgeContext } from 'edge-core-js'
import * as React from 'react'

import { initializeChangeRecovery } from '../../actions/PasswordRecoveryActions.js'
import { Router } from '../navigation/Router.js'
import { ReduxStore } from '../services/ReduxStore.js'

type Props = {
  account: EdgeAccount,
  context: EdgeContext,
  showHeader?: boolean,
  onComplete(): void
}

export function PasswordRecoveryScreen(props: Props): React.Node {
  const { account, context, onComplete, showHeader = false } = props

  return (
    <ReduxStore
      imports={{
        accountOptions: {},
        context,
        folder: makeReactNativeFolder(),
        onComplete
      }}
      initialAction={initializeChangeRecovery(account)}
    >
      <Router branding={{}} showHeader={showHeader} />
    </ReduxStore>
  )
}
