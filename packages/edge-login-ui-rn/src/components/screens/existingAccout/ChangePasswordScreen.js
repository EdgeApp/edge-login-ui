// @flow

import { type EdgeAccount, type EdgePasswordRules } from 'edge-core-js'
import * as React from 'react'
import { Keyboard, KeyboardAvoidingView, ScrollView, View } from 'react-native'

import { validateConfirmPassword } from '../../../actions/CreateAccountActions.js'
import { onComplete } from '../../../actions/WorkflowActions.js'
import s from '../../../common/locales/strings.js'
import PasswordConfirmConnector from '../../../connectors/componentConnectors/PasswordConfirmConnector'
import PasswordConnector from '../../../connectors/componentConnectors/PasswordConnector.js'
import * as Constants from '../../../constants/index.js'
import * as Styles from '../../../styles/index.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import { scale } from '../../../util/scaling.js'
import { getAccount } from '../../../util/selectors.js'
import { PasswordStatus } from '../../abSpecific/PasswordStatusComponent.js'
import { Button } from '../../common/Button.js'
import { Header } from '../../common/Header.js'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'
import { ButtonsModal } from '../../modals/ButtonsModal.js'
import { Airship, showError } from '../../services/AirshipInstance.js'
import { connect } from '../../services/ReduxStore.js'

type OwnProps = {
  showHeader?: boolean
}
type StateProps = {
  account: EdgeAccount,
  confirmPassword: string,
  error?: string,
  error2?: string,
  password: string,
  passwordStatus: EdgePasswordRules | null
}
type DispatchProps = {
  checkTheConfirmPassword(): void,
  onDone: () => void,
  onBack?: () => void,
  onSkip?: () => void
}
type Props = OwnProps & StateProps & DispatchProps

type State = {
  focusFirst: boolean,
  focusSecond: boolean,
  isProcessing: boolean
}

class ChangePasswordScreenComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isProcessing: false,
      focusFirst: true,
      focusSecond: false
    }
  }

  handleFocusSwitch = () => {
    this.setState({
      focusFirst: false,
      focusSecond: true
    })
  }

  handleSubmit = () => {
    const { account, password, onDone } = this.props
    if (
      !this.props.passwordStatus ||
      this.props.error !== '' ||
      this.props.error2 !== ''
    ) {
      return
    }
    if (
      this.props.password &&
      this.props.password !== this.props.confirmPassword
    ) {
      this.props.checkTheConfirmPassword()
      return
    }

    Keyboard.dismiss()
    this.setState({ isProcessing: true })
    account
      .changePassword(password)
      .then(onDone)
      .catch(error => {
        this.setState({ isProcessing: false })
        showError(error)
      })
  }

  renderHeader = () => {
    if (this.props.showHeader) {
      return <Header onBack={this.props.onBack} onSkip={this.props.onSkip} />
    }
    return null
  }

  renderInterior = (styles: typeof NewAccountPasswordScreenStyle) => {
    return (
      <View style={styles.innerView}>
        <PasswordStatus />
        <PasswordConnector
          style={styles.inputBox}
          autoFocus={this.state.focusFirst}
          label={s.strings.new_password}
          onFinish={this.handleFocusSwitch}
        />
        <View style={{ height: scale(20) }} />
        <PasswordConfirmConnector
          style={styles.inputBox}
          label={s.strings.re_enter_new_password}
          isSelected={this.state.focusSecond}
          autoFocus={this.state.focusSecond}
          onFinish={this.handleSubmit}
        />
        <View style={{ height: scale(40) }} />
        <Button
          onPress={this.handleSubmit}
          downStyle={styles.nextButton.downStyle}
          downTextStyle={styles.nextButton.downTextStyle}
          upStyle={styles.nextButton.upStyle}
          upTextStyle={styles.nextButton.upTextStyle}
          label={s.strings.done}
          isThinking={this.state.isProcessing}
          doesThink
        />
      </View>
    )
  }

  renderMain = (styles: typeof NewAccountPasswordScreenStyle) => {
    if (this.state.focusSecond) {
      return (
        <KeyboardAvoidingView
          style={styles.pageContainer}
          contentContainerStyle={styles.pageContainer}
          behavior="position"
          keyboardVerticalOffset={-150}
        >
          {this.renderInterior(styles)}
        </KeyboardAvoidingView>
      )
    }
    return (
      <View style={styles.pageContainer}>{this.renderInterior(styles)}</View>
    )
  }

  render() {
    return (
      <SafeAreaView>
        <View style={NewAccountPasswordScreenStyle.screen}>
          {this.renderHeader()}
          <ScrollView keyboardShouldPersistTaps="always">
            {this.renderMain(NewAccountPasswordScreenStyle)}
            <View style={{ backgroundColor: Constants.WHITE, height: 360 }} />
          </ScrollView>
        </View>
      </SafeAreaView>
    )
  }
}

const NewAccountPasswordScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  pageContainer: {
    width: '100%',
    alignItems: 'center',
    flex: 1
  },
  innerView: {
    height: '100%',
    width: '100%',
    alignItems: 'center'
  },
  nextButton: {
    upStyle: Styles.PrimaryButtonUpScaledStyle,
    upTextStyle: Styles.PrimaryButtonUpTextScaledStyle,
    downTextStyle: Styles.PrimaryButtonUpTextScaledStyle,
    downStyle: Styles.PrimaryButtonDownScaledStyle
  },
  inputBox: {
    ...Styles.MaterialInputOnWhiteScaled,
    marginTop: scale(15)
  }
}

export const PublicChangePasswordScreen = connect<
  StateProps,
  DispatchProps,
  OwnProps
>(
  (state: RootState) => ({
    account: getAccount(state),
    confirmPassword: state.create.confirmPassword || '',
    error: state.create.confirmPasswordErrorMessage || '',
    error2: state.create.createPasswordErrorMessage || '',
    password: state.create.password || '',
    passwordStatus: state.create.passwordStatus
  }),
  (dispatch: Dispatch) => ({
    checkTheConfirmPassword() {
      dispatch(validateConfirmPassword())
    },
    onDone() {
      Airship.show(bridge => (
        <ButtonsModal
          bridge={bridge}
          title={s.strings.password_changed}
          message={s.strings.pwd_change_modal}
          buttons={{ ok: { label: s.strings.ok } }}
        />
      ))
        .then(() => dispatch(onComplete()))
        .catch(showError)
    },
    onBack() {
      dispatch(onComplete())
    }
  })
)(ChangePasswordScreenComponent)

export const ResecurePasswordScreen = connect<
  StateProps,
  DispatchProps,
  OwnProps
>(
  (state: RootState) => ({
    account: getAccount(state),
    confirmPassword: state.create.confirmPassword || '',
    error: state.create.confirmPasswordErrorMessage || '',
    error2: state.create.createPasswordErrorMessage || '',
    password: state.create.password || '',
    passwordStatus: state.create.passwordStatus
  }),
  (dispatch: Dispatch) => ({
    checkTheConfirmPassword() {
      dispatch(validateConfirmPassword())
    },
    onDone() {
      dispatch({ type: 'WORKFLOW_NEXT' })
    },
    onSkip() {
      dispatch(dispatch({ type: 'WORKFLOW_NEXT' }))
    }
  })
)(ChangePasswordScreenComponent)
