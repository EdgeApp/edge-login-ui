import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import t from '../../lib/web/LocaleStrings'

import Button from 'react-toolbox/lib/button'
import nextButton from 'theme/nextButton.scss'
import Dialog from 'react-toolbox/lib/dialog'

import { showPasswordRecoveryFinishModal, hidePasswordRecoveryFinishModal  } from './PasswordRecovery.action'

import styles from '../ErrorModal/ErrorModal.webStyle'

class PasswordRecoverySuccess extends Component {

  _handleFinish = () => {
    if (window.parent.loginCallback) {
      window.parent.loginCallback(null, account)
    }
    if (window.parent.exitCallback) {
      window.parent.exitCallback(null)
    }
    if (!window.parent.loginCallback && !window.parent.exitCallback) {
      this.props.dispatch(hidePasswordRecoveryFinishModal())
    }
  }

  render () {
    return (
      <div>
        <Dialog
          className={styles.dialogZIndex}
          active={this.props.visible}
        >
          <div className={styles.container}>
            <p>{t('recovery_setup_successful')}</p>
            <br />
            <Button raised theme={nextButton} type='button' onClick={this._handleFinish}>{t('string_ok')}</Button>
          </div>
        </Dialog>
      </div>
    )
  }
}

PasswordRecoverySuccess = withRouter(PasswordRecoverySuccess)
export default connect(state => ({

  visible: state.passwordRecovery.viewFinishModal,
  details: state.reviewDetails.details

}))(PasswordRecoverySuccess)
