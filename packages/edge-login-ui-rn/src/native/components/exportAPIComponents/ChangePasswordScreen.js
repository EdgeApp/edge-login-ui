import React, { Component } from 'react'
import { Provider } from 'react-redux'
// import type { Store } from '../../../types/ReduxTypes'
import reducers from '../../../common/reducers'
import type { AbcContext, AbcAccount } from 'edge-login'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import ChangePasswordAppConnector from '../../connectors/ChangePasswordAppConnector'
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

class ChangePasswordScreen extends Component<Props> {
  store: any
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
