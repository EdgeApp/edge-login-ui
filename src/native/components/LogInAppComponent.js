import React, { Component } from 'react'
import { View, Text } from 'react-native'
import * as Constants from '../../common/constants'
import LoadingScreenConnector
  from '../connectors/screens/LoadingScreenConnector'
import LandingScreenConnector
  from '../connectors/screens/LandingScreenConnector'
import NewAccountWelcomeScreenConnector
  from '../connectors/screens/newAccount/NewAccountWelcomeScreenConnector'
import NewAccountUsernameScreenConnector
  from '../connectors/screens/newAccount/NewAccountUsernameScreenConnector'
import NewAccountPasswordScreenConnector
  from '../connectors/screens/newAccount/NewAccountPasswordScreenConnector'
import NewAccountPinScreenConnector
  from '../connectors/screens/newAccount/SetAccountPinScreenConnector.js'
import NewAccountWalletCreationScreenConnector
  from '../connectors/screens/newAccount/NewAccountWalletCreationScreenConnector'

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
    if (!this.props.previousUsers) {
      return this.getLoadingScreen()
    }
    switch (this.props.workflow.currentKey) {
      case Constants.WORKFLOW_FIRST_LOAD:
        if (this.props.previousUsers.userList.length === 0) {
          // we have previous user data but there are no users ever logged in.
          return this.getLandingScreen()
        }
        if (
          this.props.previousUsers.lastUser &&
          this.props.previousUsers.lastUser.pinEnabled
        ) {
          // we have previous users, a last user, and that user has pin enabled.
          return this.getPinScreen()
        }
        // we have previous users, but no pin enabled previous user.
        console.log('Password Screen ')
        return this.getPasswordScreen()

      case Constants.WORKFLOW_INIT:
        return this.getLandingScreen()
      case Constants.WORKFLOW_PASSWORD:
        return this.getPasswordScreen()
      case Constants.WORKFLOW_CREATE:
        return this.getCreateScreen()
    }
  }

  onButtonPress () {
    this.props.userLogin({ username: 'bob20', password: 'bob20' })
  }
  getLoadingScreen () {
    console.log('getLoading Styles Screen ')
    return <LoadingScreenConnector styles={this.props.styles} />
  }
  getLandingScreen () {
    return <LandingScreenConnector styles={this.props.styles} />
  }
  getCreateScreen (arg) {
    switch (this.props.workflow.currentSceneIndex) {
      case 0:
        return <NewAccountWelcomeScreenConnector styles={this.props.styles} />
      case 1:
        return <NewAccountUsernameScreenConnector styles={this.props.styles} />
      case 2:
        return <NewAccountPasswordScreenConnector styles={this.props.styles} />
      case 3:
        return <NewAccountPinScreenConnector styles={this.props.styles} />
      case 4:
        console.log('We are blowing up here. ')
        return <NewAccountWalletCreationScreenConnector styles={this.props.styles} />
      default:
        return <NewAccountWelcomeScreenConnector styles={this.props.styles} />
    }
  }
  getPasswordScreen (arg) {
    return (
      <Text>
        Holding Text Password Screen
      </Text>
    )
  }

  getPinScreen (arg) {
    return (
      <Text>
        Holding Text Pin Log In screen
      </Text>
    )
  }
}
