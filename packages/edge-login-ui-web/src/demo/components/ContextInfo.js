// @flow

import type { EdgeUiContext } from 'edge-login-ui-web'
import React from 'react'
import ReactJson from 'react-json-view'

type Props = {
  context: EdgeUiContext
}

export function ContextInfo (props: Props) {
  const { context } = props

  return (
    <div>
      <h1>Context</h1>
      <ReactJson
        displayDataTypes={false}
        displayObjectSize={false}
        name="localUsers"
        src={context.localUsers}
      />
    </div>
  )
}
