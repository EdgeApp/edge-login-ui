import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './LoginWithPassword.webStyle.scss'
import t from 'lib/web/LocaleStrings'
// import buttons from '../../../theme/buttons.scss'

import { loginUsername, loginPassword } from '../Login.action.js'
import PasswordRecovery from '../../Modals/PasswordRecovery/PasswordRecovery.web.js'

class NewAccount extends Component {

  state = {
    active: false
  };

  handleToggle = () => {
    this.setState({active: !this.state.active})
  }

  render () {
    const {dispatch, username, password} = this.props
    return (
      <div className={styles.container}>
        <p className={styles.header}>{t('login_text')}</p>
        <div style={{ marginTop: '10px', width: '300px' }}>
          <div className={styles['form-group']}>
            <input type="text" value={username} onChange={ e => dispatch(loginUsername(e.target.value)) } required="required"/>
            <label className={styles['control-label']} htmlFor="input">Username</label>
            <i className={styles.bar}></i>
          </div>
          <div className={styles['form-group']}>
            <input type="password" value={password} onChange={ e => dispatch(loginPassword(e.target.value)) } required="required"/>
            <label className={styles['control-label']} htmlFor="input">Password</label>
            <i className={styles.bar}></i>
          </div>
        </div>
        <p className={styles.link} onClick={this.handleToggle}>Forgot Password</p>
        <div style={{ height: '25px' }}/>
        <button className={styles.primary} onClick={ e => this.props.login(username, password)}>Sign In</button>
        <div style={{ height: '30px' }}/>
        <p>Already have an account? <span className={styles.link} onClick={this.props.signup}>Create Account</span></p>
        <PasswordRecovery active={this.state.active} close={this.handleToggle}/>
      </div>
    )
  }
}

export default connect(state => ({
  username: state.login.username,
  password: state.login.password
}))(NewAccount)
