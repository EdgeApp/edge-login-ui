// @flow

import * as React from 'react'
// $FlowFixMe
import { useContext } from 'react'

import { Airship } from '../services/AirshipInstance.js'

/**
 * We use this context to determine if `LoginUiProvider` is mounted.
 */
const loginUiContext = React.createContext(false)

type Props = {
  children: React.Node
}

/**
 * Provides modals and other services for the login UI.
 * In the future, this will be our injection point for branding &
 * theme customizations.
 */
export function LoginUiProvider(props: Props): React.Node {
  return (
    <loginUiContext.Provider value>
      <Airship>{props.children}</Airship>
    </loginUiContext.Provider>
  )
}

export function MaybeProvideLoginUi(props: {
  children: React.Node
}): React.Node {
  const { children } = props
  const hasProvider = useContext(loginUiContext)

  return hasProvider ? children : <LoginUiProvider>{children}</LoginUiProvider>
}
