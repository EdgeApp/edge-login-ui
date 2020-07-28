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
import { ChangePinApp } from '../navigation/ChangePinAppComponent.js'

type Props = {
  account: EdgeAccount,
  context: EdgeContext,
  showHeader: boolean,
  onComplete(): void,
  onCancel(): void
}

export class ChangePinScreen extends Component<Props> {
  store: Store<RootState, Action>

  constructor(props: Props) {
    super(props)
    const imports: Imports = {
      accountObject: this.props.account,
      accountOptions: {},
      context: this.props.context,
      folder: makeReactNativeFolder(),
      onCancel: this.props.onComplete,
      onComplete: this.props.onComplete,
      callback: () => {}
    }
    this.store = createStore(
      rootReducer,
      undefined,
      applyMiddleware(thunk.withExtraArgument(imports))
    )
  }

  render() {
    return (
      <Provider store={this.store}>
        <ChangePinApp showHeader={this.props.showHeader} />
      </Provider>
    )
  }
}
