import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import styles from './ChangePin.webStyle.scss'
import Input from 'react-toolbox/lib/input'

class ChangePin extends Component {
  render () {
    return (
      <div className={styles.container}>
        <p className={styles.header}>Change your 4-digit PIN</p>
        <Input type='password' placeholder='New PIN' name='pin' style={{fontSize: '32px', textAlign: 'center'}} />
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
