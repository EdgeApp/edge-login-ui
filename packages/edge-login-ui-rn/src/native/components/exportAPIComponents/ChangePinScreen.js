// @flow

import { makeReactNativeFolder } from 'disklet'
import type { AbcAccount, AbcContext } from 'edge-core-js'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import type { Store } from 'redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import { setLocal } from '../../../common/locale'
import reducers from '../../../common/reducers'
import type { Imports } from '../../../types/ReduxTypes'
import ChangePinConnector from '../../connectors/ChangePinConnector'
import * as Styles from '../../styles'

type Props = {
  account: AbcAccount,
  context: AbcContext,
  showHeader: boolean,
  locale: ?string,
  language: ?string,
  onComplete(): void,
  onCancel(): void
}
type State = {}
type Action = { type: string }

class ChangePinScreen extends Component<Props> {
  static defaultProps = {
    locale: 'US',
    language: 'en_us',
    account: null
  }
  store: Store<State, Action>
  componentWillMount () {
    setLocal(
      this.props.locale || ChangePinScreen.defaultProps.locale,
      this.props.language || ChangePinScreen.defaultProps.language
    )
    const imports: Imports = {
      accountOptions: {},
      accountObject: this.props.account,
      folder: makeReactNativeFolder(),
      context: this.props.context,
      onComplete: this.props.onComplete,
      onCancel: this.props.onComplete,
      locale: this.props.locale || ChangePinScreen.defaultProps.locale,
      language: this.props.language || ChangePinScreen.defaultProps.locale,
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
