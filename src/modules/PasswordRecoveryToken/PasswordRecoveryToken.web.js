import React, { Component } from 'react'
import Input from 'react-toolbox/lib/input'

import styles from './PasswordRecoveryToken.webStyle.scss'

export default class PasswordRecoveryToken extends Component {
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.main}>
          <p className={styles.header}>Save Recovery Token</p>
          <p className={styles.text}>To complete account recovery setup you MUST save an account recovery token. This will be required to rercover your account in addition to your username and recovery answers. Please enter your email below to send youreslf the recovery token.</p>
          <Input
            type='text'
            name='firstAnswer'
            label='Email Address'
            className={styles.input}
            required
          />
        </div>
        <div className={styles.linkRows}>
          <button className={styles.gmail}>
            <span className={styles.logo} />
            <span className={styles.title}>Send with Gmail</span>
            <span className={styles.logo} />
          </button>
          <button className={styles.hotmail}>
            <span className={styles.logo} />
            <span className={styles.title}>Send with Hotmail or Live Mail</span>
            <span className={styles.logo} />
          </button>
        </div>
        <div className={styles.linkRows}>
          <button className={styles.yahoo}>
            <span className={styles.logo} />
            <span className={styles.title}>Send with Yahoo</span>
            <span className={styles.logo} />
          </button>
          <button className={styles.default}>
            <span className={styles.logo} />
            <span className={styles.title}>Send with Email App</span>
            <span className={styles.logo} />
          </button>
        </div>
      </div>
    )
  }
}
