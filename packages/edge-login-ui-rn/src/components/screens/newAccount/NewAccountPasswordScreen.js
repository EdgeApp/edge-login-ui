// @flow

import { type EdgePasswordRules } from 'edge-core-js'
import * as React from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { validateConfirmPassword } from '../../../actions/CreateAccountActions.js'
import s from '../../../common/locales/strings.js'
import PasswordConfirmConnector from '../../../connectors/componentConnectors/PasswordConfirmConnector'
import PasswordConnector from '../../../connectors/componentConnectors/PasswordConnector.js'
import * as Styles from '../../../styles/index.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import { scale } from '../../../util/scaling.js'
import { PasswordStatus } from '../../abSpecific/PasswordStatusComponent.js'
import { Button } from '../../common/Button.js'
import { Header } from '../../common/Header.js'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'
import { connect } from '../../services/ReduxStore.js'

type OwnProps = {}
type StateProps = {
  confirmPassword: string,
  error: string,
  error2: string,
  password: string,
  passwordStatus: EdgePasswordRules | null
}
type DispatchProps = {
  checkTheConfirmPassword(): void,
  onBack(): void,
  onDone(): void
}
type Props = OwnProps & StateProps & DispatchProps

type State = {
  isProcessing: boolean,
  focusFirst: boolean,
  focusSecond: boolean
}

class NewAccountPasswordScreenComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isProcessing: false,
      focusFirst: true,
      focusSecond: false
    }
  }

  render() {
    return (
      <SafeAreaView>
        <KeyboardAwareScrollView
          style={NewAccountPasswordScreenStyle.screen}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={NewAccountPasswordScreenStyle.mainScrollView}
        >
          <Header onBack={this.props.onBack} />
          {this.renderMain(NewAccountPasswordScreenStyle)}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }

  renderMain(styles: typeof NewAccountPasswordScreenStyle) {
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

  renderInterior(styles: typeof NewAccountPasswordScreenStyle) {
    return (
      <View style={styles.innerView}>
        <PasswordStatus />
        <PasswordConnector
          label={s.strings.password}
          style={styles.inputBox}
          autoFocus={this.state.focusFirst}
          onFinish={this.handleFocusSwitch}
        />
        <PasswordConfirmConnector
          label={s.strings.confirm_password}
          style={styles.inputBox}
          autoFocus={this.state.focusSecond}
          onFinish={this.handleNext}
        />
        <View style={styles.passwordShim} />
        <Button
          onPress={this.handleNext}
          downStyle={styles.nextButton.downStyle}
          downTextStyle={styles.nextButton.downTextStyle}
          upStyle={styles.nextButton.upStyle}
          upTextStyle={styles.nextButton.upTextStyle}
          label={s.strings.next_label}
          isThinking={this.state.isProcessing}
          doesThink
        />
      </View>
    )
  }

  handleFocusSwitch = () => {
    this.setState({
      focusFirst: false,
      focusSecond: true
    })
  }

  handleNext = () => {
    this.setState({
      isProcessing: true
    })
    if (!this.props.passwordStatus) {
      // TODO Skip component
      this.setState({
        isProcessing: false
      })
      return
    }
    if (this.props.error !== '' || this.props.error2 !== '') {
      this.setState({
        isProcessing: false
      })
      global.firebase &&
        global.firebase.analytics().logEvent(`Signup_Password_Invalid`)
      return
    }
    if (
      this.props.password &&
      this.props.password !== this.props.confirmPassword
    ) {
      this.setState({
        isProcessing: false
      })
      this.props.checkTheConfirmPassword()
      global.firebase &&
        global.firebase.analytics().logEvent(`Signup_Password_Invalid`)
      return
    }
    global.firebase &&
      global.firebase.analytics().logEvent(`Signup_Password_Valid`)
    this.props.onDone()
  }
}

const NewAccountPasswordScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  mainScrollView: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  scrollViewContentContainer: {
    alignItems: 'center'
  },
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
  },
  passwordShim: { width: '100%', height: 1, marginTop: scale(35) }
}

export const NewAccountPasswordScreen = connect<
  StateProps,
  DispatchProps,
  OwnProps
>(
  (state: RootState) => ({
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
    onBack() {
      dispatch({ type: 'WORKFLOW_BACK' })
    },
    onDone() {
      dispatch({ type: 'WORKFLOW_NEXT' })
    }
  })
)(NewAccountPasswordScreenComponent)
