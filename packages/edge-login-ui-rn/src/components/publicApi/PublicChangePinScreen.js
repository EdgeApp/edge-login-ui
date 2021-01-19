// @flow

import { makeReactNativeFolder } from 'disklet'
import { type EdgeAccount, type EdgeContext } from 'edge-core-js'
import * as React from 'react'

import { Router } from '../navigation/Router.js'
import { ReduxStore } from '../services/ReduxStore.js'

type Props = {
  account: EdgeAccount,
  context: EdgeContext,
  showHeader?: boolean,
  onComplete(): void
}

export function ChangePinScreen(props: Props): React.Node {
  const { account, context, onComplete, showHeader = false } = props

  return (
    <ReduxStore
      imports={{
        accountOptions: {},
        callback: () => {},
        context,
        folder: makeReactNativeFolder(),
        onComplete
      }}
      initialAction={{
        type: 'START_CHANGE_PIN',
        data: account
      }}
    >
      <Router branding={{}} showHeader={showHeader} />
    </ReduxStore>
  )
}
