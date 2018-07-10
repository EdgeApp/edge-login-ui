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
    // Why are these optional for this screen and not for the others!?:
    const locale = this.props.locale || ChangePinScreen.defaultProps.locale
    const language =
      this.props.language || ChangePinScreen.defaultProps.language
    setLocal(locale, language)

    // Hack to make Flow happy, since it expects these objects to exist:
    const missing: any = void 0

    const imports: Imports = {
      accountObject: this.props.account,
      accountOptions: missing,
      callback: missing,
      context: this.props.context,
      language,
      locale,
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
