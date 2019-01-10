// @flow

import { makeReactNativeFolder } from 'disklet'
import type { EdgeAccount, EdgeContext } from 'edge-core-js'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import type { Store } from 'redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import reducers from '../../../common/reducers'
import type { Imports } from '../../../types/ReduxTypes'
import ChangePinConnector from '../../connectors/ChangePinConnector'
import * as Styles from '../../styles'

type Props = {
  account: EdgeAccount,
  context: EdgeContext,
  showHeader: boolean,
  onComplete(): void,
  onCancel(): void
}
type State = {}
type Action = { type: string }

class ChangePinScreen extends Component<Props> {
  static defaultProps = {
    account: null
  }
  store: Store<State, Action>
  constructor (props: Props) {
    super(props)
    const imports: Imports = {
      accountOptions: {},
      accountObject: this.props.account,
      folder: makeReactNativeFolder(),
      context: this.props.context,
      onComplete: this.props.onComplete,
      onCancel: this.props.onComplete,
      callback: () => {}
    }
    this.store = createStore(
      reducers,
      {},
      applyMiddleware(thunk.withExtraArgument(imports))
    )
  }

  render () {
    return (
      <Provider store={this.store}>
        <ChangePinConnector
          accountObject={this.props.account}
          styles={Styles}
          showHeader={this.props.showHeader}
        />
      </Provider>
    )
  }
}

export { ChangePinScreen }
