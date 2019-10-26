import React, { Component } from 'react'

import t from '../lib/LocaleStrings.js'
import styles from '../styles/GlobalInputs.scss'

export default class PinInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pinFocus: false
    }
  }

  componentDidMount() {
    this.setState({ pinFocus: true })
    this.refs.pin.focus()
  }

  pinFocus = () => this.refs.pin.focus()
  render() {
    const checkPinStyle = (length, pin) => {
      if (length === pin && this.state.pinFocus) {
        return styles.pinGreen
      }
      if (length > pin) {
        return styles.pinShade
      }
      return styles.pinCircle
    }
    return (
      <div className={styles.formPinGroup} onClick={this.pinFocus}>
        <label>{t('label_enter_pin')}</label>
        <input
          type="number"
          name="pin"
          ref="pin"
          value={this.props.pin}
          className={styles.pin}
          onChange={this.props.handleChangePin}
          onFocus={() => this.setState({ pinFocus: true })}
          onBlur={() => this.setState({ pinFocus: false })}
          disabled={this.props.loading}
        />
        <div className={styles.pinContainer}>
          <div className={checkPinStyle(this.props.pin.length, 0)} />
          <div className={checkPinStyle(this.props.pin.length, 1)} />
          <div className={checkPinStyle(this.props.pin.length, 2)} />
          <div className={checkPinStyle(this.props.pin.length, 3)} />
        </div>
      </div>
    )
  }
}
