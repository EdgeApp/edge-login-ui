// @flow

import React, { Component } from 'react'
import { View } from 'react-native'

import { initializeLogin } from '../../actions/LoginInitActions.js'
import {
  type LoginUserInfo,
  type PreviousUsersState
} from '../../reducers/PreviousUsersReducer.js'
import { type WorkflowState } from '../../reducers/WorkflowReducer.js'
import * as Styles from '../../styles/index.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { RecoveryChangePasswordScreen } from '../screens/existingAccout/ChangePasswordScreen.js'
import { RecoveryChangePinScreen } from '../screens/existingAccout/ChangePinScreen.js'
import { LandingScreen } from '../screens/LandingScreen.js'
import { LoadingScreen } from '../screens/LoadingScreen.js'
import { NewAccountPasswordScreen } from '../screens/newAccount/NewAccountPasswordScreen.js'
import { NewAccountPinScreen } from '../screens/newAccount/NewAccountPinScreen.js'
import { NewAccountReviewScreen } from '../screens/newAccount/NewAccountReviewScreen.js'
import { NewAccountUsernameScreen } from '../screens/newAccount/NewAccountUsernameScreen.js'
import { NewAccountWaitScreen } from '../screens/newAccount/NewAccountWaitScreen.js'
import { NewAccountWelcomeScreen } from '../screens/newAccount/NewAccountWelcomeScreen.js'
import { TermsAndConditionsScreen } from '../screens/newAccount/TermsAndConditionsScreen.js'
import { OtpErrorScreen } from '../screens/OtpErrorScreen.js'
import { PasswordLoginScreen } from '../screens/PasswordLoginScreen.js'
import { PinLoginScreen } from '../screens/PinLoginScreen.js'
import { RecoveryLoginScreen } from '../screens/RecoveryLoginScreen.js'
import { connect } from '../services/ReduxStore.js'

type OwnProps = {
  appId?: string,
  appName?: string,
  backgroundImage?: any,
  landingScreenText?: string,
  parentButton?: Object,
  primaryLogo?: any,
  primaryLogoCallback?: () => void,
  recoveryLogin?: string
}
type StateProps = {
  lastUser?: LoginUserInfo,
  previousUsers: PreviousUsersState,
  touch: $PropertyType<RootState, 'touch'>,
  workflow: WorkflowState
}
type DispatchProps = {
  initializeLogin(): void,
  startRecoveryWorkflow(backupKey: string): void
}
type Props = StateProps & OwnProps & DispatchProps

class LoginAppComponent extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.props.initializeLogin()
  }

  render() {
    const { ScreenStyle } = Styles
    return (
      <View accessible style={ScreenStyle}>
        {this.renderContent()}
      </View>
    )
  }

  renderContent() {
    if (!this.props.previousUsers.loaded && !this.props.recoveryLogin) {
      return this.getLoadingScreen()
    }
    switch (this.props.workflow.currentKey) {
      case 'loadingWF':
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
          if (this.props.lastUser.pinEnabled) {
            return this.getPinScreen()
          }
          if (this.props.lastUser.touchEnabled && this.props.touch) {
            return this.getPinScreen()
          }
        }
        // we have previous users, but no pin enabled previous user.
        return this.getPasswordScreen()

      case 'landingWF':
        return this.getLandingScreen()
      case 'passwordWF':
        if (this.props.recoveryLogin) {
          this.props.startRecoveryWorkflow(this.props.recoveryLogin)
          return
          // return this.getRecoveryLoginScreen()
        }
        return this.getPasswordScreen()
      case 'passwordWFForced':
        return this.getPasswordScreen()
      case 'pinWF':
        return this.getPinScreen()
      case 'createWF':
        return this.getCreateScreen()
      case 'otpWF':
        return this.getOtpScreen()
      case 'recoveryLoginWF':
        return this.getRecoveryLoginScreen()
    }
  }

  getLoadingScreen() {
    return <LoadingScreen backgroundImage={this.props.backgroundImage} />
  }

  getLandingScreen() {
    return (
      <LandingScreen
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
        return <NewAccountWelcomeScreen appName={this.props.appName || ''} />
      case 1:
        return <NewAccountUsernameScreen appName={this.props.appName || ''} />
      case 2:
        return <NewAccountPasswordScreen />
      case 3:
        return <NewAccountPinScreen />
      case 4:
        return <NewAccountWaitScreen />
      case 5:
        return <NewAccountReviewScreen />
      case 6:
        return <TermsAndConditionsScreen appName={this.props.appName || ''} />
      default:
        return <NewAccountWelcomeScreen appName={this.props.appName || ''} />
    }
  }

  getPasswordScreen() {
    return (
      <PasswordLoginScreen
        appId={this.props.appId}
        backgroundImage={this.props.backgroundImage}
        primaryLogo={this.props.primaryLogo}
        primaryLogoCallback={this.props.primaryLogoCallback}
        parentButton={this.props.parentButton}
      />
    )
  }

  getPinScreen() {
    return (
      <PinLoginScreen
        appId={this.props.appId}
        backgroundImage={this.props.backgroundImage}
        primaryLogo={this.props.primaryLogo}
        primaryLogoCallback={this.props.primaryLogoCallback}
        parentButton={this.props.parentButton}
      />
    )
  }

  getOtpScreen() {
    return <OtpErrorScreen />
  }

  getRecoveryLoginScreen() {
    switch (this.props.workflow.currentSceneIndex) {
      case 0:
        return <RecoveryLoginScreen />
      case 1:
        return <RecoveryChangePasswordScreen />
      case 2:
        return <RecoveryChangePinScreen />
    }
  }
}

export const LoginApp = connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    lastUser: state.previousUsers.lastUser,
    previousUsers: state.previousUsers,
    touch: state.touch,
    workflow: state.workflow
  }),
  (dispatch: Dispatch) => ({
    initializeLogin() {
      dispatch(initializeLogin())
    },
    startRecoveryWorkflow(backupKey) {
      dispatch({ type: 'SET_RECOVERY_KEY', data: backupKey })
    }
  })
)(LoginAppComponent)
