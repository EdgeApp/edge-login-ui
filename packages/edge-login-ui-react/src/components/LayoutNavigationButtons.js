import React from 'react'
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io'

import styles from '../styles/LayoutNavigationButtons.scss'

export default ({ onLeftClick, onRightClick, loading }) => {
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loader} />
      </div>
    )
  }
  return (
    <div className={styles.container}>
      {onLeftClick && (
        <div className={styles.leftContainer} onClick={onLeftClick}>
          <IoIosArrowRoundBack className={styles.leftButton} />
        </div>
      )}
      <div className={styles.spacer} />
      {onRightClick && (
        <div className={styles.rightContainer} onClick={onRightClick}>
          <IoIosArrowRoundForward className={styles.rightButton} />
        </div>
      )}
    </div>
  )
}
