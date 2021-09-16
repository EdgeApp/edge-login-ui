import * as React from 'react'
import { View } from 'react-native'

import s from '../../common/locales/strings'
import { SceneNames } from '../../constants/workflows'
import { SceneState } from '../../reducers/WorkflowReducer'
import * as Styles from '../../styles/index'
import { Branding } from '../../types/Branding'
import { Dispatch, RootState } from '../../types/ReduxTypes'
import { MaybeProvideLoginUi } from '../publicApi/LoginUiProvider'
import {
  PublicChangePasswordScreen,
  ResecurePasswordScreen
} from '../screens/existingAccout/ChangePasswordScreen'
import {
  PublicChangePinScreen,
  ResecurePinScreen
} from '../screens/existingAccout/ChangePinScreen'
import { PublicChangeRecoveryScreen } from '../screens/existingAccout/ChangeRecoveryScreen'
import { OtpRepairScreen } from '../screens/existingAccout/OtpRepairScreen'
import { SecurityAlertsScreen } from '../screens/existingAccout/SecurityAlertsScreen'
import { LandingScreen } from '../screens/LandingScreen'
import { LoadingScreen } from '../screens/LoadingScreen'
import { NewAccountPasswordScreen } from '../screens/newAccount/NewAccountPasswordScreen'
import { NewAccountPinScreen } from '../screens/newAccount/NewAccountPinScreen'
import { NewAccountReviewScreen } from '../screens/newAccount/NewAccountReviewScreen'
import { NewAccountTosScreen as NewAccountTOSScreen } from '../screens/newAccount/NewAccountTosScreen'
import { NewAccountUsernameScreen } from '../screens/newAccount/NewAccountUsernameScreen'
import { NewAccountWelcomeScreen } from '../screens/newAccount/NewAccountWelcomeScreen'
import { OtpErrorScreen } from '../screens/OtpErrorScreen'
import { PasswordLoginScreen } from '../screens/PasswordLoginScreen'
import { PinLoginScreen } from '../screens/PinLoginScreen'
import { RecoveryLoginScreen } from '../screens/RecoveryLoginScreen'
import { WaitScreen } from '../screens/WaitScreen'
import { connect } from '../services/ReduxStore'
import { ThemeProvider } from '../services/ThemeContext'

interface OwnProps {
  branding: Branding
  showHeader: boolean
}
interface StateProps {
  scene: SceneState
}
type Props = OwnProps & StateProps

class RouterComponent extends React.Component<Props> {
  render() {
    const { ScreenStyle } = Styles
    return (
      <ThemeProvider>
        <MaybeProvideLoginUi>
          <View accessible style={ScreenStyle}>
            {this.renderContent()}
          </View>
        </MaybeProvideLoginUi>
      </ThemeProvider>
    )
  }

  // TODO:
  renderContent() {
    switch (this.props.scene.currentScene) {
      case SceneNames.changePasswordScene:
        return <PublicChangePasswordScreen showHeader={this.props.showHeader} />
      case SceneNames.changePinScene:
        return <PublicChangePinScreen showHeader={this.props.showHeader} />
      case SceneNames.changeRecoveryScene:
        return <PublicChangeRecoveryScreen showHeader={this.props.showHeader} />
      case SceneNames.newAccountWelcomeScene:
        return <NewAccountWelcomeScreen branding={this.props.branding} />
      case SceneNames.newAccountUsernameScreen:
        return <NewAccountUsernameScreen branding={this.props.branding} />
      case SceneNames.newAccountPasswordScreen:
        return <NewAccountPasswordScreen />
      case SceneNames.newAccountPinScreen:
        return <NewAccountPinScreen />
      case SceneNames.newAccountTOSScreen:
        return <NewAccountTOSScreen branding={this.props.branding} />
      case SceneNames.newAccountWaitScreen:
        return (
          <WaitScreen
            title={s.strings.good_job}
            message={s.strings.hang_tight + '\n' + s.strings.secure_account}
          />
        )
      case SceneNames.newAccountReviewScreen:
        return <NewAccountReviewScreen />
      case SceneNames.landingScene:
        return <LandingScreen branding={this.props.branding} />
      case SceneNames.loadingScene:
        return <LoadingScreen branding={this.props.branding} />
      case SceneNames.otpScene:
        return <OtpErrorScreen />
      case SceneNames.otpRepairScene:
        return <OtpRepairScreen />
      case SceneNames.passwordScene:
        return <PasswordLoginScreen branding={this.props.branding} />
      case SceneNames.pinScene:
        return <PinLoginScreen branding={this.props.branding} />
      case SceneNames.recoveryLoginScene:
        return <RecoveryLoginScreen />
      case SceneNames.resecurePasswordScreen:
        return <ResecurePasswordScreen showHeader={this.props.showHeader} />
      case SceneNames.resecurePinScreen:
        return <ResecurePinScreen showHeader={this.props.showHeader} />
      case SceneNames.securityAlertScene:
        return <SecurityAlertsScreen />
    }
  }
}

export const Router = connect<StateProps, {}, OwnProps>(
  (state: RootState) => ({
    scene: state.scene
  }),
  (dispatch: Dispatch) => ({})
)(RouterComponent)
