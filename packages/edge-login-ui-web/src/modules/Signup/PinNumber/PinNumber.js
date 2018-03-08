import React, { Component } from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import { changeSignupPage } from '../Signup.action'
import { changePinNumberValue, clearError, error } from './PinNumber.action'
import { checkPIN } from './PinNumber.middleware'
import Mobile from './PinNumber.mobile.js'
import Desktop from './PinNumber.web.js'

class Pin extends Component {
  handleSubmit = e => {
    this.props.dispatch(
      checkPIN(this.props.pin, errorMessage => {
        if (errorMessage) {
          return this.props.dispatch(error(errorMessage))
        }
        if (!errorMessage) {
          this.props.dispatch(clearError())
          return this.props.dispatch(changeSignupPage('password'))
        }
      })
    )
  }
  handleOnChangeText = pin => {
    if (pin.length > 4) {
      pin = pin.substr(0, 4)
    }
    if (/^\d+$/.test(pin) || pin.length === 0) {
      this.props.dispatch(changePinNumberValue(pin))
    }
  }
  handleKeyEnter = e => {
    if (e.nativeEvent.charCode === 13) {
      return this.handleSubmit()
    }
  }
  gotoUsername = e => {
    return this.props.dispatch(changeSignupPage('username'))
  }
  pinStyle = () => {
    if (this.props.pin.length > 0) {
      return { textAlign: 'center', fontSize: '70px', height: '80px' }
    } else {
      return { textAlign: 'center', fontSize: '35px', height: '80px' }
    }
  }
  render () {
    return (
      <section>
        <MediaQuery minWidth={720}>
          <Desktop
            pin={this.props.pin}
            error={this.props.error}
            handleSubmit={this.handleSubmit}
            handleOnChangeText={this.handleOnChangeText}
            handleKeyEnter={this.handleKeyEnter}
            gotoUsername={this.gotoUsername}
          />
        </MediaQuery>
        <MediaQuery maxWidth={719}>
          <Mobile
            pin={this.props.pin}
            error={this.props.error}
            handleSubmit={this.handleSubmit}
            handleOnChangeText={this.handleOnChangeText}
            handleKeyEnter={this.handleKeyEnter}
            gotoUsername={this.gotoUsername}
          />
        </MediaQuery>
      </section>
    )
  }
}

export default connect(state => ({
  pin: state.pin.pin,
  error: state.pin.error
}))(Pin)
