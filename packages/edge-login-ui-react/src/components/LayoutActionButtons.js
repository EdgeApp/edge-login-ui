import React from 'react'

import styles from '../styles/LayoutActionButtons.scss'

export default ({
  leftText,
  onLeftClick,
  rightText,
  onRightClick,
  usage,
  loading
}) => {
  const getRightButtonStyle = () => {
    switch (usage) {
      case 'success':
        return styles.rightButtonSuccess
      case 'danger':
        return styles.rightButtonDanger
      default:
        return styles.rightButtonSuccess
    }
  }
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
        <button className={styles.leftButton} onClick={onLeftClick}>
          {leftText}
        </button>
      )}
      {onRightClick && (
        <button className={getRightButtonStyle()} onClick={onRightClick}>
          {rightText}
        </button>
      )}
    </div>
  )
}
