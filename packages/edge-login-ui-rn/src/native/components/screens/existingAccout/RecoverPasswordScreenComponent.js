// @flow

import React, { Component } from 'react'
import { Platform, Text, View } from 'react-native'
import Mailer from 'react-native-mail'

import * as Constants from '../../../../common/constants'
import s from '../../../../common/locales/strings'
import { FullScreenModal } from '../../../components/common/FullScreenModal.js'
import EmailAppFailedModalConnector from '../../../connectors/abSpecific/EmailAppFailedModalConnector'
import SaveRecoveryTokenModalConnector from '../../../connectors/abSpecific/SaveRecoveryTokenModalConnector'
import HeaderConnector from '../../../connectors/componentConnectors/HeaderConnectorChangeApps.js'
import {
  Button,
  DropDownList,
  FormField,
  StaticModal,
  TextAndIconButton,
  TextRowComponent
} from '../../common/'
import ConfirmPasswordRecoveryScreen from './ConfirmPasswordRecoveryScreen'

export type OwnProps = {
  styles: Object,
  showHeader: boolean
}

type StateProps = {
  question1: string,
  question2: string,
  recoveryQuestions: Array<String>,
  backupKey: string,
  showEmailDialog: boolean,
  isEnabled: boolean,
  submitButton: string,
  doneButton: string,
  saveButton: string,
  disableButton: string,
  username: string,
  questionsList: Array<string>
}
type DispatchProps = {
  setAnswers(): void,
  cancel(): void,
  returnToSettings(): void,
  submit(Array<string>, Array<string>): void,
  deleteRecovery(): void
}

type Props = OwnProps & StateProps & DispatchProps

type State = {
  question1: string,
  question2: string,
  answer1: string,
  answer2: string,
  showQuestionPicker: boolean,
  focusFirst: boolean,
  focusSecond: boolean,
  errorOne: boolean,
  errorTwo: boolean,
  errorQuestionOne: boolean,
  errorQuestionTwo: boolean,
  disableConfirmationModal: boolean,
  emailAddress: string,
  emailAppNotAvailable: boolean,
  showConfirmationModal: boolean
}

