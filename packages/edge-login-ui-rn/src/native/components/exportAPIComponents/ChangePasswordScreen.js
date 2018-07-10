// @flow

import type { AbcAccount, AbcContext } from 'edge-core-js'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import type { Store } from 'redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import { setLocal } from '../../../common/locale'
import reducers from '../../../common/reducers'
import type { Imports } from '../../../types/ReduxTypes.js'
import ChangePasswordAppConnector from '../../connectors/ChangePasswordAppConnector'
import * as Styles from '../../styles'

type Props = {
  account: AbcAccount,
  context: AbcContext,
  showHeader: boolean,
  locale: string,
  language: string,
  onComplete(): void,
  onCancel(): void
}
type State = {}
type Action = { type: string }

class ChangePasswordScreen extends Component<Props> {
  store: Store<State, Action>
  static defaultProps = {
    locale: 'US',
    language: 'en_us',
    accountObject: null,
    showHeader: true
  }

  componentWillMount () {
    setLocal(this.props.locale, this.props.language)

    // Hack to make Flow happy, since it expects these objects to exist:
    const missing: any = void 0

    const imports: Imports = {
      accountObject: this.props.account,
      accountOptions: missing,
      callback: missing,
      context: this.props.context,
      language: this.props.language,
      locale: this.props.locale,
      onCancel: this.props.onComplete,
      onComplete: this.props.onComplete,
      recoveryKey: missing,
      username: void 0
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
        <ChangePasswordAppConnector
          styles={Styles}
          showHeader={this.props.showHeader}
        />
      </Provider>
    )
  }
}

export { ChangePasswordScreen }
