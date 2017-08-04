import React, { Component } from 'react'
import { View } from 'react-native'
import { Button, Spinner } from './common'
import * as Constants from '../../common/constants'
import LandingScreenComponent from '../connectors/screens/LandingScreenConnector'

export default class LoginAppComponent extends Component {
  componentWillMount () {
    this.props.getPreviousUsers()
  }
  render () {
    return (
      <View>
        {this.renderContent()}
      </View>
    )
  }
  renderContent () {
    switch (this.props.workflow.currentKey) {
      case Constants.WORKFLOW_INIT:
        return this.getLandingScreen()
      case Constants.WORKFLOW_PASSWORD:
        return this.getPasswordScreen()
    }
  }

  onButtonPress () {
    this.props.userLogin({ username: 'bob20', password: 'bob20' })
  }
  getSpinnerScreen () {
    const { CenteredSpinnerStyle } = this.props.styles
    return <Spinner style={CenteredSpinnerStyle} />
  }
  getLandingScreen () {
    return (
      <LandingScreenComponent styles={this.props.styles} />
    )
  }
  getCreateScreen (arg) {
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    )
  }
  getPasswordScreen (arg) {
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    )
  }
}