export default class PasswordRecovery extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      question1: this.props.question1,
      question2: this.props.question2,
      answer1: '',
      answer2: '',
      showQuestionPicker: false,
      focusFirst: false,
      focusSecond: false,
      errorOne: false,
      errorTwo: false,
      errorQuestionOne: false,
      errorQuestionTwo: false,
      disableConfirmationModal: false,
      emailAddress: '',
      emailAppNotAvailable: false,
      showConfirmationModal: false
    }
  }
  componentWillReceiveProps (nextProps: Props) {
    if (nextProps.isEnabled !== this.props.isEnabled) {
      this.setState({
        question1: nextProps.question1,
        question2: nextProps.question2
      })
    }
  }
  renderHeader = (styles: Object) => {
    if (this.props.showHeader) {
      return <HeaderConnector style={styles.header} />
    }
    return null
  }
  onDisable = () => {
    this.props.deleteRecovery()
    this.setState({
      disableConfirmationModal: true
    })
  }
  onDisableModalClose = () => {
    this.props.cancel()
  }
  onSubmit = () => {
    // Launch Modal full Screen
    const errorOne = this.state.answer1.length < 4 || false
    const errorTwo = this.state.answer2.length < 4 || false
    const errorQuestionOne =
      this.state.question1 === Constants.CHOOSE_RECOVERY_QUESTION || false
    const errorQuestionTwo =
      this.state.question2 === Constants.CHOOSE_RECOVERY_QUESTION || false

    this.setState({
      errorOne,
      errorTwo,
      errorQuestionOne,
      errorQuestionTwo
    })
    if (errorOne || errorTwo || errorQuestionOne || errorQuestionTwo) {
      return
    }
    this.setState({
      showConfirmationModal: true
    })
  }
  onConfirmQuestionsAndAnseers = () => {
    console.log('PR: we got thsi .. what ')
    this.setState({
      showConfirmationModal: false
    })
    const questions = [this.state.question1, this.state.question2]
    const answers = [this.state.answer1, this.state.answer2]
    this.props.submit(questions, answers)
  }

  onCancelConfirmation = () => {
    this.setState({
      showConfirmationModal: false
    })
  }
  onSelectQuestionOne = () => {
    this.setState({
      showQuestionPicker: true,
      focusFirst: true,
      focusSecond: false
    })
  }
  onSelectQuestionTwo = () => {
    this.setState({
      showQuestionPicker: true,
      focusFirst: false,
      focusSecond: true
    })
  }
  setAnswer1 = (arg: string) => {
    this.setState({
      answer1: arg
    })
  }
  setAnswer2 = (arg: string) => {
    this.setState({
      answer2: arg
    })
  }
  questionSelected = (data: Object) => {
    const question = data.question
    if (this.state.focusFirst) {
      this.setState({
        question1: question,
        showQuestionPicker: false
      })
      return
    }
    this.setState({
      question2: question,
      showQuestionPicker: false
    })
  }
  renderItems = (item: Object) => {
    const { RecoverPasswordSceneStyles } = this.props.styles
    return (
      <TextRowComponent
        style={RecoverPasswordSceneStyles.listItem}
        data={item.item}
        title={item.item.question}
        onPress={this.questionSelected}
        numberOfLines={3}
      />
    )
  }
  renderQuestions = (styles: Object) => {
    return (
      <View style={styles.body}>
        <DropDownList
          style={styles.questionsList}
          data={this.props.questionsList}
          renderRow={this.renderItems.bind(this)}
        />
      </View>
    )
  }
  updateEmail = (email: string) => {
    this.setState({
      emailAddress: email
    })
  }
  openEmailApp = () => {
    const body =
      s.strings.otp_email_body +
      this.props.username +
      '<br><br>' +
      'iOS <br>edge://recovery?token=' +
      this.props.backupKey +
      '<br><br>' +
      'Android https://recovery.edgesecure.co/recovery?token=' +
      this.props.backupKey

    Mailer.mail(
      {
        subject: s.strings.otp_email_subject,
        recipients: [this.state.emailAddress],
        body: body,
        isHTML: true
      },
      (error, event) => {
        if (error) {
          console.log(error)
          this.setState({
            emailAppNotAvailable: true
          })
        }
        if (event === 'sent') {
          this.props.returnToSettings()
        }
      }
    )
    if (Platform.OS === 'android') {
      setTimeout(() => {
        this.props.returnToSettings()
      }, 1000)
    }
  }
  renderForm = (styles: Object) => {
    const form1Style = this.state.errorOne ? styles.inputError : styles.input
    const form2Style = this.state.errorTwo ? styles.inputError : styles.input
    const errorMessageOne = this.state.errorOne
      ? s.strings.answers_four_chanracters
      : s.strings.answer_case_sensitive
    const errorMessageTwo = this.state.errorTwo
      ? s.strings.answers_four_chanracters
      : s.strings.answer_case_sensitive
    const questionOneStyle = this.state.errorQuestionOne
      ? styles.textIconButtonErrorError
      : styles.textIconButton
    const questionTwoStyle = this.state.errorQuestionOne
      ? styles.textIconButtonErrorError
      : styles.textIconButton

    return (
      <View style={styles.body}>
        <View style={styles.questionRow}>
          <TextAndIconButton
            onPress={this.onSelectQuestionOne}
            icon={Constants.KEYBOARD_ARROW_DOWN}
            iconStyle={Constants.MATERIAL_ICONS}
            style={questionOneStyle}
            numberOfLines={2}
            title={this.state.question1}
          />
        </View>
        <View style={styles.answerRow}>
          <FormField
            style={form1Style}
            autoFocus={this.state.focusFirst}
            autoCorrect={false}
            autoCapitalize={'none'}
            onChangeText={this.setAnswer1}
            value={this.state.answer1}
            label={s.strings.your_answer_label}
            error={errorMessageOne}
          />
        </View>
        <View style={styles.questionRow}>
          <TextAndIconButton
            onPress={this.onSelectQuestionTwo}
            icon={Constants.KEYBOARD_ARROW_DOWN}
            iconStyle={Constants.MATERIAL_ICONS}
            style={questionTwoStyle}
            numberOfLines={2}
            title={this.state.question2}
          />
        </View>
        <View style={styles.answerRow}>
          <FormField
            style={form2Style}
            autoFocus={this.state.focusSecond}
            autoCorrect={false}
            autoCapitalize={'none'}
            onChangeText={this.setAnswer2}
            value={this.state.answer2}
            label={s.strings.your_answer_label}
            error={errorMessageTwo}
          />
        </View>
        {this.renderButtons(styles)}
      </View>
    )
  }

  renderButtons (styles: Object) {
    if (this.props.isEnabled) {
      return (
        <View style={styles.buttonContainer}>
          <View style={styles.shim} />
          <Button
            onPress={this.onSubmit}
            downStyle={styles.submitButton.downStyle}
            downTextStyle={styles.submitButton.downTextStyle}
            upStyle={styles.submitButton.upStyle}
            upTextStyle={styles.submitButton.upTextStyle}
            label={this.props.saveButton}
          />
          <View style={styles.shim} />
          <Button
            onPress={this.onDisable}
            downStyle={styles.disableButton.downStyle}
            downTextStyle={styles.disableButton.downTextStyle}
            upStyle={styles.disableButton.upStyle}
            upTextStyle={styles.disableButton.upTextStyle}
            label={this.props.disableButton}
          />
        </View>
      )
    }
    return (
      <View style={styles.buttonContainer}>
        <View style={styles.shim} />
        <Button
          onPress={this.onSubmit}
          downStyle={styles.submitButton.downStyle}
          downTextStyle={styles.submitButton.downTextStyle}
          upStyle={styles.submitButton.upStyle}
          upTextStyle={styles.submitButton.upTextStyle}
          label={this.props.doneButton}
        />
      </View>
    )
  }
  renderDisableModal (styles: Object) {
    if (this.state.disableConfirmationModal) {
      const body = (
        <Text style={styles.staticModalText}>
          {s.strings.recovery_disabled}
        </Text>
      )
      return (
        <StaticModal
          cancel={this.onDisableModalClose.bind(this)}
          body={body}
          modalDismissTimerSeconds={8}
        />
      )
    }
    return null
  }
  renderConfirmationScreenModal = (styles: Object) => {
    if (this.state.showConfirmationModal) {
      return (
        <FullScreenModal>
          <ConfirmPasswordRecoveryScreen
            cancel={this.onCancelConfirmation}
            confirm={this.onConfirmQuestionsAndAnseers}
            question1={this.state.question1}
            answer1={this.state.answer1}
            question2={this.state.question2}
            answer2={this.state.answer2}
          />
        </FullScreenModal>
      )
    }
    return null
  }
  showEmailPending (styles: Object) {
    return (
      <View style={styles.modalMiddle}>
        <Text style={styles.staticModalText}>
          {s.strings.recovery_what_account}
        </Text>
        <FormField
          style={styles.inputModal}
          onChangeText={this.updateEmail.bind(this)}
          value={this.state.emailAddress}
          label={s.strings.email_address}
          error={''}
          returnKeyType={'go'}
          forceFocus
          onSubmitEditing={this.openEmailApp}
        />
      </View>
    )
  }
  showEmaiFailed (styles: Object) {
    if (this.props.showEmailDialog) {
      return <EmailAppFailedModalConnector action={this.props.cancel} />
    }
    return null
  }
  showEmailDialog (styles: Object) {
    if (this.state.emailAppNotAvailable) {
      return this.showEmaiFailed(styles)
    }
    const middle = (
      <View style={styles.modalMiddle}>
        <Text style={styles.staticModalText}>
          {s.strings.recovery_instructions_complete}
        </Text>
        <FormField
          style={styles.inputModal}
          onChangeText={this.updateEmail.bind(this)}
          value={this.state.emailAddress}
          label={s.strings.email_address}
          error={''}
          returnKeyType={'go'}
          forceFocus
          onSubmitEditing={this.openEmailApp}
        />
      </View>
    )
    if (this.props.showEmailDialog) {
      return (
        <SaveRecoveryTokenModalConnector
          modalMiddleComponent={middle}
          cancel={this.props.cancel}
          action={this.openEmailApp}
        />
      )
    }
    return null
  }

  render () {
    const { RecoverPasswordSceneStyles } = this.props.styles
    const middle = this.state.showQuestionPicker
      ? this.renderQuestions(RecoverPasswordSceneStyles)
      : this.renderForm(RecoverPasswordSceneStyles)
    return (
      <View style={RecoverPasswordSceneStyles.screen}>
        {this.renderHeader(RecoverPasswordSceneStyles)}
        {middle}
        {this.renderDisableModal(RecoverPasswordSceneStyles)}
        {this.showEmailDialog(RecoverPasswordSceneStyles)}
        {this.renderConfirmationScreenModal(RecoverPasswordSceneStyles)}
      </View>
    )
  }
}
