import React, { Component } from 'react'

import styles from './LoginWithPassword.webStyle.scss'
import t from 'lib/web/LocaleStrings'
// import buttons from '../../../theme/buttons.scss'

class NewAccount extends Component {
  render () {
    return (
      <div className={styles.container}>
        <p className={styles.header}>{t('login_text')}</p>

        <div style={{ marginTop: '10px', width: '300px' }}>
          <div className={styles['form-group']}>
            <input type="text" required="required"/>
            <label className={styles['control-label']} htmlFor="input">Username</label>
            <i className={styles.bar}></i>
          </div>

          <div className={styles['form-group']}>
            <input type="password" required="required"/>
            <label className={styles['control-label']} htmlFor="input">Password</label>
            <i className={styles.bar}></i>
          </div>
        </div>

        <p className={styles.link}>Forgot Password</p>

        <div style={{ height: '25px' }}/>

        <button className={styles.primary} onClick={this.props.openViewPin}>Sign In</button>

        <div style={{ height: '30px' }}/>

        <p>Already have an account? <span className={styles.link}>Create Account</span></p>
      </div>
    )
  }
}

export default NewAccount
