import React, { Component } from 'react'

import styles from './NewAccount.webStyle.scss'
import buttons from '../../../theme/buttons.scss'

import { openLogin } from '../Login.action'

class NewAccount extends Component {
  goToSignupPage = () => {
    return this.props.history.push('/signup')
  }
  handleOpenLoginWithPasswordPage = () => {
    return this.props.dispatch(openLogin())
  }
  render () {
    return (
      <div className={styles.container}>
        <button className={styles.button} onClick={this.props.signup}>Create Account</button>
        <br />
        <p>Already have an account? <span className={buttons.link} onClick={this.handleOpenLoginWithPasswordPage}>Login</span></p>
      </div>
    )
  }
}

export default NewAccount
