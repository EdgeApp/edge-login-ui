import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

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

  // changePinDummy = (pinDummy) => {
  //   if (this.props.pinDummy.length < this.props.pinNumber.length) {
  //     this.props.dispatch(changePinNumberValue(this.props.pinNumber.substr(0, this.props.pinDummy.length)))
  //   }
  // }

  // focusPin = () => {
  //   this.refs.signupPinDummy.blur()
  //   this.refs.signupPin.focus()
  // }

  _handleOnChangeText = (e) => {
    this.props.dispatch(
      changePinNumberValue(e.target.value)
    )
  }

  // pinStyle = () => {
  //   if(this.props.pinDummy.length > 0) return {fontSize: 110, paddingTop: 0, paddingBottom: -35}
  //     return {}
  // }

  render () {
    return (
      <div>
        <div>
          <button type="button" onClick={this._handleBack}>Back</button>
        </div>
        <div>
          <input type="number" name="pin" onChange={this._handleOnChangeText} value={this.props.pin} placeholder="pin"/>
        </div>
        <div>
          <input type="number" name="pinDummy" placeholder="pinDummy"/>
        </div>
        <div>
          <button type="button" onClick={this._handleSubmit}>Next</button>
        </div>
        <Loader />
        <ErrorModal />
      </div>
    )
  }
}

export default connect(state => ({

  pin: state.pin

}))(PinComponent)
