import * as React from 'react'

import { asOptionalTheme, Theme } from '../../types/Theme'
import { Airship } from '../services/AirshipInstance'
import { changeTheme, getTheme, ThemeProvider } from '../services/ThemeContext'

/**
 * We use this context to determine if `LoginUiProvider` is mounted.
 */
const loginUiContext = React.createContext(false)

interface Props {
  overrideTheme?: Theme
  children: React.ReactNode
}

/**
 * Provides modals and other services for the login UI.
 * In the future, this will be our injection point for branding &
 * theme customizations.
 */
export function LoginUiProvider(props: Props): JSX.Element {
  if (props.overrideTheme != null) {
    // Error check the theme but don't use the return value as the cleaner sets missing parameters
    // to undefined which stomps on top of the oldTheme
    asOptionalTheme(props.overrideTheme)

    const overrideTheme = props.overrideTheme
    const oldTheme = getTheme()
    const tsHackTheme: any = { ...oldTheme, ...overrideTheme }
    const newTheme: Theme = tsHackTheme

    if (JSON.stringify(oldTheme) !== JSON.stringify(newTheme)) {
      changeTheme(newTheme)
    }
    console.log(`oldTheme`, JSON.stringify(oldTheme, null, 2))
    console.log(`overrideTheme`, JSON.stringify(overrideTheme, null, 2))
    console.log(`newTheme`, JSON.stringify(newTheme, null, 2))
  }

  return (
    <loginUiContext.Provider value>
      <ThemeProvider>
        <Airship>{props.children}</Airship>
      </ThemeProvider>
    </loginUiContext.Provider>
  )
}

export function MaybeProvideLoginUi(props: {
  children: JSX.Element
}): JSX.Element {
  const { children } = props
  const hasProvider = React.useContext(loginUiContext)

  return hasProvider ? children : <LoginUiProvider>{children}</LoginUiProvider>
}
