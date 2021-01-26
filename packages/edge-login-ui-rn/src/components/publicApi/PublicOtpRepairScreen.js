// @flow

import { type EdgeAccount, type EdgeContext, OtpError } from 'edge-core-js'
import * as React from 'react'

import { Router } from '../navigation/Router.js'
import { showError } from '../services/AirshipInstance.js'
import { ReduxStore } from '../services/ReduxStore.js'

type Props = {
  account: EdgeAccount,
  context: EdgeContext,
  onComplete(): void,
  otpError: OtpError
}

export class OtpRepairScreen extends React.Component<Props> {
  cleanups: Array<() => mixed>

  componentDidMount() {
    const { context, onComplete } = this.props

    // Completed Edge login:
    this.cleanups = [
      context.on('login', account => {
        onComplete()
      }),
      context.on('loginError', ({ error }) => {
        showError(error)
      })
    ]
  }

  componentWillUnmount() {
    for (const cleanup of this.cleanups) cleanup()
  }

  render() {
    const { account, context, onComplete, otpError } = this.props

    return (
      <ReduxStore
        imports={{
          accountOptions: {},
          context,
          onComplete
        }}
        initialAction={{
          type: 'START_OTP_REPAIR',
          data: { account, error: otpError }
        }}
      >
        <Router branding={{}} showHeader />
      </ReduxStore>
    )
  }
}
