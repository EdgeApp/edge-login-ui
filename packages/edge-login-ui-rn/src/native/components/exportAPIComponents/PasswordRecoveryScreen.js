// @flow

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import type { Store } from 'redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import { setLocal } from '../../../common/locale'
import reducers from '../../../common/reducers'
import PasswordRecoveryConnector from '../../connectors/PasswordRecoveryConnector'
import * as Styles from '../../styles'

type Props = {
  account: any,
  context: any,
  showHeader: boolean,
  locale: ?string,
  language: ?string,
  onComplete(): void,
  onCancel(): void
}
type State = {}
type Action = { type: string }

class PasswordRecoveryScreen extends Component<Props> {
  static defaultProps = {
    locale: 'US',
    language: 'en_us',
    account: null
  }
  store: Store<State, Action>
  componentWillMount () {
    setLocal(
      this.props.locale || PasswordRecoveryScreen.defaultProps.locale,
      this.props.language || PasswordRecoveryScreen.defaultProps.language
    )
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
