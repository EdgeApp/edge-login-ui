import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './ChangePin.webStyle.scss'

class ChangePin extends Component {
  render () {
    return (
      <div className={styles.container}>
        <p className={styles.header}>Change your 4-digit PIN</p>
        <div className={styles.rowButtons}>
          <button className={styles.secondary}>Back</button>
          <button className={styles.primary}>Submit</button>
        </div>
      </div>
    )
  }
}

export default connect()(ChangePin)
