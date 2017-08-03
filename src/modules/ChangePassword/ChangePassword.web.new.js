import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import styles from './ChangePassword.webstyle.scss'
// import Input from 'react-toolbox/lib/input'

class ChangePin extends Component {
  render () {
    return (
      <div className={styles.container}>
        <p className={styles.header}>Change your password</p>
        <div className={styles.main}>
          <div className={styles.tooltip} />
        <div className={styles.forms} />
        </div>
        <div className={styles.rowButtons}>
          <Link to='/account'>
            <button className={styles.secondary}>Back</button>
          </Link>
          <button className={styles.primary}>Submit</button>
        </div>
      </div>
    )
  }
}

export default connect()(ChangePin)
