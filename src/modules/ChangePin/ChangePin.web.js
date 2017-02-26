import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import t from '../../lib/web/LocaleStrings'

import { hidePinView, showPinView, changePinPasswordValue, changePinValue, hidePinChangedNotification } from './ChangePin.action'
import { checkPin } from './ChangePin.middleware'
import Snackbar from 'react-toolbox/lib/snackbar'
import Dialog from 'react-toolbox/lib/dialog'
import Input from 'react-toolbox/lib/input'

class ChangePin extends Component {

  _handleSubmit = () => {
    const callback = () => null
    this.props.dispatch(
      checkPin(
        this.props.password,
        this.props.pin,
        this.props.user,
        callback
      )
    )
  }

  _handleOnChangePinPassword = (password) => {
    this.props.dispatch(changePinPasswordValue(password))
  }

  _handleOnChangePin = (pin) => {
    this.props.dispatch(changePinValue(pin))
  }

  _handleHideModal = () => {
    this.props.dispatch(hidePinView())
  }

  buttons = [
    { label: "Close", onClick: this._handleHideModal },
    { label: "Submit", onClick: this._handleSubmit }
  ]

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
    return (
      <Dialog
        actions={this.buttons}
        active={this.props.view}
        onEscKeyDown={this._handleHideModal}
        onOverlayClick={this._handleHideModal}
        title={t('activity_signup_title_change_pin')}
      >
        {this._renderNotification()}
        <Input type='password' name='changePinPassword' onChange={this._handleOnChangePinPassword} value={password} placeholder='Current Password' />
        <Input type='number' name='changePin' onChange={this._handleOnChangePin} value={pin} placeholder='New Pin' />
      </Dialog>
    )
  }
}

export default connect(state => ({

  view                    : state.changePin.view,
  password                : state.changePin.password,
  pin                     : state.changePin.pin,
  pinChangedNotification  : state.changePin.pinChangedNotification,
  user                    : state.user

}))(ChangePin)
