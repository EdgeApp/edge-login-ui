import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Input from 'react-toolbox/lib/input'

import Success from '../Modals/Success/Success.js'

import { changePinValue, showPinChangeError, clearPinChangeError } from './ChangePin.action'
import { checkPin } from './ChangePin.middleware'
import { openSuccessModal, closeSuccessModal } from '../Modals/Success/Success.action.js'

import styles from './ChangePin.webStyle.scss'

class ChangePin extends Component {
  _handleSubmit = () => {
    const callback = (error) => {
      if (error) {
        return this.props.dispatch(showPinChangeError(error))
      }
      if (!error) {
        this.props.dispatch(clearPinChangeError())
        this.props.dispatch(openSuccessModal())
      }
    }
    this.props.dispatch(
      checkPin(
        this.props.password,
        this.props.pin,
        this.props.user,
        callback
      )
    )
  }
  _handleSuccess = () => {
    this.props.dispatch(closeSuccessModal())
    return this.props.history.push('/account')
  }
  _handleOnChangePin = (pin) => {
    if (pin.length > 4) {
      pin = pin.substr(0, 4)
    }
    if (/^\d+$/.test(pin) || pin.length === 0) {
      this.props.dispatch(
        changePinValue(pin)
      )
    }
  }
  _renderButtonRows = () => {
    if (!this.props.loader.loading) {
      return (
        <div className={styles.rowButtons}>
          <Link to='/account'>
            <button className={styles.secondary}>Back</button>
          </Link>
          <button className={styles.primary} onClick={this._handleSubmit}>Next</button>
        </div>
      )
    }
    if (this.props.loader.loading) {
      return (
        <div className={styles.rowButtons}>
          <button className={styles.secondaryLoad}>Back</button>
          <button className={styles.primaryLoad}><div className={styles.loader} /></button>
        </div>
      )
    }
  }
  _pinStyle = () => {
    if (this.props.pin.length > 0) {
      return {textAlign: 'center', fontSize: '70px', height: '80px'}
    } else {
      return {textAlign: 'center', fontSize: '35px', height: '80px'}
    }
  }
  render () {
    return (
      <div className={styles.container}>
        <Input
          autoFocus
          onKeyPress={e => e.nativeEvent.charCode === 13 ? this._handleSubmit() : null}
          onChange={this._handleOnChangePin}
          value={this.props.pin}
          type='password'
          placeholder='New PIN'
          name='pin'
          className={this.props.pin.length > 0 ? styles.inputed : styles.input}
          error={this.props.error}
        />
        {this._renderButtonRows()}
        <Success header='PIN successfully changed' close={this._handleSuccess} />
      </div>
    )
  }
}

export default connect(state => ({
  view: state.changePin.view,
  password: state.changePin.password,
  pin: state.changePin.pin,
  pinChangedNotification: state.changePin.pinChangedNotification,
  user: state.user,
  loader: state.loader,
  error: state.changePin.error
}))(ChangePin)
