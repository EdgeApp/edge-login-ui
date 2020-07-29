// @flow

import { makeReactNativeFolder } from 'disklet'
import { type EdgeAccount, type EdgeContext } from 'edge-core-js'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import type { Store } from 'redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import {
  type RootState,
  rootReducer
} from '../../../common/reducers/RootReducer'
import { type Action, type Imports } from '../../../types/ReduxTypes.js'
import { PasswordRecoveryApp } from '../PasswordRecoveryAppComponent.js'

type Props = {
  account: EdgeAccount,
  context: EdgeContext,
  showHeader: boolean,
  onComplete(): void,
  onCancel(): void
}

export class PasswordRecoveryScreen extends Component<Props> {
  store: Store<RootState, Action>

  constructor(props: Props) {
    super(props)
    const imports: Imports = {
      accountOptions: {},
      accountObject: this.props.account,
      context: this.props.context,
      folder: makeReactNativeFolder(),
      onComplete: this.props.onComplete,
      onCancel: this.props.onComplete,
      callback: () => {}
    }
    this.store = createStore(
      rootReducer,
      undefined,
      applyMiddleware(thunk.withExtraArgument(imports))
    )
  }

  componentWillReceiveProps(props: Props) {}

  render() {
    return (
      <Provider store={this.store}>
        <PasswordRecoveryApp showHeader={this.props.showHeader} />
      </Provider>
    )
  }
}
