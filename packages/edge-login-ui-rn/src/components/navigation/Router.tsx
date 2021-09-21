import * as React from 'react'
import { View } from 'react-native'

import s from '../../common/locales/strings'
import { SceneState } from '../../reducers/SceneReducer'
import * as Styles from '../../styles/index'
import { Branding } from '../../types/Branding'
import { Dispatch, RootState } from '../../types/ReduxTypes'
import { MaybeProvideLoginUi } from '../publicApi/LoginUiProvider'
import {
  PublicChangePasswordScene,
  ResecurePasswordScene
} from '../scenes/existingAccout/ChangePasswordScene'
import {
  PublicChangePinScene,
  ResecurePinScene
} from '../scenes/existingAccout/ChangePinScene'
import { PublicChangeRecoveryScene } from '../scenes/existingAccout/ChangeRecoveryScene'
import { OtpRepairScene } from '../scenes/existingAccout/OtpRepairScene'
import { SecurityAlertsScene } from '../scenes/existingAccout/SecurityAlertsScene'
import { LandingScene } from '../scenes/LandingScene'
import { LoadingScene } from '../scenes/LoadingScene'
import { NewAccountPasswordScene } from '../scenes/newAccount/NewAccountPasswordScene'
import { NewAccountPinScene } from '../scenes/newAccount/NewAccountPinScene'
import { NewAccountReviewScene } from '../scenes/newAccount/NewAccountReviewScene'
import { NewAccountTosScene } from '../scenes/newAccount/NewAccountTosScene'
import { NewAccountUsernameScene } from '../scenes/newAccount/NewAccountUsernameScene'
import { NewAccountWelcomeScene } from '../scenes/newAccount/NewAccountWelcomeScene'
import { OtpErrorScene } from '../scenes/OtpErrorScene'
import { PasswordLoginScene } from '../scenes/PasswordLoginScene'
import { PinLoginScene } from '../scenes/PinLoginScene'
import { RecoveryLoginScene } from '../scenes/RecoveryLoginScene'
import { WaitScene } from '../scenes/WaitScene'
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
    const { SceneStyle } = Styles
    return (
      <ThemeProvider>
        <MaybeProvideLoginUi>
          <View accessible style={SceneStyle}>
            {this.renderContent()}
          </View>
        </MaybeProvideLoginUi>
      </ThemeProvider>
    )
  }

  renderContent() {
    switch (this.props.scene.currentScene) {
      case 'ChangePasswordScene':
        return <PublicChangePasswordScene showHeader={this.props.showHeader} />
      case 'ChangePinScene':
        return <PublicChangePinScene showHeader={this.props.showHeader} />
      case 'ChangeRecoveryScene':
        return <PublicChangeRecoveryScene showHeader={this.props.showHeader} />
      case 'NewAccountWelcomeScene':
        return <NewAccountWelcomeScene branding={this.props.branding} />
      case 'NewAccountUsernameScene':
        return <NewAccountUsernameScene branding={this.props.branding} />
      case 'NewAccountPasswordScene':
        return <NewAccountPasswordScene />
      case 'NewAccountPinScene':
        return <NewAccountPinScene />
      case 'NewAccountTosScene':
        return <NewAccountTosScene branding={this.props.branding} />
      case 'NewAccountWaitScene':
        return (
          <WaitScene
            title={s.strings.good_job}
            message={s.strings.hang_tight + '\n' + s.strings.secure_account}
          />
        )
      case 'NewAccountReviewScene':
        return <NewAccountReviewScene />
      case 'LandingScene':
        return <LandingScene branding={this.props.branding} />
      case 'LoadingScene':
        return <LoadingScene branding={this.props.branding} />
      case 'OtpScene':
        return <OtpErrorScene />
      case 'OtpRepairScene':
        return <OtpRepairScene />
      case 'PasswordScene':
        return <PasswordLoginScene branding={this.props.branding} />
      case 'PinScene':
        return <PinLoginScene branding={this.props.branding} />
      case 'RecoveryLoginScene':
        return <RecoveryLoginScene />
      case 'ResecurePasswordScene':
        return <ResecurePasswordScene showHeader={this.props.showHeader} />
      case 'ResecurePinScene':
        return <ResecurePinScene showHeader={this.props.showHeader} />
      case 'SecurityAlertScene':
        return <SecurityAlertsScene />
    }
  }
}

export const Router = connect<StateProps, {}, OwnProps>(
  (state: RootState) => ({
    scene: state.scene
  }),
  (dispatch: Dispatch) => ({})
)(RouterComponent)
