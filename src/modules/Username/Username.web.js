import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import nextButton from 'theme/nextButton.scss';
import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import t from '../../lib/web/LocaleStrings'

import { checkUsername } from './Username.middleware'
import { changeUsernameValue } from './Username.action'
import { openErrorModal } from '../ErrorModal/ErrorModal.action'

import Loader from '../Loader/Loader.web'
import ErrorModal from '../ErrorModal/ErrorModal.web'

class UsernameComponent extends Component {

  _handleSubmit = () => {

    if (this.props.username.length < 3) {
      return this.props.dispatch(
        openErrorModal(t('activity_signup_insufficient_username_message'))
      )
    }

    if(this.props.username.length >= 3) {
      return this.props.dispatch(
        checkUsername(
          this.props.username, 
          () => browserHistory.push('/signup/pin')
        )
      )
    }

  }


  // handleBack = () => {
  //   if (this.props.loader.loading === false) {
  //     this.props.dispatch(fadeWhiteOverlay())
  //     Actions.pop()
  //   }
  // }

  _handleOnChangeText = (username) => {
    this.props.dispatch(
      changeUsernameValue(username)
    )
  }

  render () {
    return (
      <div>
        <div>
          <Button type="button">Back</Button>
          <Input type="text" name="username" onChange={this._handleOnChangeText} value={this.props.username} placeholder="Username" />
          <Button type="button" theme={nextButton} onClick={this._handleSubmit}>Next</Button>
        </div>
        <Loader />
        <ErrorModal />
      </div>
    )
  }
}

export default connect(state => ({

  username: state.username

}))(UsernameComponent)
