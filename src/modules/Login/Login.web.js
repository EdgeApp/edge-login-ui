import React from 'react'
import LoginEdge from './Components/LoginEdge.web'
import NewAccountSection from './Components/NewAccount.web.js'
import LoginWithPasswordSection from './Components/LoginWithPassword.js'
import LoginWithPinSection from './Components/LoginWithPin.web.js'
import Divider from './Components/Divider.web.js'

import styles from './Login.scss'

export default ({
  password,
  pin,
  mobileLogin,
  history
}) => {
  if (!pin && !password) {
    return (
      <div className={styles.webContainer}>
        <LoginEdge />
        <Divider />
        <NewAccountSection history={history} />
      </div>
    )
  }
  if (!pin && password) {
    return (
      <div className={styles.webContainer}>
        <LoginEdge />
        <Divider />
        <LoginWithPasswordSection history={history} />
      </div>
    )
  }
  if (pin && !password) {
    return (
      <div className={styles.webContainer}>
        <LoginWithPinSection history={history} />
      </div>
    )
  }
}
