// @flow

import type { EdgeUiContext } from 'edge-login-ui-web'
import React from 'react'
import ReactJson from 'react-json-view'

export function ContextInfo (props: { context: EdgeUiContext }) {
  const { context } = props

  return (
    <div>
      <h1>Edge Context</h1>
      <ReactJson
        displayDataTypes={false}
        displayObjectSize={false}
        name="localUsers"
        src={context.localUsers}
      />
    </div>
  )
}
