// @flow

import { makeReactNativeFolder } from 'disklet'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import type { Store } from 'redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import reducers from '../../../common/reducers'
import type { Imports } from '../../../types/ReduxTypes'
import PasswordRecoveryConnector from '../../connectors/PasswordRecoveryConnector'
import * as Styles from '../../styles'

type Props = {
  account: any,
  context: any,
  showHeader: boolean,
  onComplete(): void,
  onCancel(): void
}
type State = {}
type Action = { type: string }

class PasswordRecoveryScreen extends Component<Props> {
  static defaultProps = {
    account: null
  }
  store: Store<State, Action>
  constructor (props: Props) {
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
      reducers,
      {},
      applyMiddleware(thunk.withExtraArgument(imports))
    )
  }
  componentWillReceiveProps (props: Props) {}

  render () {
    return (
      <Provider store={this.store}>
        <PasswordRecoveryConnector
          accountObject={this.props.account}
          context={this.props.context}
          styles={Styles}
          showHeader={this.props.showHeader}
        />
      </Provider>
    )
  }
}

export { PasswordRecoveryScreen }
