import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import styles from './ChangePassword.webstyle.scss'
import Input from 'react-toolbox/lib/input'
import FontIcon from 'react-toolbox/lib/font_icon'

import eyeShow from '../../img/create-account/show-password.png'
// import eyeHide from '../../img/create-account/hide-password.png'

class ChangePin extends Component {
  render () {
    return (
      <div className={styles.container}>
        <p className={styles.header}>Change your password</p>
        <div className={styles.main}>
          <div className={styles.tooltip}>
            <p className={styles.textHeader}>Password Requirements:</p>
            <p className={styles.text}><FontIcon value='clear' className={styles.icon} />Must have at least one upper case letter</p>
            <p className={styles.text}><FontIcon value='clear' className={styles.icon} />Must have at least one lower case letter</p>
            <p className={styles.text}><FontIcon value='clear' className={styles.icon} />Must have at least one number</p>
            <p className={styles.text}><FontIcon value='clear' className={styles.icon} />Must have at least 10 characters</p>
            <p className={styles.crack}>Time to crack: 0 seconds</p>
          </div>
          <div className={styles.formContainer}>
            <div className={styles.formWithIcon}>
              <Input type='password' label='Password' name='password' className={styles.form} />
              <img src={eyeShow} className={styles.icon} />
            </div>
            <Input type='password' label='Re-enter Password' name='password_confirmation' className={styles.form} />
          </div>
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
