import React from 'react'
import Input from 'react-toolbox/lib/input'

import gmail from '../../../img/password-recovery/gmail.png'
import mail from '../../../img/password-recovery/mail.png'
import windows from '../../../img/password-recovery/windows.png'
import yahoo from '../../../img/password-recovery/yahoo.png'
import styles from './PasswordRecoveryToken.webStyle.scss'

export default ({ email, error, handleSubmit, handleChangeEmail }) => (
  <div className={styles.container}>
    <div className={styles.main}>
      <p className={styles.header}>Save Recovery Token</p>
      <p className={styles.text}>
        To complete account recovery setup you MUST save an account recovery
        token. This will be required to rercover your account in addition to
        your username and recovery answers. Please enter your email below to
        send youreslf the recovery token.
      </p>
      <Input
        type="text"
        name="firstAnswer"
        label="Email Address"
        onChange={handleChangeEmail}
        value={email}
        className={styles.input}
        error={error}
        required
      />
    </div>
    <div className={styles.linkRows}>
      <button className={styles.gmail} onClick={() => handleSubmit('google')}>
        <span className={styles.logo}>
          <img src={gmail} />
        </span>
        <span className={styles.title}>Send with Gmail</span>
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
    </div>
    <div className={styles.linkRows}>
      <button className={styles.yahoo} onClick={() => handleSubmit('yahoo')}>
        <span className={styles.logo}>
          <img src={yahoo} />
        </span>
        <span className={styles.title}>Send with Yahoo</span>
        <span className={styles.logo} />
      </button>
      <button
        className={styles.default}
        onClick={() => handleSubmit('generic')}
      >
        <span className={styles.logo}>
          <img src={mail} />
        </span>
        <span className={styles.title}>Send with Email App</span>
        <span className={styles.logo} />
      </button>
    </div>
  </div>
)
