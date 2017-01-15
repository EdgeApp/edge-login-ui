import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import { checkUsername } from './Username.middleware'

import { changeUsernameValue } from './Username.action'
import { openErrorModal } from '../ErrorModal/ErrorModal.action'
import t from '../../lib/web/LocaleStrings'

class UsernameComponent extends Component {

  _handleSubmit = () => {
    if (this.props.username.length < 3) {
      return this.props.dispatch(openErrorModal(t('activity_signup_insufficient_username_message')))
    }
    this.props.dispatch(checkUsername(this.props.username, success => {
      if(success) {
        browserHistory.push('/signup/pin')
      }
    }))
  }


  // handleBack = () => {
  //   if (this.props.loader.loading === false) {
  //     this.props.dispatch(fadeWhiteOverlay())
  //     Actions.pop()
  //   }
  // }

  // componentWillMount = () => {
  //   Actions.refresh({onLeft: this.handleBack})
  // }

  _handleOnChangeText = (username) => {
    this.props.dispatch(
      changeUsernameValue(username)
    )
  }

  render () {
    return (
      <div>
        <Button type="button">Back</Button>
        <Input type="text" name="username" onChange={this._handleOnChangeText} value={this.props.username} placeholder="Username" />
        <Button type="button" onClick={this._handleSubmit}>Next</Button>
      </div>
    )
  }
}

export default connect(state => ({

  username: state.username

}))(UsernameComponent)
