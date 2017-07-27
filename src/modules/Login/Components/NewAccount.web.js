import React, { Component } from 'react'

import styles from './NewAccount.webStyle.scss'
import buttons from '../../../theme/buttons.scss'

class NewAccount extends Component {
  render () {
    return (
      <div className={styles.container}>
        <button className={styles.button}>Create Account</button>
        <br />
        <p>Already have an account? <span className={buttons.link} onClick={this.props.login}>Login</span></p>
      </div>
    )
  }
}

export default NewAccount
