import React, { Component } from 'react'
import { View, Text } from 'react-native'
import {
  Button,
  FormField,
  StaticModal
} from '../../common/'
import HeaderConnector
  from '../../../connectors/componentConnectors/HeaderConnectorChangeApps.js'

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
      disableConfirmationModal: false
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
  renderError (styles) {
    if (this.props.loginError) {
      return <Text style={styles.errorText} >{this.props.loginError}</Text>
    }
    return null
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
            <View style={styles.shim} />
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
      </View>
    )
  }
}
