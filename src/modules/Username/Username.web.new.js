import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import styles from './Username.webStyle.scss'
import Input from 'react-toolbox/lib/input'

class ChangePin extends Component {
  render () {
    return (
      <div className={styles.container}>
        <p className={styles.header}>Choose a Username</p>
        <Input label='Username' className={styles.input} />
        <div className={styles.bullets}>
          <p className={styles.bullet}><span className={styles.bulletIcon}>•</span> This is not your email or real name.</p>
          <p className={styles.bullet}><span className={styles.bulletIcon}>•</span> This is the username to login into your account on this and other devices.</p>
          <p className={styles.bullet}><span className={styles.bulletIcon}>•</span> Your username and password are known only to you and never stored unencrypted.</p>
        </div>
        <div className={styles.rowButtons}>
          <Link to='/login'>
            <button className={styles.secondary}>Back</button>
          </Link>
          <button className={styles.primary}>Next</button>
        </div>
      </div>
    )
  }
}

export default connect()(ChangePin)
