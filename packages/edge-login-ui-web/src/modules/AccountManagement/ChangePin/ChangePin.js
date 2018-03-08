import React, { Component } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import {
  closeSuccessModal,
  openSuccessModal
} from '../../Modals/Success/Success.action.js'
import Success from '../../Modals/Success/Success.js'
import {
  changePinValue,
  clearPinChangeError,
  showPinChangeError
} from './ChangePin.action'
import { checkPin } from './ChangePin.middleware'
import Mobile from './ChangePin.mobile.js'
import Desktop from './ChangePin.web.js'

class ChangePin extends Component {
  handleSubmit = () => {
    const callback = error => {
      if (error) {
        return this.props.dispatch(showPinChangeError(error))
      }
      if (!error) {
        this.props.dispatch(clearPinChangeError())
        this.props.dispatch(openSuccessModal())
      }
    }
    return this.props.dispatch(
      checkPin(this.props.password, this.props.pin, this.props.user, callback)
    )
  }
  passwordKeyPressed = e => {
    if (e.charCode === 13) {
      return this.handleSubmit()
    }
  }
  handleOnChangePin = pin => {
    if (pin.length > 4) {
      pin = pin.substr(0, 4)
    }
    if (/^\d+$/.test(pin) || pin.length === 0) {
      this.props.dispatch(changePinValue(pin))
    }
  }
  gotoAccount = () => {
    return this.props.history.push('/account')
  }
  _handleSuccess = () => {
    this.props.dispatch(closeSuccessModal())
    return this.props.history.push('/account')
  }
  render () {
    return (
      <section>
        <MediaQuery minWidth={720}>
          <Desktop
            pin={this.props.pin}
            loader={this.props.loader.loading}
            error={this.props.error}
            handleSubmit={this.handleSubmit}
            passwordKeyPressed={this.passwordKeyPressed}
            handleOnChangePin={this.handleOnChangePin}
            gotoAccount={this.gotoAccount}
          />
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <Mobile
            pin={this.props.pin}
            loader={this.props.loader.loading}
            error={this.props.error}
            handleSubmit={this.handleSubmit}
            passwordKeyPressed={this.passwordKeyPressed}
            handleOnChangePin={this.handleOnChangePin}
            gotoAccount={this.gotoAccount}
          />
        </MediaQuery>
        <Success
          header="PIN successfully changed"
          close={this._handleSuccess}
        />
      </section>
    )
  }
}

export default connect(state => ({
  pin: state.changePin.pin,
  loader: state.loader,
  error: state.changePin.error,
  user: state.user
}))(ChangePin)
