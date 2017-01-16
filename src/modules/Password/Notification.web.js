import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from '../../lib/web/LocaleStrings'
import { passwordNotificationHide } from './Password.action'

class NotificationModal extends Component {

  _handleClose = () => {
    this.props.dispatch(
      passwordNotificationHide()
    )
  }

  render () {
    if(this.props.visible){
      return (
        <div>
          <h5>{t('fragment_setup_password_nopassword_title')}</h5>
          <p>{t('fragment_setup_password_nopassword_message')}</p>
          <button type="button" onClick={this._handleClose}>{t('string_cancel')}</button> 
          <button type="button" onClick={this.props.handleSubmit}>{t('string_ok')}</button> 
        </div>
      )
    }
    if(!this.props.visible) return null
  }
}

export default connect(state => ({

  visible: state.password.notification

}))(NotificationModal)
