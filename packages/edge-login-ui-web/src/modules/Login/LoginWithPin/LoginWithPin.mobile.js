import React from 'react'
import Input from 'react-toolbox/lib/input'

import dropdown from '../../../img/dropdown.png'
import CachedUsers from '../CachedUsers/CachedUsers.js'
import styles from './LoginWithPin.mobileStyle.scss'

export default ({
  pin,
  user,
  error,
  loader,
  handleChangePin,
  refPin,
  showCachedUsers,
  hideCachedUsers,
  openViewPassword
}) => {
  const renderLoader = () => {
    if (loader) {
      return <div className={styles.loading} />
    }
    if (!loader) {
      return (
        <div className={styles.pinInput}>
          <p className={styles.placeholder}>&#8226;&#8226;&#8226;&#8226;</p>
          <Input
            autoFocus
            type="password"
            name="password"
            ref={refPin}
            className={styles.input}
            onChange={handleChangePin}
            value={pin}
            error={error}
          />
        </div>
      )
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <div className={styles.main}>
        <p className={styles.header}>Login with your PIN</p>
        <div className={styles.box}>
          <CachedUsers
            component={
              <div className={styles.usernameContainer}>
                <p className={styles.label}>Username</p>
                <div
                  className={styles.inputRow}
                  tabIndex={1}
                  onFocus={showCachedUsers}
                  onBlur={hideCachedUsers}
                >
                  <p className={styles.username}>
                    {user || 'No User Selected'}
                  </p>
                  <img src={dropdown} className={styles.caret} />
                </div>
              </div>
            }
            area="pinLogin"
            containerClassName={styles.containerClassName}
            userListClassName={styles.userList}
          />
          <div className={styles.pinForm}>
            <p className={styles.pinLabel}>Enter PIN</p>
            {renderLoader()}
          </div>
        </div>
        <p className={styles.exitLink} onClick={openViewPassword}>
          Exit PIN Login
        </p>
      </div>
    </div>
  )
}
