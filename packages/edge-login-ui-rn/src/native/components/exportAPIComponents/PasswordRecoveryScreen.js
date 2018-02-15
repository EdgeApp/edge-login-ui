import React, { Component } from 'react'
import { Provider } from 'react-redux'
import reducers from '../../../common/reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import PasswordRecoveryConnector from '../../connectors/PasswordRecoveryConnector'
import * as Styles from '../../styles'
import { setLocal } from '../../../common/locale'

/* type Props = {
  account: any,
  context: any,
  showHeader: bool,
  locale: string,
  language: string,
  onComplete():void,
  onCancel():void
}
 */

class PasswordRecoveryScreen extends Component {
  /* static defaultProps = {
    locale: 'US',
    language: 'en_us',
    accountObject: null
  } */

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
          locale: this.props.local,
          language: this.props.language
        })
      )
    )
  }
  componentWillReceiveProps (props) {}

  render () {
    console.log(Styles)
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
