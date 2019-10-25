// @flow

import 'normalize.css'
import './styles/globals.scss'
import './polyfill.js'

import type { EdgeAccount, EdgeAccountOptions, EdgeContext } from 'edge-core-js'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import type { Store } from 'redux'

import { hackWindow } from './hackWindow.js'
import createStore from './lib/configureStore'
import Router from './routes.js'

export type LoginScreenProps = {
  // fontDescription: any,
  // recoveryLogin: boolean,
  // username: string,
  accountOptions: EdgeAccountOptions,
  context: EdgeContext,
  onClose(): mixed,
  onError(e: Error): mixed,
  onLogin(account: EdgeAccount): mixed,
  vendorImageUrl: string,
  vendorName: string
}

export class LoginScreen extends Component<LoginScreenProps> {
  store: Store<Object>

  constructor(props: LoginScreenProps) {
    super(props)
    hackWindow(
      null,
      props.accountOptions,
      props.context,
      props.onClose,
      props.onError,
      props.onLogin,
      props.vendorImageUrl,
      props.vendorName
    )
    this.store = createStore()
  }

  render() {
    return (
      <Provider store={this.store} key="login">
        <Router defaultPage="/login" />
      </Provider>
    )
  }
}

export type AccountScreenProps = {
  // fontDescription: any,
  account: EdgeAccount,
  context: EdgeContext,
  onClose(): mixed,
  onError(e: Error): mixed,
  vendorImageUrl: string,
  vendorName: string
}

export class AccountScreen extends Component<AccountScreenProps> {
  store: Store<Object>

  constructor(props: AccountScreenProps) {
    super(props)
    hackWindow(
      props.account,
      null,
      props.context,
      props.onClose,
      props.onError,
      null,
      props.vendorImageUrl,
      props.vendorName
    )
    this.store = createStore()
  }

  render() {
    return (
      <Provider store={this.store} key="account">
        <Router defaultPage="/account" />
      </Provider>
    )
  }
}
