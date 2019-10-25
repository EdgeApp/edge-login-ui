import React, { Component } from 'react'
import {
  IoIosCheckmarkCircle as Check,
  IoMdWarning as Warning
} from 'react-icons/io'

import styles from '../styles/Notification.scss'

export default class Notification extends Component {
  render() {
    const { view, message, theme, closeNotification } = this.props
    if (view) {
      setTimeout(() => {
        return closeNotification()
      }, 5000)
    }
    const themeBackgroundOpen = () => {
      switch (theme) {
        case 'error':
          return styles.containerError
        case 'success':
          return styles.containerSuccess
        default:
          return styles.containerError
      }
    }
    const themeBackgroundClose = () => {
      switch (theme) {
        case 'error':
          return styles.containerErrorClose
        case 'success':
          return styles.containerSuccessClose
        default:
          return styles.containerErrorClose
      }
    }
    const themeIcon = () => {
      switch (theme) {
        case 'error':
          return <Warning className={styles.icon} />
        case 'success':
          return <Check className={styles.icon} />
        default:
          return <Warning className={styles.icon} />
      }
    }
    return (
      <div
        className={view ? themeBackgroundOpen() : themeBackgroundClose()}
        onClick={closeNotification}
      >
        {view && themeIcon()}
        <p className={styles.text}>{message}</p>
      </div>
    )
  }
}
