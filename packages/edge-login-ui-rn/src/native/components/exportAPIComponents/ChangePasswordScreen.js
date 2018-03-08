// @flow

import type { AbcAccount, AbcContext } from 'edge-login'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import type { Store } from 'redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import { setLocal } from '../../../common/locale'
import reducers from '../../../common/reducers'
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
    this.store = createStore(
      reducers,
      {},
      applyMiddleware(
        thunk.withExtraArgument({
          accountObject: this.props.account,
          context: this.props.context,
          onComplete: this.props.onComplete,
          onCancel: this.props.onComplete,
          locale: this.props.locale,
          language: this.props.language
        })
      )
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
