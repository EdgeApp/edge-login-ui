import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import t from '../../lib/web/LocaleStrings'

import { showPinView, changePinPasswordValue, changePinValue, hidePinChangedNotification } from './ChangePin.action'
import { checkPin } from './ChangePin.middleware'
import Snackbar from 'react-toolbox/lib/snackbar'

class ChangePin extends Component {

  _handleSubmit = () => {
    const callback = () => browserHistory.push('/signup/review')
    this.props.dispatch(
      checkPin(
        this.props.password,
        this.props.pin,
        this.props.user,
        callback
      )
    )
  }

  _handleShowChangePin = (e) => {
    this.props.dispatch(showPinView())
  }

  _handleOnChangePinPassword = (e) => {
    const password = e.target.value
    this.props.dispatch(changePinPasswordValue(password))
  }

  _handleOnChangePin = (e) => {
    const pin = e.target.value
    this.props.dispatch(changePinValue(pin))
  }

  _renderNotification = () => {
    const { pinChangedNotification, dispatch } = this.props

    return <Snackbar
      action='Dismiss'
      active={pinChangedNotification}
      label={t('activity_signup_pin_change_good')}
      timeout={5000}
      type='accept'
      onClick={() => dispatch(hidePinChangedNotification())}
      onTimeout={() => dispatch(hidePinChangedNotification())} />
  }

  render () {
    const { view, pin, password } = this.props

    if (view) {
      return (
        <div>
          {this._renderNotification()}
          <div>
            <div>
              <input type='password' name='changePinPassword' onChange={this._handleOnChangePinPassword} value={password} placeholder='Current Password' />
            </div>
            <div>
              <input type='number' name='changePin' onChange={this._handleOnChangePin} value={pin} placeholder='New Pin' />
            </div>
            <div>
              <button type='button' onClick={this._handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )
    }

    if (!view) {
      return (
        <div>
          {this._renderNotification()}
          <button type='button' onClick={this._handleShowChangePin}>Show</button>
        </div>
      )
    }
  }
}

export default connect(state => ({

  view: state.changePin.view,
  password: state.changePin.password,
  pin: state.changePin.pin,
  pinChangedNotification: state.changePin.pinChangedNotification,
  user: state.user

}))(ChangePin)
