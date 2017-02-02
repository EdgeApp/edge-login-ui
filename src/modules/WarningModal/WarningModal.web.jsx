import React, { Component } from 'react'

import { connect } from 'react-redux'
import { closeWarningModal } from './WarningModal.action'
import { deleteUserToCache } from '../CachedUsers/CachedUsers.middleware'

import t from 'lib/web/LocaleStrings'

import Button from 'react-toolbox/lib/button'

import Dialog from 'react-toolbox/lib/dialog'
import { Card, CardText, CardActions } from 'react-toolbox/lib/card'

class WarningModal extends Component {

  handleDeleteUsersFromCache = () => {
    this.props.dispatch(
      deleteUserToCache(
        this.props.userToDeleteFromUserCache
      )
    )
  }

  checkHandleSubmit = () => {
    switch (this.props.module) {
      case 'deleteCachedUser' :
        return this.handleDeleteUsersFromCache

      default:
        return null
    }
  }

  handleClose = () => {
    this.props.dispatch(closeWarningModal())
  }

  render () {
    return (
      <Dialog
        active={this.props.visible}
      >
        <Card>
          <CardText>
            <div style={[ style.textWarning, style.textLead ]}>{ this.props.title }</div>
            <div style={style.textWarning}>{ this.props.message }</div>
          </CardText>
          <CardActions style={{ flexDirection: 'row' }}>
            <Button onClick={this.handleClose} style={style.hideModal}>
              {t('string_cancel')}
            </Button>
            <Button style={style.hideModal} onClick={this.checkHandleSubmit()} >
              {t('string_ok')}
            </Button>
          </CardActions>
        </Card>
      </Dialog>
    )
  }
}

const style = {

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '250px',
    padding: '20px',
    width: '300px'
  },

  textWarning: {
    fontSize: '16px',
    textAlign: 'center',
    marginBottom: '10px'
  },

  textLead: {
    fontWeight: 'bold',
    fontSize: '18px'
  },

  hideModal: {
    marginTop: '15px',
    marginHorizontal: '10px',
    fontSize: '18px',
    textAlign: 'center'
  }
}

export default connect(state => ({
  visible: state.warningModal.visible,
  module: state.warningModal.module,
  title: state.warningModal.title,
  message: state.warningModal.message,
  userToDeleteFromUserCache: state.cachedUsers.userToDeleteFromUserCache
}))(WarningModal)
