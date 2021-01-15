// @flow

import * as React from 'react'
import { View } from 'react-native'

import { type WorkflowState } from '../../reducers/WorkflowReducer.js'
import * as Styles from '../../styles/index.js'
import { type Branding } from '../../types/Branding.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { ResecurePasswordScreen } from '../screens/existingAccout/ChangePasswordScreen.js'
import { ResecurePinScreen } from '../screens/existingAccout/ChangePinScreen.js'
import { SecurityAlertsScreen } from '../screens/existingAccout/SecurityAlertsScreen.js'
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
  branding: Branding
}
type StateProps = {
  workflow: WorkflowState
}
type Props = OwnProps & StateProps

class RouterComponent extends React.Component<Props> {
  render() {
    const { ScreenStyle } = Styles
    return (
      <View accessible style={ScreenStyle}>
        {this.renderContent()}
      </View>
    )
  }

  renderContent() {
    switch (this.props.workflow.currentKey) {
      case 'loadingWF':
        return this.getLoadingScreen()
      case 'landingWF':
        return this.getLandingScreen()
      case 'passwordWF':
        return this.getPasswordScreen()
      case 'pinWF':
        return this.getPinScreen()
      case 'createWF':
        return this.getCreateScreen()
      case 'otpWF':
        return this.getOtpScreen()
      case 'recoveryLoginWF':
        return this.getRecoveryLoginScreen()
      case 'resecureWF':
        return this.getResecureScreen()
      case 'securityAlertWF':
        return this.getSecurityAlertScreen()
    }
  }

  getLoadingScreen() {
    return <LoadingScreen branding={this.props.branding} />
  }

  getLandingScreen() {
    return <LandingScreen branding={this.props.branding} />
  }

  getCreateScreen() {
    switch (this.props.workflow.currentSceneIndex) {
      case 0:
        return <NewAccountWelcomeScreen branding={this.props.branding} />
      case 1:
        return <NewAccountUsernameScreen branding={this.props.branding} />
      case 2:
        return <NewAccountPasswordScreen />
      case 3:
        return <NewAccountPinScreen />
      case 4:
        return <NewAccountWaitScreen />
      case 5:
        return <NewAccountReviewScreen />
      case 6:
        return <TermsAndConditionsScreen branding={this.props.branding} />
      default:
        return <NewAccountWelcomeScreen branding={this.props.branding} />
    }
  }

  getPasswordScreen() {
    return <PasswordLoginScreen branding={this.props.branding} />
  }

  getPinScreen() {
    return <PinLoginScreen branding={this.props.branding} />
  }

  getOtpScreen() {
    return <OtpErrorScreen />
  }

  getRecoveryLoginScreen() {
    return <RecoveryLoginScreen />
  }

  getResecureScreen() {
    switch (this.props.workflow.currentSceneIndex) {
      case 0:
        return <ResecurePasswordScreen />
      case 1:
        return <ResecurePinScreen />
    }
  }

  getSecurityAlertScreen() {
    return <SecurityAlertsScreen />
  }
}

export const Router = connect<StateProps, {}, OwnProps>(
  (state: RootState) => ({
    workflow: state.workflow
  }),
  (dispatch: Dispatch) => ({})
)(RouterComponent)
