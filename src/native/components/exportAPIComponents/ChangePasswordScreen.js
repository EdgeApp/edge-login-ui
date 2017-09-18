import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import reducers from '../../../common/reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import ChangePasswordAppConnector
  from '../../connectors/ChangePasswordAppConnector'
import * as Styles from '../../styles'
import { setLocal } from '../../../common/locale'

class ChangePasswordScreen extends Component {
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
    return (
      <Provider store={this.store}>
        <ChangePasswordAppConnector styles={Styles} />
      </Provider>
    )
  }
}

ChangePasswordScreen.propTypes = {
  account: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  locale: PropTypes.string,
  language: PropTypes.string
}
ChangePasswordScreen.defaultProps = {
  locale: 'US',
  language: 'en_us',
  accountObject: null
}

export { ChangePasswordScreen }
