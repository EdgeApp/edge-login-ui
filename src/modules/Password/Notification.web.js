import React, { Component } from 'react'
import { connect } from 'react-redux'
import t from '../../lib/web/LocaleStrings'
import { passwordNotificationHide } from './Password.action'


import Button from 'react-toolbox/lib/button'

import Dialog from 'react-toolbox/lib/dialog'
import { Card, CardText, CardActions } from 'react-toolbox/lib/card';


class NotificationModal extends Component {

  _handleClose = () => {
    this.props.dispatch(
      passwordNotificationHide()
    )
  }

  render () {
    if(this.props.visible){
      return (
        <Dialog
          active={this.props.visible}>
          <Card>
          <CardText>
          <h5>{t('fragment_setup_password_nopassword_title')}</h5>
          <p>{t('fragment_setup_password_nopassword_message')}</p>
          </CardText>
          <CardActions>
          <Button type="button" onClick={this._handleClose}>{t('string_cancel')}</Button> 
          <Button type="button" onClick={this.props.handleSubmit}>{t('string_ok')}</Button> 
          </CardActions>
          </Card>
        </Dialog>
      )
    }
    if(!this.props.visible) return null
  }
}

export default connect(state => ({

  visible: state.password.notification

}))(NotificationModal)
