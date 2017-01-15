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
    console.log('ok')
    if (window.parent.exitCallback) {
      window.parent.exitCallback()
    }
    this.setState({active: !this.state.active});
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
        <Button label='Show my dialog' onClick={this.handleToggle} />
        <Dialog
          action={this.actions}
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title='Airbitz'
        >
          {this.props.children}  
        </Dialog>
      </div>
    )
  }
}
export default Container

