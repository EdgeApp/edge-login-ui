import React, { Component } from 'react'

import styles from './LoginWithPin.webStyle.scss'

class LoginWithPin extends Component {
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.background}></div>
        <div className={styles.main}>
          <p className={styles.header}>Login with your PIN</p>
          <div className={styles.box}></div>
          <p className={styles.exitLink}>Exit PIN Login</p>
        </div>
      </div>
    )
  }
}

export default LoginWithPin
