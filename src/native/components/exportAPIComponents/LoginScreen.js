import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import reducers from '../../../common/reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import LoginAppConnector from '../../connectors/LogInAppConnector'
import * as Styles from '../../styles'
import {setLocal} from '../../../common/locale'

class LoginScreen extends Component {
  componentWillMount () {
    setLocal(this.props.locale, this.props.language)
    this.store = createStore(
      reducers,
      {},
      applyMiddleware(
        thunk.withExtraArgument({
          context: this.props.context,
          callback: this.props.onLogin,
          accountOptions: this.props.accountOptions,
          username: this.props.username,
          locale: this.props.local,
          language: this.props.language
        })
      )
    )
  }
  componentWillReceiveProps (props) {
  }

  render () {
    return (
      <Provider store={this.store}>
        <LoginAppConnector
          context={this.props.context}
          onLogin={this.props.onLogin}
          styles={Styles}
        />
      </Provider>
    )
  }
}

LoginScreen.propTypes = {
  context: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired,
  locale: PropTypes.string,
  language: PropTypes.string,
  username: PropTypes.string,
  accountOptions: PropTypes.object
}

LoginScreen.defaultProps = {
  locale: 'US',
  language: 'en_us',
  username: null,
  accountOptions: null
}

export {LoginScreen}
