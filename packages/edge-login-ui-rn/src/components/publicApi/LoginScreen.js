// @flow

import { makeReactNativeFolder } from 'disklet'
import {
  type EdgeAccount,
  type EdgeAccountOptions,
  type EdgeContext
} from 'edge-core-js'
import React, { Component } from 'react'

import { initializeLogin } from '../../actions/LoginInitActions.js'
import { updateFontStyles } from '../../constants/Fonts.js'
import { LoginApp } from '../navigation/LogInAppComponent.js'
import { Airship } from '../services/AirshipInstance.js'
import { ReduxStore } from '../services/ReduxStore.js'
import { changeFont, ThemeProvider } from '../services/ThemeContext.js'

type Props = {
  accountOptions: EdgeAccountOptions,
  appId?: string,
  appName?: string,
  backgroundImage?: any,
  context: EdgeContext,
  fontDescription?: { regularFontFamily: string },
  landingScreenText?: string,
  onLogin(error: ?Error, account: ?EdgeAccount, touchIdInfo: ?Object): void,
  parentButton?: Object,
  primaryLogo?: any,
  primaryLogoCallback?: () => void,
  recoveryLogin?: string,
  username?: string
}

export class LoginScreen extends Component<Props> {
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
          callback: this.props.onLogin,
          context: this.props.context,
          folder: makeReactNativeFolder(),
          onCancel: () => {},
          onComplete: () => {},
          recoveryKey: this.props.recoveryLogin,
          username: this.props.username
        }}
        initialAction={initializeLogin()}
      >
        <ThemeProvider>
          <Airship avoidAndroidKeyboard statusBarTranslucent>
            <LoginApp
              appId={this.props.appId}
              appName={this.props.appName}
              backgroundImage={this.props.backgroundImage}
              landingScreenText={this.props.landingScreenText}
              parentButton={this.props.parentButton}
              primaryLogo={this.props.primaryLogo}
              primaryLogoCallback={this.props.primaryLogoCallback}
            />
          </Airship>
        </ThemeProvider>
      </ReduxStore>
    )
  }
}
