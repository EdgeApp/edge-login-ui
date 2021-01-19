// @flow

import { makeReactNativeFolder } from 'disklet'
import { type EdgeAccountOptions, type EdgeContext } from 'edge-core-js'
import * as React from 'react'

import { initializeLogin } from '../../actions/LoginInitActions.js'
import { updateFontStyles } from '../../constants/Fonts.js'
import { type OnLogin } from '../../types/ReduxTypes.js'
import { Router } from '../navigation/Router.js'
import { Airship } from '../services/AirshipInstance.js'
import { ReduxStore } from '../services/ReduxStore.js'
import { changeFont } from '../services/ThemeContext.js'

type Props = {
  accountOptions: EdgeAccountOptions,
  appId?: string,
  appName?: string,
  backgroundImage?: any,
  context: EdgeContext,
  fontDescription?: { regularFontFamily: string },
  landingScreenText?: string,
  onLogin: OnLogin,
  parentButton?: Object,
  primaryLogo?: any,
  primaryLogoCallback?: () => void,
  recoveryLogin?: string,
  username?: string
}

export class LoginScreen extends React.Component<Props> {
  cleanups: Array<() => mixed>

  constructor(props: Props) {
    super(props)

    const { fontDescription = {} } = this.props
    const { regularFontFamily } = fontDescription
    changeFont(regularFontFamily)
    updateFontStyles(regularFontFamily)

    this.cleanups = []
  }

  componentDidMount() {
    // Completed Edge login:
    this.cleanups = [
      this.props.context.on('login', account => {
        Airship.clear()
        this.props.onLogin(null, account)
      }),
      this.props.context.on('loginStart', ({ username }) => {
        // Show spinner for Edge login starting
      }),
      this.props.context.on('loginError', ({ error }) => {
        this.props.onLogin(error)
      })
    ]
  }

  componentWillUnmount() {
    for (const cleanup of this.cleanups) cleanup()
  }

  render() {
    return (
      <ReduxStore
        imports={{
          accountOptions: this.props.accountOptions,
          context: this.props.context,
          folder: makeReactNativeFolder(),
          onComplete: () => {},
          onLogin: this.props.onLogin,
          recoveryKey: this.props.recoveryLogin,
          username: this.props.username
        }}
        initialAction={initializeLogin()}
      >
        <Router
          branding={{
            appId: this.props.appId,
            appName: this.props.appName,
            backgroundImage: this.props.backgroundImage,
            landingScreenText: this.props.landingScreenText,
            parentButton: this.props.parentButton,
            primaryLogo: this.props.primaryLogo,
            primaryLogoCallback: this.props.primaryLogoCallback
          }}
          showHeader
        />
      </ReduxStore>
    )
  }
}
