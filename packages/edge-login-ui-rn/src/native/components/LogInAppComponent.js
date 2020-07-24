// @flow

import React, { Component } from 'react'
import { View } from 'react-native'

import * as Constants from '../../common/constants'
import { ModalManager as ModalManagerLogin } from '../../common/util'
import ForgotPasswordChangePasswordConnector from '../connectors/screens/existingAccount/ForgotPasswordChangePasswordConnector'
import LoginWithRecoveryQuestionsSceenConnector from '../connectors/screens/existingAccount/LoginWithRecoveryQuestionsSceenConnector'
import OtpErrorScreenConnector from '../connectors/screens/existingAccount/OtpErrorScreenConnector'
import LandingScreenConnector from '../connectors/screens/LandingScreenConnector'
import LoadingScreenConnector from '../connectors/screens/LoadingScreenConnector'
import LoginUsernamePasswordScreenConnector from '../connectors/screens/LogInUsernamePasswordScreenConnector'
import NewAccountPasswordScreenConnector from '../connectors/screens/newAccount/NewAccountPasswordScreenConnector'
import NewAccountReviewScreenConnector from '../connectors/screens/newAccount/NewAccountReviewScreenConnector'
import NewAccountUsernameScreenConnector from '../connectors/screens/newAccount/NewAccountUsernameScreenConnector'
import NewAccountWelcomeScreenConnector from '../connectors/screens/newAccount/NewAccountWelcomeScreenConnector'
import NewAccountPinScreenConnector from '../connectors/screens/newAccount/SetAccountPinScreenConnector'
import TermsAndConditionsScreenConnector from '../connectors/screens/newAccount/TermsAndConditionsScreenConnector'
import PinLoginScreenConnector from '../connectors/screens/PinLoginScreenConnector'
import { getSupportedBiometryType } from '../keychain.js'
import { ForgotPinChangePinScene } from './screens/existingAccout/ChangeAccountPinScreenComponent'
import { CreatingAccountWaitScreen } from './screens/newAccount/CreatingAccountWaitScreenComponent'

export type StateProps = {
  workflow: Object,
  recoveryLogin: string,
  previousUsers: ?Object,
  lastUser: Object,
  lastUserPinEnabled: boolean,
  lastUserTouchEnabled: boolean,
  appId?: string,
  appName?: string,
  backgroundImage?: any,
  primaryLogo?: any,
  primaryLogoCallback?: () => void,
  parentButton?: Object,
  landingScreenText?: string
}
export type OwnProps = {
  styles: Object
}
export type DispatchProps = {
  getPreviousUsers(): void,
  startRecoveryWorkflow(string): void
}
type State = {
  touch: string | boolean
}

type Props = StateProps & OwnProps & DispatchProps

export class LoginAppComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      touch: false
    }
    this.props.getPreviousUsers()
    this.checkTouchEnabled()
  }

  render() {
    const { ScreenStyle } = this.props.styles
    return (
      <View accessible style={ScreenStyle}>
        <ModalManagerLogin />
        {this.renderContent()}
      </View>
    )
  }

  renderContent() {
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
        if (this.props.lastUser) {
          // we have previous users, a last user, and that user has pin or touch enabled.
          if (this.props.lastUserPinEnabled) {
            return this.getPinScreen()
          }
          if (this.props.lastUserTouchEnabled && this.state.touch) {
            return this.getPinScreen()
          }
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

  getLoadingScreen() {
    return (
      <LoadingScreenConnector
        styles={this.props.styles}
        backgroundImage={this.props.backgroundImage}
      />
    )
  }

  getLandingScreen() {
    return (
      <LandingScreenConnector
        styles={this.props.styles}
        appId={this.props.appId}
        backgroundImage={this.props.backgroundImage}
        primaryLogo={this.props.primaryLogo}
        primaryLogoCallback={this.props.primaryLogoCallback}
        parentButton={this.props.parentButton}
        landingScreenText={this.props.landingScreenText}
      />
    )
  }

  getCreateScreen() {
    switch (this.props.workflow.currentSceneIndex) {
      case 0:
        return (
          <NewAccountWelcomeScreenConnector
            styles={this.props.styles}
            appName={this.props.appName}
          />
        ) // NewAccountWelcomeScreenConnector
      case 1:
        return (
          <NewAccountUsernameScreenConnector
            styles={this.props.styles}
            appName={this.props.appName}
          />
        )
      case 2:
        return <NewAccountPasswordScreenConnector styles={this.props.styles} />
      case 3:
        return <NewAccountPinScreenConnector styles={this.props.styles} />
      case 4:
        return <CreatingAccountWaitScreen styles={this.props.styles} />
      case 5:
        return <NewAccountReviewScreenConnector styles={this.props.styles} />
      case 6:
        return (
          <TermsAndConditionsScreenConnector
            styles={this.props.styles}
            appName={this.props.appName}
          />
        )
      default:
        return <NewAccountWelcomeScreenConnector styles={this.props.styles} />
    }
  }

  getPasswordScreen() {
    return (
      <LoginUsernamePasswordScreenConnector
        styles={this.props.styles}
        appId={this.props.appId}
        backgroundImage={this.props.backgroundImage}
        primaryLogo={this.props.primaryLogo}
        primaryLogoCallback={this.props.primaryLogoCallback}
        parentButton={this.props.parentButton}
        touch={this.state.touch}
      />
    )
  }

  getPinScreen() {
    return (
      <PinLoginScreenConnector
        styles={this.props.styles}
        appId={this.props.appId}
        backgroundImage={this.props.backgroundImage}
        primaryLogo={this.props.primaryLogo}
        primaryLogoCallback={this.props.primaryLogoCallback}
        parentButton={this.props.parentButton}
        touch={this.state.touch}
      />
    )
  }

  getOtpScreen() {
    return <OtpErrorScreenConnector styles={this.props.styles} />
  }

  getRecoveryLoginScreen() {
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
        return <ForgotPinChangePinScene styles={this.props.styles} />
    }
  }

  checkTouchEnabled = async () => {
    try {
      const touch = await getSupportedBiometryType()
      if (touch === 'FaceID') return this.setState({ touch: touch })
      if (touch === 'TouchID') return this.setState({ touch: touch })
      if (touch === 'Fingerprint') return this.setState({ touch: 'TouchID' })
      if (touch) return this.setState({ touch: 'TouchID' })
      return this.setState({ touch: false })
    } catch (error) {
      console.log(error)
      return this.setState({ touch: false })
    }
  }
}
