// @flow

import React, { Component } from 'react'
import { View } from 'react-native'

import * as Constants from '../../common/constants'
import ForgotPasswordChangePasswordConnector from '../connectors/screens/existingAccount/ForgotPasswordChangePasswordConnector'
import ForgotPinChangePinConnector from '../connectors/screens/existingAccount/ForgotPinChangePinConnector'
import LoginWithRecoveryQuestionsSceenConnector from '../connectors/screens/existingAccount/LoginWithRecoveryQuestionsSceenConnector'
import OtpErrorScreenConnector from '../connectors/screens/existingAccount/OtpErrorScreenConnector'
import LandingScreenConnector from '../connectors/screens/LandingScreenConnector'
import LoadingScreenConnector from '../connectors/screens/LoadingScreenConnector'
import LoginUsernamePasswordScreenConnector from '../connectors/screens/LogInUsernamePasswordScreenConnector'
import CreatingAccountWaitScreenConnector from '../connectors/screens/newAccount/CreatingAccountWaitScreenConnector'
import NewAccountPasswordScreenConnector from '../connectors/screens/newAccount/NewAccountPasswordScreenConnector'
import NewAccountReviewScreenConnector from '../connectors/screens/newAccount/NewAccountReviewScreenConnector'
import NewAccountUsernameScreenConnector from '../connectors/screens/newAccount/NewAccountUsernameScreenConnector'
import NewAccountWelcomeScreenConnector from '../connectors/screens/newAccount/NewAccountWelcomeScreenConnector'
import NewAccountPinScreenConnector from '../connectors/screens/newAccount/SetAccountPinScreenConnector'
import TermsAndConditionsScreenConnector from '../connectors/screens/newAccount/TermsAndConditionsScreenConnector'
import PinLoginScreenConnector from '../connectors/screens/PinLoginScreenConnector'

export type StateProps = {
  workflow: Object,
  recoveryLogin: string,
  previousUsers: ?Object,
  lastUser: Object,
  lastUserPinEnabled: boolean
}
export type OwnProps = {
  styles: Object
}
export type DispatchProps = {
  getPreviousUsers(): void,
  startRecoveryWorkflow(string): void
}
type State = {}

type Props = StateProps & OwnProps & DispatchProps

export class LoginAppComponent extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.props.getPreviousUsers()
  }
  render () {
    const { ScreenStyle } = this.props.styles
    return (
      <View accessible style={ScreenStyle}>
        {this.renderContent()}
      </View>
    )
  }
  renderContent () {
    if (!this.props.previousUsers && !this.props.recoveryLogin) {
      return this.getLoadingScreen()
    }
    switch (this.props.workflow.currentKey) {
      case Constants.WORKFLOW_FIRST_LOAD:
        if (
          (!this.props.previousUsers ||
            this.props.previousUsers.userList.length === 0) &&
          !this.props.recoveryLogin
        ) {
          // we have previous user data but there are no users ever logged in.
          return this.getLandingScreen()
        }
        if (this.props.recoveryLogin) {
          this.props.startRecoveryWorkflow(this.props.recoveryLogin)
          return null
          // change that key
        }
        if (this.props.lastUser && this.props.lastUserPinEnabled) {
          // we have previous users, a last user, and that user has pin enabled.
          return this.getPinScreen()
        }
        // we have previous users, but no pin enabled previous user.
        return this.getPasswordScreen()

      case Constants.WORKFLOW_INIT:
        return this.getLandingScreen()
      case Constants.WORKFLOW_PASSWORD:
        if (this.props.recoveryLogin) {
          this.props.startRecoveryWorkflow(this.props.recoveryLogin)
          return
          // return this.getRecoveryLoginScreen()
        }
        return this.getPasswordScreen()
      case Constants.WORKFLOW_PASSWORD_FORCED:
        return this.getPasswordScreen()
      case Constants.WORKFLOW_PIN:
        return this.getPinScreen()
      case Constants.WORKFLOW_CREATE:
        return this.getCreateScreen()
      case Constants.WORKFLOW_OTP:
        return this.getOtpScreen()
      case Constants.WORKFLOW_RECOVERY_LOGIN:
        return this.getRecoveryLoginScreen()
    }
  }

  getLoadingScreen () {
    return <LoadingScreenConnector styles={this.props.styles} />
  }
  getLandingScreen () {
    return <LandingScreenConnector styles={this.props.styles} />
  }
  getCreateScreen () {
    switch (this.props.workflow.currentSceneIndex) {
      case 0:
        return <NewAccountWelcomeScreenConnector styles={this.props.styles} /> // NewAccountWelcomeScreenConnector
      case 1:
        return <NewAccountUsernameScreenConnector styles={this.props.styles} />
      case 2:
        return <NewAccountPasswordScreenConnector styles={this.props.styles} />
      case 3:
        return <NewAccountPinScreenConnector styles={this.props.styles} />
      case 4:
        return <CreatingAccountWaitScreenConnector styles={this.props.styles} />
      case 5:
        return <NewAccountReviewScreenConnector styles={this.props.styles} />
      case 6:
        return <TermsAndConditionsScreenConnector styles={this.props.styles} />
      default:
        return <NewAccountWelcomeScreenConnector styles={this.props.styles} />
    }
  }
  getPasswordScreen () {
    return <LoginUsernamePasswordScreenConnector styles={this.props.styles} />
  }

  getPinScreen () {
    return <PinLoginScreenConnector styles={this.props.styles} />
  }
  getOtpScreen () {
    return <OtpErrorScreenConnector styles={this.props.styles} />
  }
  getRecoveryLoginScreen () {
    switch (this.props.workflow.currentSceneIndex) {
      case 0:
        return (
          <LoginWithRecoveryQuestionsSceenConnector
            styles={this.props.styles}
          />
        )
      case 1:
        return (
          <ForgotPasswordChangePasswordConnector styles={this.props.styles} />
        )
      case 2:
        return <ForgotPinChangePinConnector styles={this.props.styles} />
    }
  }
}
