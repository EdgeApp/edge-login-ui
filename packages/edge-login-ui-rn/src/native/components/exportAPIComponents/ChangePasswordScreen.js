// @flow

import { makeReactNativeFolder } from 'disklet'
import type { EdgeAccount, EdgeContext } from 'edge-core-js'
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
import ChangePasswordAppConnector from '../../connectors/ChangePasswordAppConnector'
import * as Styles from '../../styles'

type Props = {
  account: EdgeAccount,
  context: EdgeContext,
  showHeader: boolean,
  onComplete(): void,
  onCancel(): void
}

class ChangePasswordScreen extends Component<Props> {
  store: Store<RootState, Action>
  static defaultProps = {
    accountObject: null,
    showHeader: true
  }

  constructor(props: Props) {
    super(props)
    const imports: Imports = {
      accountOptions: {},
      folder: makeReactNativeFolder(),
      accountObject: this.props.account,
      context: this.props.context,
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

  render() {
    return (
      <Provider store={this.store}>
        <ChangePasswordAppConnector
          styles={Styles}
          showHeader={this.props.showHeader}
        />
      </Provider>
    )
  }
}

export { ChangePasswordScreen }
