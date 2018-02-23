// @flow
import React, { Component } from 'react'
import type { Store } from 'redux'
import type { AbcAccount, AbcContext } from 'edge-login'
import { Provider } from 'react-redux'
import reducers from '../../../common/reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import ChangePinConnector from '../../connectors/ChangePinConnector'
import * as Styles from '../../styles'
import { setLocal } from '../../../common/locale'

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

class ChangePinScreen extends Component<Props> {
  static defaultProps = {
    locale: 'US',
    language: 'en_us',
    account: null
  }
  store: Store<State, Action>
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
