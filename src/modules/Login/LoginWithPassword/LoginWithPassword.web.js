import React from 'react'
import t from 'lib/web/LocaleStrings'
import Input from 'react-toolbox/lib/input'
import CachedUsers from '../../CachedUsers/CachedUsers.web.js'
import styles from './LoginWithPassword.webStyle.scss'

export default ({
  submit,
  goToSignupPage,
  hideCachedUsers,
  showCachedUsers,
  passwordKeyPress,
  usernameKeyPress,
  changeUsernameValue,
  changePasswordValue,
  refUsername,
  refPassword,
  username,
  password,
  loader,
  error
}) => (
  <div className={styles.container}>
    <p className={styles.header}>{t('login_text')}</p>
    <div className={styles.forms}>
      <CachedUsers
        component={
          <Input
            type='text'
            label='Username'
            name='username'
            onKeyPress={usernameKeyPress}
            onChange={changeUsernameValue}
            value={username}
            ref={refUsername}
            onFocus={showCachedUsers}
            onBlur={hideCachedUsers}
          />
        }
        area='passwordLogin'
        containerClassName={styles.cachedUsers}
        userListClassName={styles.userListClassName}
      />
      <Input
        type='password'
        label='Password'
        name='password'
        onKeyPress={passwordKeyPress}
        onChange={changePasswordValue}
        value={password}
        ref={refPassword}
        className={styles.form}
        error={error}
      />
    </div>
    <p className={styles.forgotPasswordLink} onClick={e => console.log('foo')}>
      Forgot Password
    </p>
    <button className={loader ? styles.primaryLoad : styles.primary} onClick={submit}>
      { loader ? <div className={styles.loader} /> : 'Sign In' }
    </button>
    <p className={styles.createAccountText}>Don't have an account?
      <span className={styles.link} onClick={goToSignupPage}>
        Create Account
      </span>
    </p>
  </div>
)
