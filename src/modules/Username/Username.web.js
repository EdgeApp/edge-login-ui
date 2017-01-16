import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import nextButton from 'theme/nextButton.scss';
import backButton from 'theme/backButton.scss';
import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';

import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

import { checkUsername } from './Username.middleware'
import t from '../../lib/web/LocaleStrings'

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
        <div style={{position: 'relative'}}>
          <Button theme={backButton} style={{position: 'absolute', left: 0, top: 0}} type="button">Back</Button>
          <div style={{textAlign: 'center', fontSize: 30, padding: 10}}>Sign Up</div>
        </div>
        <Card>
          <CardText>
            <Input type="text" name="username" onChange={this._handleOnChangeText} value={this.props.username} placeholder="Username" />
            <p>This is not your mama's house</p>
            <p>So pick up yo' stuff</p>
            <p>This is not your daddy's house. So don't be bringin' yo' girlfriends home.</p>
          </CardText>

          <CardActions>
            <Button type="button" raised theme={nextButton} onClick={this._handleSubmit}>Next</Button>
          </CardActions>
        </Card>  
        <Loader />
        <ErrorModal />            
      </div>
    )
  }
}

export default connect(state => ({

  username: state.username

}))(UsernameComponent)
