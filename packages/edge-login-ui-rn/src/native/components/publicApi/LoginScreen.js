// @flow

import { makeReactNativeFolder } from 'disklet'
import {
  type EdgeAccount,
  type EdgeAccountOptions,
  type EdgeContext
} from 'edge-core-js'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import type { Store } from 'redux'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import { updateFontStyles } from '../../../constants/Fonts.js'
import { type RootState, rootReducer } from '../../../reducers/RootReducer.js'
import { type Action, type Imports } from '../../../types/ReduxTypes.js'
import { checkingForOTP } from '../../../util/checkingForOTP.js'
import { LoginApp } from '../navigation/LogInAppComponent.js'

type Props = {
  accountOptions: EdgeAccountOptions,
  appId?: string,
  appName?: string,
  backgroundImage?: any,
  context: EdgeContext,
  fontDescription: any,
  landingScreenText?: string,
  onLogin(error: ?Error, account: ?EdgeAccount, touchIdInfo: ?Object): void,
  parentButton?: Object,
  primaryLogo?: any,
  primaryLogoCallback?: () => void,
  recoveryLogin?: string,
  username?: string
}

export class LoginScreen extends Component<Props> {
  store: Store<RootState, Action>
  cleanups: Array<Function>

  constructor(props: Props) {
    super(props)
    checkingForOTP(this.props.context)
    const composeEnhancers =
      typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'core-ui' })
        : compose
    const imports: Imports = {
      accountOptions: this.props.accountOptions,
      callback: this.props.onLogin,
      context: this.props.context,
      folder: makeReactNativeFolder(),
      onCancel: () => {},
      onComplete: () => {},
      recoveryKey: this.props.recoveryLogin,
      username: this.props.username
    }
    this.store = createStore(
      rootReducer,
      undefined,
      composeEnhancers(applyMiddleware(thunk.withExtraArgument(imports)))
    )
    this.cleanups = []
  }

  componentDidMount() {
    // Completed Edge login:
    this.cleanups = [
      this.props.context.on('login', account => {
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

  componentWillMount() {
    updateFontStyles(this.props) // Can we move this to the constructor?
  }

  componentWillUnmount() {
    for (const cleanup of this.cleanups) cleanup()
  }

  render() {
    return (
      <Provider store={this.store}>
        <LoginApp
          appId={this.props.appId}
          appName={this.props.appName}
          backgroundImage={this.props.backgroundImage}
          landingScreenText={this.props.landingScreenText}
          parentButton={this.props.parentButton}
          primaryLogo={this.props.primaryLogo}
          primaryLogoCallback={this.props.primaryLogoCallback}
          recoveryLogin={this.props.recoveryLogin}
        />
      </Provider>
    )
  }
}
