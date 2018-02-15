import React, { Component } from 'react'
import { View, Text } from 'react-native'
import {
  Button,
  FormField,
  StaticModal
} from '../../common/'
import HeaderConnector
  from '../../../connectors/componentConnectors/HeaderRecoverPasswordLogin.js'
import RecoverPasswordUsernameModalConnector from '../../../../native/connectors/componentConnectors/RecoverPasswordUsernameModalConnector'
import SetRecoveryUsernameModalConnector
  from '../../../../native/connectors/abSpecific/SetRecoveryUsernameModalConnector'

export default class PasswordRecovery extends Component {
  componentWillMount () {
    this.props.updateUsername('')
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
      showUsernameModal: true
    })
    this.renderHeader = (style) => {
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

      this.setState({
        errorOne,
        errorTwo
      })
      if (errorOne || errorTwo) {
        return
      }
      const answers = [this.state.answer1, this.state.answer2]
      this.props.submit(answers)
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
    this.renderModal = (styles) => {
      if (this.props.showRecoverSuccessDialog) { // render static modal
        const body = <Text style={styles.staticModalText}>Recovery successful! Please change your password and PIN.</Text>
        return <StaticModal
          cancel={this.props.changePassword}
          body={body}
          modalDismissTimerSeconds={8} />
      }
      if (!this.state.showUsernameModal) return null
      const middle = <View style={styles.modalMiddle}>
        <Text style={styles.staticModalText}>
          Please enter the username of the account you want to recover.
        </Text>
        <RecoverPasswordUsernameModalConnector
          style={styles.inputModal}
          onSubmitEditing={this.props.getQuestions}
        />
      </View>
      return (
        <SetRecoveryUsernameModalConnector
          modalMiddleComponent={middle}
          cancel={this.props.onCancel}
          action={this.props.getQuestions}
        />
      )
    }
  }
  renderError (styles) {
    if (this.props.loginError) {
      return <View>
        <View style={styles.shim} />
        <Text style={styles.errorText}>{this.props.loginError}</Text>
        <View style={styles.shim} />
      </View>
    }
    return <View style={styles.shim} />
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.question1 !== this.props.question1) {
      this.setState({
        question1: nextProps.question1,
        question2: nextProps.question2,
        showUsernameModal: false
      })
    }
  }

  render () {
    const { LoginWithRecoveryStyles } = this.props.styles
    // const middle = this.renderForm(RecoverPasswordSceneStyles)
    const styles = LoginWithRecoveryStyles
    const form1Style = this.state.errorOne ? styles.inputError : styles.input
    const form2Style = this.state.errorTwo ? styles.inputError : styles.input

    return (
      <View style={styles.screen}>
        {this.renderHeader(styles)}
        <View style={styles.body}>
          <View style={styles.questionRow}>
            <Text style={styles.questionText}>{this.props.question1}</Text>
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
            <Text style={styles.questionText}>{this.props.question2}</Text>
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
          <View style={styles.buttonContainer}>
            {this.renderError(styles)}
            <Button
              onPress={this.onSubmit}
              downStyle={styles.submitButton.downStyle}
              downTextStyle={styles.submitButton.downTextStyle}
              upStyle={styles.submitButton.upStyle}
              upTextStyle={styles.submitButton.upTextStyle}
              label={this.props.submitButton}
            />
          </View>
        </View>
        {this.renderModal(styles)}
      </View>
    )
  }
}
