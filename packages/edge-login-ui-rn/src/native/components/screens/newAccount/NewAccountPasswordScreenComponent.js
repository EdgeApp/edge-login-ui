// @flow

import { type EdgePasswordRules } from 'edge-core-js'
import React, { Component } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'

import { validateConfirmPassword } from '../../../../common/actions/CreateAccountActions.js'
import s from '../../../../common/locales/strings'
import { type WorkflowState } from '../../../../common/reducers/WorkflowReducer.js'
import { type Dispatch, type RootState } from '../../../../types/ReduxTypes.js'
import SkipModalConnector from '../../../connectors/abSpecific/SkipModalConnector'
import HeaderConnector from '../../../connectors/componentConnectors/HeaderConnector'
import PasswordConfirmConnector from '../../../connectors/componentConnectors/PasswordConfirmConnector'
import PasswordConnector from '../../../connectors/componentConnectors/PasswordConnector.js'
import * as Styles from '../../../styles/index.js'
import { PasswordStatus } from '../../abSpecific/PasswordStatusComponent.js'
import { Button } from '../../common'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'

type OwnProps = {}
type StateProps = {
  confirmPassword: string,
  error: string,
  error2: string,
  password: string,
  passwordStatus: EdgePasswordRules | null,
  workflow: WorkflowState
}
type DispatchProps = {
  checkTheConfirmPassword(): void,
  nextScreen(): void
}
type Props = OwnProps & StateProps & DispatchProps

type State = {
  isProcessing: boolean,
  focusFirst: boolean,
  focusSecond: boolean
}

class NewAccountPasswordScreenComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isProcessing: false,
      focusFirst: true,
      focusSecond: false
    }
  }

  render() {
    const { NewAccountPasswordScreenStyle } = Styles
    return (
      <SafeAreaView>
        <KeyboardAwareScrollView
          style={NewAccountPasswordScreenStyle.screen}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={NewAccountPasswordScreenStyle.mainScrollView}
        >
          <HeaderConnector style={NewAccountPasswordScreenStyle.header} />
          {this.renderMain(NewAccountPasswordScreenStyle)}
          {this.renderModal(NewAccountPasswordScreenStyle)}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }

  renderMain(styles: Object) {
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

  renderInterior(styles: Object) {
    return (
      <View style={styles.innerView}>
        <PasswordStatus style={styles.status} />
        <PasswordConnector
          label={s.strings.password}
          style={styles.inputBox}
          autoFocus={this.state.focusFirst}
          onFinish={this.onSetNextFocus}
        />
        <PasswordConfirmConnector
          label={s.strings.confirm_password}
          style={styles.inputBox}
          autoFocus={this.state.focusSecond}
          onFinish={this.onNextPress}
        />
        <View style={styles.passwordShim} />
        <Button
          onPress={this.onNextPress}
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

  renderModal(style: Object) {
    if (this.props.workflow.showModal) {
      return <SkipModalConnector />
    }
    return null
  }

  onSetNextFocus = () => {
    this.setState({
      focusFirst: false,
      focusSecond: true
    })
  }

  onNextPress = () => {
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
    this.props.nextScreen()
  }
}

export const NewAccountPasswordScreen = connect(
  (state: RootState): StateProps => ({
    confirmPassword: state.create.confirmPassword || '',
    error: state.create.confirmPasswordErrorMessage || '',
    error2: state.create.createPasswordErrorMessage || '',
    password: state.create.password || '',
    passwordStatus: state.create.passwordStatus,
    workflow: state.workflow
  }),
  (dispatch: Dispatch): DispatchProps => ({
    checkTheConfirmPassword() {
      dispatch(validateConfirmPassword())
    },
    nextScreen() {
      dispatch({ type: 'WORKFLOW_NEXT' })
    }
  })
)(NewAccountPasswordScreenComponent)
