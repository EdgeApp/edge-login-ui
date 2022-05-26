import { EdgeAccount, EdgeContext, OtpError } from 'edge-core-js'
import * as React from 'react'

import { useClearOnUnmount } from '../../hooks/useClearOnUnmount'
import { Branding } from '../../types/Branding'
import { Router } from '../navigation/Router'
import { ReduxStore } from '../services/ReduxStore'

interface Props {
  account: EdgeAccount
  branding: Branding
  context: EdgeContext
  onComplete: () => void
  otpError: OtpError
}

export function OtpRepairScreen(props: Props): JSX.Element {
  const { account, branding, context, onComplete, otpError } = props
  useClearOnUnmount()

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
      <Router branding={branding} showHeader />
    </ReduxStore>
  )
}
