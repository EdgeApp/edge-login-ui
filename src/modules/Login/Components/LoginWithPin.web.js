import React, { Component } from 'react'

import styles from './LoginWithPin.webStyle.scss'

class LoginWithPin extends Component {
  render () {
    return (
      <div className={styles.container}>
        <div className={styles.background}></div>
        <div className={styles.main}>
          <p className={styles.header}>Login with your PIN</p>
          <div className={styles.box}>
            <div className={styles.userList}>
              <select>
                <option>Areallylongexampleusernamethatfits</option>
                <option>SuperDuperAwesomeText</option>
                <option>GokuVegetaKririnYamcha</option>
                <option>BayangMagiliwPerlasNgSilanganan</option>
              </select>
              <label className={styles['control-label']} htmlFor="select">Username</label>
              <i className={styles.bar}></i>
            </div>
            <div className={styles.password}>
              <input type="password" style={{ textAlign: 'center' }}required="required"/>
              <label className={styles.passwordLabel} htmlFor="input">Enter PIN</label>
              <i className={styles.bar}></i>
            </div>
          </div>
          <p className={styles.exitLink}>Exit PIN Login</p>
        </div>
      </div>
    )
  }
}

export default LoginWithPin
