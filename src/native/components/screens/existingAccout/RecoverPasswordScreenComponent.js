import React, { Component } from 'react'
import { View, Text } from 'react-native'
import {
  Button,
  FormField,
  TextAndIconButton,
  DropDownList,
  TextRowComponent,
  StaticModal
} from '../../common/'
/* import Gradient from '../../components/Gradient/Gradient.ui.js' */
/* import { PrimaryButton } from '../../components/Buttons/index' */
/* import s from '../../../../locales/strings.js'
import {FormField} from '../../../../components/FormField.js' */
import * as Constants from '../../../../common/constants'
import HeaderConnector
  from '../../../connectors/componentConnectors/HeaderConnectorChangeApps.js'
import SaveRecoveryTokenModalConnector from '../../../connectors/abSpecific/SaveRecoveryTokenModalConnector'
import EmailAppFailedModalConnector from '../../../connectors/abSpecific/EmailAppFailedModalConnector'
/* type Props = {
  recoveryQuestions: Array<String>,
  setAnswers(): void,
} */
/* type State = {
  question1: string,
  question2: string,
  answer1: string,
  answer2: string,
  showQuestionPicker: boolean,
  focusFirst: boolean,
  focusSecond: boolean
} */
import Mailer from 'react-native-mail'

export default class PasswordRecovery extends Component {
  componentWillMount () {
    this.setState({
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
      emailAppNotAvailable: false
    })
    this.renderHeader = style => {
      if (this.props.showHeader) {
        return <HeaderConnector style={style.header} />
      }
      return null
    }
    this.onDisable = () => {
      this.props.deleteRecovery()
      this.setState({
        disableConfirmationModal: true
      })
    }
    this.onDisableModalClose = () => {
      this.props.cancel()
    }
    this.onSubmit = () => {
      let errorOne = this.state.answer1.length < 1 || false
      let errorTwo = this.state.answer2.length < 1 || false
      let errorQuestionOne =
        this.state.question1 === Constants.CHOOSE_RECOVERY_QUESTION || false
      let errorQuestionTwo =
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
      const questions = [this.state.question1, this.state.question2]
      const answers = [this.state.answer1, this.state.answer2]
      this.props.submit(questions, answers)
    }
    this.onSelectQuestionOne = () => {
      this.setState({
        showQuestionPicker: true,
        focusFirst: true,
        focusSecond: false
      })
    }
    this.onSelectQuestionTwo = () => {
      this.setState({
        showQuestionPicker: true,
        focusFirst: false,
        focusSecond: true
      })
    }
    this.setAnswer1 = arg => {
      this.setState({
        answer1: arg
      })
    }
    this.setAnswer2 = arg => {
      this.setState({
        answer2: arg
      })
    }
    this.questionSelected = data => {
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
    this.renderItems = item => {
      const { RecoverPasswordSceneStyles } = this.props.styles
      console.log(item)
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
    this.renderQuestions = styles => {
      console.log(this.props.questionsList)
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
    this.updateEmail = email => {
      this.setState({
        emailAddress: email
      })
    }
    this.openEmailApp = () => {
      const body = 'Please click the link below from a mobile device with Airbitz installed to initiate account recovery for username ' + this.props.username + '<br>' +
      'iOS <br>edge://recovery?token=' + this.props.backupKey + '<br><br>' +
      'Android https://recovery.edgesecure.co/recovery?token=' + this.props.backupKey

      Mailer.mail({
        subject: 'Edge Recovery Token',
        recipients: [this.state.emailAddress],
        body: body,
        isHTML: true
      }, (error, event) => {
        if (error) {
          console.log(error)
          this.setState({
            emailAppNotAvailable: true
          })
        }
        if (event === 'sent') {
          this.props.returnToSettings()
        }
      })
    }
    this.renderForm = styles => {
      const form1Style = this.state.errorOne ? styles.inputError : styles.input
      const form2Style = this.state.errorTwo ? styles.inputError : styles.input
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
              label={'Your Answer'}
              error={'Answers are case sensitive'}
            />
          </View>
          <View style={styles.shim} />
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
              label={'Your Answer'}
              error={'Answers are case sensitive'}
            />
          </View>
          {this.renderButtons(styles)}
        </View>
      )
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.isEnabled !== this.props.isEnabled) {
      this.setState({
        question1: nextProps.question1,
        question2: nextProps.question2
      })
    }
  }

  renderButtons (styles) {
    if (this.props.isEnabled) {
      return (
        <View style={styles.buttonContainer}>
          <View style={styles.shim} />
          <Button
            onPress={this.onDisable}
            downStyle={styles.disableButton.downStyle}
            downTextStyle={styles.disableButton.downTextStyle}
            upStyle={styles.disableButton.upStyle}
            upTextStyle={styles.disableButton.upTextStyle}
            label={this.props.disableButton}
          />
          <View style={styles.shim} />
          <Button
            onPress={this.onSubmit}
            downStyle={styles.submitButton.downStyle}
            downTextStyle={styles.submitButton.downTextStyle}
            upStyle={styles.submitButton.upStyle}
            upTextStyle={styles.submitButton.upTextStyle}
            label={this.props.submitButton}
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
          label={this.props.submitButton}
        />
      </View>
    )
  }
  renderDisableModal (styles) {
    if (this.state.disableConfirmationModal) {
      const body = <Text style={styles.staticModalText}>Password Recovery has been disabled. You can enable it again by going into Password Recovery anytime</Text>
      return <StaticModal
        cancel={this.onDisableModalClose.bind(this)}
        body={body}
        modalDismissTimerSeconds={5} />
    }
    return null
  }
  showEmailPending (styles) {
    return <View style={styles.modalMiddle}>
      <Text style={styles.staticModalText}>
        Please enter the username of the account you want to recover.
      </Text>
      <FormField
        style={styles.inputModal}
        onChangeText={this.updateEmail.bind(this)}
        value={this.state.emailAddress}
        label={'Email Address'}
        error={''}
        returnKeyType={'go'}
        forceFocus
        onSubmitEditing={this.openEmailApp}
      />
    </View>
  }
  showEmaiFailed (styles) {
    if (this.props.showEmailDialog) {
      return <EmailAppFailedModalConnector
        action={this.props.cancel} />
    }
    return null
  }
  showEmailDialog (styles) {
    if (this.state.emailAppNotAvailable) {
      return this.showEmaiFailed(styles)
    }
    const middle = <View style={styles.modalMiddle}>
      <Text style={styles.staticModalText}>
        Please enter the email of the account you want to recover.
      </Text>
      <FormField
        style={styles.inputModal}
        onChangeText={this.updateEmail.bind(this)}
        value={this.state.emailAddress}
        label={'Email Address'}
        error={''}
        returnKeyType={'go'}
        forceFocus
        onSubmitEditing={this.openEmailApp}
      />
    </View>
    if (this.props.showEmailDialog) {
      return <SaveRecoveryTokenModalConnector
        modalMiddleComponent={middle}
        cancel={this.props.cancel}
        action={this.openEmailApp} />
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
      </View>
    )
  }
}
