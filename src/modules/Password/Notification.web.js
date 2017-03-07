import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from '../../lib/web/LocaleStrings'
import { passwordNotificationHide } from './Password.action'

import Button from 'react-toolbox/lib/button'

import Dialog from 'react-toolbox/lib/dialog'
import { Card, CardText, CardActions } from 'react-toolbox/lib/card'

class NotificationModal extends Component {

  _handleClose = () => {
    this.props.dispatch(
      passwordNotificationHide()
    )
  }

  buttons = [
    { label: t('string_cancel'), onClick: this._handleClose },
    { label: t('string_ok'), onClick: this.props.handleSubmit, primary: true, raised: true }
  ]

  render () {
    if (this.props.visible) {
      return (
        <Dialog
          active={this.props.visible}
          actions={this.buttons}
          onEscKeyDown={this._handleClose}
          onOverlayClick={this._handleClose}
          title={t('fragment_setup_password_nopassword_title')}
        >
            <p>{t('fragment_setup_password_nopassword_message')}</p>
        </Dialog>
      )
    }
    if (!this.props.visible) return null
  }
}

export default connect(state => ({

  visible: state.password.notification

}))(NotificationModal)
