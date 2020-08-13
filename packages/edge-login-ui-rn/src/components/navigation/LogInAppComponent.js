// @flow

import React, { Component } from 'react'
import { View } from 'react-native'

import { getPreviousUsers } from '../../actions/PreviousUsersActions.js'
import { getSupportedBiometryType } from '../../keychain.js'
import {
  type LoginUserInfo,
  type PreviousUsersState
} from '../../reducers/PreviousUsersReducer.js'
import { type WorkflowState } from '../../reducers/WorkflowReducer.js'
import * as Styles from '../../styles/index.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { ForgotPasswordChangePassword } from '../screens/existingAccout/ChangeAccountPasswordScreenComponent.js'
import { ForgotPinChangePinScene } from '../screens/existingAccout/ChangeAccountPinScreenComponent.js'
import { LoginWithRecoveryQuestionsScreen } from '../screens/existingAccout/LoginWithRecoveryQuestionsScreenComponent.js'
import { OtpErrorScreen } from '../screens/existingAccout/OtpErrorScreenComponent.js'
import { LandingScreen } from '../screens/LandingScreenComponent.js'
import { LoadingScreen } from '../screens/LoadingScreenComponent.js'
import { LoginUsernamePasswordScreen } from '../screens/LoginUsernamePasswordScreenComponent.js'
import { CreatingAccountWaitScreen } from '../screens/newAccount/CreatingAccountWaitScreenComponent.js'
import { NewAccountPasswordScreen } from '../screens/newAccount/NewAccountPasswordScreenComponent.js'
import { NewAccountReviewScreen } from '../screens/newAccount/NewAccountReviewScreenComponent.js'
import { NewAccountUsernameScreen } from '../screens/newAccount/NewAccountUsernameScreenComponent.js'
import { NewAccountWelcomeScreen } from '../screens/newAccount/NewAccountWelcomeScreenComponent.js'
import { SetAccountPinScreen } from '../screens/newAccount/SetAccountPinScreenComponent.js'
import { TermsAndConditionsScreen } from '../screens/newAccount/TermsAndConditionsScreenComponent.js'
import { PinLoginScreen } from '../screens/PinLogInScreenComponent.js'
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
  workflow: WorkflowState
}
type DispatchProps = {
  getPreviousUsers(): void,
  startRecoveryWorkflow(backupKey: string): void
}
type State = {
  touch: string | boolean
}

type Props = StateProps & OwnProps & DispatchProps

class LoginAppComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      touch: false
    }
    this.props.getPreviousUsers()
    this.checkTouchEnabled()
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
      case 'firstLoadWF':
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
          if (this.props.lastUser.touchEnabled && this.state.touch) {
            return this.getPinScreen()
          }
        }
        // we have previous users, but no pin enabled previous user.
        return this.getPasswordScreen()

      case 'initalizeWF':
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
        return <SetAccountPinScreen />
      case 4:
        return <CreatingAccountWaitScreen />
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
      <LoginUsernamePasswordScreen
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
      <PinLoginScreen
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
    return <OtpErrorScreen />
  }

  getRecoveryLoginScreen() {
    switch (this.props.workflow.currentSceneIndex) {
      case 0:
        return <LoginWithRecoveryQuestionsScreen />
      case 1:
        return <ForgotPasswordChangePassword />
      case 2:
        return <ForgotPinChangePinScene />
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

export const LoginApp = connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    lastUser: state.previousUsers.lastUser,
    previousUsers: state.previousUsers,
    workflow: state.workflow
  }),
  (dispatch: Dispatch) => ({
    getPreviousUsers() {
      dispatch(getPreviousUsers())
    },
    startRecoveryWorkflow(backupKey) {
      dispatch({ type: 'SET_RECOVERY_KEY', data: backupKey })
    }
  })
)(LoginAppComponent)
