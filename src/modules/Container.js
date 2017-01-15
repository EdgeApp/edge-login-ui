import React, { Component } from 'react'
import { connect } from 'react-redux'
import Alert from './Alert/Alert'
import { Dialog } from 'react-toolbox/lib/dialog';
import { Button } from 'react-toolbox/lib/button';
class Container extends Component {
  handleToggle = () => {
    // this.refs.loginWithAirbitz.cancelRequest()
    // if (this.refs.pinPasswordForm) {
    //   this.refs.pinPasswordForm.onClose()
    // }
    // if (window.parent.exitCallback) {
    //   window.parent.exitCallback()
    // }
    console.log('closing Airbitz login')
    if (window.parent.exitCallback) {
      window.parent.exitCallback()
    }
  }
  state = {
    active: false
  };

  actions = [
    { label: "Cancel", onClick: this.handleToggle },
    { label: "Save", onClick: this.handleToggle }
  ];  
  render() {
    return (
        
      <div className="app">
        <Dialog
          action={this.actions}
          active={true}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
        >
          {this.props.children}  
        </Dialog>
      </div>
    )
  }
}
export default Container

