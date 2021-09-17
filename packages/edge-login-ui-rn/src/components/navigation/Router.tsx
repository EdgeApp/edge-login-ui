import * as React from 'react'
import { View } from 'react-native'

import s from '../../common/locales/strings'
import { WorkflowState } from '../../reducers/WorkflowReducer'
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
  workflow: WorkflowState
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
    switch (this.props.workflow.currentKey) {
      case 'changePasswordWF':
        return <PublicChangePasswordScene showHeader={this.props.showHeader} />
      case 'changePinWF':
        return <PublicChangePinScene showHeader={this.props.showHeader} />
      case 'changeRecoveryWF':
        return <PublicChangeRecoveryScene showHeader={this.props.showHeader} />
      case 'createWF':
        return this.getCreateScene()
      case 'landingWF':
        return <LandingScene branding={this.props.branding} />
      case 'loadingWF':
        return <LoadingScene branding={this.props.branding} />
      case 'otpWF':
        return <OtpErrorScene />
      case 'otpRepairWF':
        return <OtpRepairScene />
      case 'passwordWF':
        return <PasswordLoginScene branding={this.props.branding} />
      case 'pinWF':
        return <PinLoginScene branding={this.props.branding} />
      case 'recoveryLoginWF':
        return <RecoveryLoginScene />
      case 'resecureWF':
        return this.getResecureScene()
      case 'securityAlertWF':
        return <SecurityAlertsScene />
    }
  }

  getCreateScene() {
    switch (this.props.workflow.currentSceneIndex) {
      case 0:
        return <NewAccountWelcomeScene branding={this.props.branding} />
      case 1:
        return <NewAccountUsernameScene branding={this.props.branding} />
      case 2:
        return <NewAccountPasswordScene />
      case 3:
        return <NewAccountPinScene />
      case 4:
        return <NewAccountTosScene branding={this.props.branding} />
      case 5:
        return (
          <WaitScene
            title={s.strings.good_job}
            message={s.strings.hang_tight + '\n' + s.strings.secure_account}
          />
        )
      case 6:
        return <NewAccountReviewScene />
      default:
        return <NewAccountWelcomeScene branding={this.props.branding} />
    }
  }

  getResecureScene() {
    switch (this.props.workflow.currentSceneIndex) {
      case 0:
        return <ResecurePasswordScene showHeader={this.props.showHeader} />
      case 1:
        return <ResecurePinScene showHeader={this.props.showHeader} />
    }
  }
}

export const Router = connect<StateProps, {}, OwnProps>(
  (state: RootState) => ({
    workflow: state.workflow
  }),
  (dispatch: Dispatch) => ({})
)(RouterComponent)
