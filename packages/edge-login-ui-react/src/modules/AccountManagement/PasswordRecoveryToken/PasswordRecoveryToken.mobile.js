import React from 'react'
import Input from 'react-toolbox/lib/input'

import gmail from '../../../img/password-recovery/gmail.png'
import mail from '../../../img/password-recovery/mail.png'
import windows from '../../../img/password-recovery/windows.png'
import yahoo from '../../../img/password-recovery/yahoo.png'
import styles from './PasswordRecoveryToken.mobileStyle.scss'

export default ({ email, error, handleSubmit, handleChangeEmail }) => (
  <div className={styles.container}>
    <p className={styles.header}>Save Recovery Token</p>
    <p className={styles.text}>
      Please enter your email below to send yourself the account recovery token.
    </p>
    <p className={styles.text}>
      If you lose your password, you will need the recovery token to recover
      your account.
    </p>
    <Input
      type="text"
      label="Email Address"
      onChange={handleChangeEmail}
      value={email}
      error={error}
      className={styles.input}
      required
    />
    <button className={styles.gmail} onClick={() => handleSubmit('google')}>
      <span className={styles.logo}>
        <img src={gmail} />
      </span>
      <span className={styles.title}>Send with Gmail</span>
      <span className={styles.logo} />
    </button>
    <button className={styles.yahoo} onClick={() => handleSubmit('yahoo')}>
      <span className={styles.logo}>
        <img src={yahoo} />
      </span>
      <span className={styles.title}>Send with Yahoo</span>
      <span className={styles.logo} />
    </button>
    <button
      className={styles.hotmail}
      onClick={() => handleSubmit('microsoft')}
    >
      <span className={styles.logoHotmail}>
        <img src={windows} />
      </span>
      <span className={styles.titleHotmail}>
        Send with Hotmail or Live Mail
      </span>
      <span className={styles.spacerHotmail} />
    </button>
    <button className={styles.default} onClick={() => handleSubmit('generic')}>
      <span className={styles.logoEmail}>
        <img src={mail} />
      </span>
      <span className={styles.title}>Send with Email App</span>
      <span className={styles.spacerEmail} />
    </button>
  </div>
)
