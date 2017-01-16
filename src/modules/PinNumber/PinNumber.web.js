import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import t from '../../lib/web/LocaleStrings'

import nextButton from 'theme/nextButton.scss';
import backButton from 'theme/backButton.scss';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

import { changePinNumberValue } from './PinNumber.action'
import { checkPIN } from './PinNumber.middleware'

import Loader from '../Loader/Loader.web'
import ErrorModal from '../ErrorModal/ErrorModal.web'

class PinComponent extends Component {

  _handleSubmit = () => {
    this.props.dispatch(
     checkPIN(
        this.props.pin,
        () => browserHistory.push('/signup/password')
      ) 
    )
  }

  _handleBack = () => {
    browserHistory.goBack()
  }


  _handleOnChangeText = (value, event) => {
    this.props.dispatch(
      changePinNumberValue(value)
    )
  }


  render () {
    return (
      <div>
        <div style={{position: 'relative'}}>
          <Button theme={backButton} style={{position: 'absolute', left: 0, top: 0}} type="button">{t('string_capitalize_back')}</Button>
          <div style={{textAlign: 'center', fontSize: 30, padding: 10}}>{t('activity_signup_pin_label')}</div>
        </div>
        <Card>
          <CardText>
            <Input ref='signupPin' style={{fontSize:'39px'}} type="password" autoFocus name="pin" onChange={this._handleOnChangeText} value={this.props.pin} placeholder={t('activity_signup_pin_hint')}/>

            <p style={{whiteSpace: 'pre-line'}}>{t('fragment_setup_pin_text')}</p>
          </CardText>

          <CardActions>
            <Button type="button" raised theme={nextButton} onClick={this._handleSubmit}>{t('string_next')}</Button>
          </CardActions>
        </Card>  
        <Loader />
        <ErrorModal />            
      </div>      
    )
  }
}

export default connect(state => ({

  pin: state.pin

}))(PinComponent)
