import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import reducers from '../common/reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import LoginAppConnector from './connectors/LogInAppConnector'
import * as Styles from './styles/'

// console.ignoredYellowBox = ['Warning: View.propTypes']

export class LoginScreen extends Component {
  componentWillMount () {
    this.store = createStore(
      reducers,
      {},
      applyMiddleware(
        thunk.withExtraArgument({
          context: this.props.context,
          callback: this.props.onLogin,
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
  username: PropTypes.string
}

LoginScreen.defaultProps = {
  locale: 'US',
  language: 'us-en',
  username: null
}
