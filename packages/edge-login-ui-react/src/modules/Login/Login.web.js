import React from 'react'

import Divider from './Divider/Divider.js'
import styles from './Login.scss'
import LoginEdge from './LoginEdge/LoginEdge.js'
import LoginWithPasswordSection from './LoginWithPassword/LoginWithPassword.js'
import LoginWithPinSection from './LoginWithPin/LoginWithPin.js'
import NewAccountSection from './NewAccount/NewAccount.js'

export default ({ password, pin, mobileLogin, edge, history }) => {
  if (!pin && !password && !edge) {
    return (
      <div className={styles.webContainer}>
        <NewAccountSection history={history} />
      </div>
    )
  }
  if (edge && !pin) {
    return (
      <div className={styles.webContainer}>
        <LoginEdge history={history} />
      </div>
    )
  }
  if (!pin && password && !edge) {
    return (
      <div className={styles.webContainer}>
        <LoginWithPasswordSection history={history} />
      </div>
    )
  }
  if (pin && !password && !edge) {
    return (
      <div className={styles.webContainer}>
        <LoginWithPinSection history={history} />
      </div>
    )
  }
}
