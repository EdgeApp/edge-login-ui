// @flow

import { makeReactNativeFolder } from 'disklet'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import type { Store } from 'redux'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import { updateFontStyles } from '../../../common/constants/Fonts'
import reducers from '../../../common/reducers'
import { checkingForOTP } from '../../../common/util/checkingForOTP.js'
import type { Imports } from '../../../types/ReduxTypes'
import LoginAppConnector from '../../connectors/LogInAppConnector'
import * as Styles from '../../styles'

type Props = {
  context: any,
  username: ?string,
  recoveryLogin?: string,
  accountOptions: any,
  fontDescription: any,
  onLogin(): void
}

type State = {}
type Action = { type: string }

class LoginScreen extends Component<Props> {
  store: Store<State, Action>

  static defaultProps = {
    username: null,
    recoveryLogin: null,
    accountOptions: null
  }

  constructor (props: Props) {
    super(props)
    checkingForOTP(this.props.context)
    const composeEnhancers =
      typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'core-ui' })
        : compose
    const imports: Imports = {
      context: this.props.context,
      callback: this.props.onLogin,
      onCancel: () => {},
      onComplete: () => {},
      folder: makeReactNativeFolder(),
      accountOptions: this.props.accountOptions,
      username: this.props.username,
      recoveryKey: this.props.recoveryLogin
    }
    this.store = createStore(
      reducers,
      {},
      composeEnhancers(applyMiddleware(thunk.withExtraArgument(imports)))
    )
  }
  componentWillMount () {
    updateFontStyles(this.props) // Can we move this to the constructor?
  }

  render () {
    return (
      <Provider store={this.store}>
        <LoginAppConnector
          context={this.props.context}
          onLogin={this.props.onLogin}
          recoveryLogin={this.props.recoveryLogin}
          styles={Styles}
        />
      </Provider>
    )
  }
}

export { LoginScreen }
