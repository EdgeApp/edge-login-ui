import React from 'react'
import LoginEdge from './LoginEdge/LoginEdge.web'
import NewAccountSection from './NewAccount/NewAccount.web.js'
import LoginWithPasswordSection from './LoginWithPassword/LoginWithPassword.js'
import LoginWithPinSection from './LoginWithPin/LoginWithPin.web.js'
import Divider from './Divider/Divider.js'

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
