// @flow

import { type EdgeAccount, type EdgeContext } from 'edge-core-js'
import * as React from 'react'

import { useClearOnUnmount } from '../../hooks/useClearOnUnmount.js'
import { Router } from '../navigation/Router.js'
import { ReduxStore } from '../services/ReduxStore.js'

type Props = {
  account: EdgeAccount,
  context: EdgeContext,
  onComplete(): void
}

export function SecurityAlertsScreen(props: Props): React.Node {
  const { account, context, onComplete } = props
  useClearOnUnmount()

  return (
    <ReduxStore
      imports={{
        accountOptions: {},
        context,
        onComplete
      }}
      initialAction={{
        type: 'START_SECURITY_ALERT',
        data: account
      }}
    >
      <Router branding={{}} showHeader />
    </ReduxStore>
  )
}
