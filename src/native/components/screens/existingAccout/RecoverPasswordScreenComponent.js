import React, { Component } from 'react'
import { View } from 'react-native'
import { Button,
  FormField,
  TextAndIconButton,
  DropDownList,
  TextRowComponent
 } from '../../common/'
/* import Gradient from '../../components/Gradient/Gradient.ui.js' */
/* import { PrimaryButton } from '../../components/Buttons/index' */
/* import s from '../../../../locales/strings.js'
import {FormField} from '../../../../components/FormField.js' */
import * as Constants from '../../../../common/constants'
import HeaderConnector
  from '../../../connectors/componentConnectors/HeaderConnectorChangeApps.js'
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
export default class PasswordRecovery extends Component {
  componentWillMount () {
    this.setState({
      question1: 'Choose recovery question',
      question2: 'Choose recovery question',
      answer1: '',
      answer2: '',
      showQuestionPicker: false,
      focusFirst: false,
      focusSecond: false,
      errorOne: false,
      errorTwo: false,
      errorQuestionOne: false,
      errorQuestionTwo: false
    })
    this.renderHeader = (style) => {
      if (this.props.showHeader) {
        return <HeaderConnector style={style.header} />
      }
      return null
    }
    this.onSubmit = () => {
      let errorOne = this.state.answer1.length < 1 || false
      let errorTwo = this.state.answer2.length < 1 || false
      let errorQuestionOne = this.state.question1 === Constants.CHOOSE_RECOVERY_QUESTION || false
      let errorQuestionTwo = this.state.question2 === Constants.CHOOSE_RECOVERY_QUESTION || false

      this.setState({
        errorOne,
        errorTwo,
        errorQuestionOne,
        errorQuestionTwo
      })
      if (errorOne || errorTwo || errorQuestionOne || errorQuestionTwo) {
        return
      }

      // this.props.setAnswers()
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
    this.setAnswer1 = (arg) => {
      this.setState({
        answer1: arg
      })
    }
    this.setAnswer2 = (arg) => {
      this.setState({
        answer2: arg
      })
    }
    this.questionSelected = (data) => {
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
    this.renderItems = (item) => {
      const { RecoverPasswordSceneStyles } = this.props.styles
      console.log(item)
      return (
        <TextRowComponent
          style={RecoverPasswordSceneStyles.listItem}
          data={item.item}
          title={item.item.question}
          onPress={this.questionSelected}
          numberOfLines={3} />
      )
    }
    this.renderQuestions = (styles) => {
      console.log(this.props.questionsList)
      return (
        <View style={styles.body}>
          <DropDownList
            style={styles.questionsList}
            data={this.props.questionsList}
            renderRow={this.renderItems.bind(this)} />
        </View>
      )
    }
    this.renderForm = (styles) => {
      const form1Style = this.state.errorOne ? styles.inputError : styles.input
      const form2Style = this.state.errorTwo ? styles.inputError : styles.input
      const questionOneStyle = this.state.errorQuestionOne ? styles.textIconButtonErrorError : styles.textIconButton
      const questionTwoStyle = this.state.errorQuestionOne ? styles.textIconButtonErrorError : styles.textIconButton

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
          <View style={styles.answerRow} >
            <FormField style={form1Style}
              autoFocus={this.state.focusFirst}
              autoCorrect={false}
              autoCapitalize={'none'}
              onChangeText={this.setAnswer1}
              value={this.state.answer1}
              label={'Your Answer'}
              error={'Answers are case sensitive'} />
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
          <View style={styles.answerRow} >
            <FormField style={form2Style}
              autoFocus={this.state.focusSecond}
              autoCorrect={false}
              autoCapitalize={'none'}
              onChangeText={this.setAnswer2}
              value={this.state.answer2}
              label={'Your Answer'}
              error={'Answers are case sensitive'} />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.shim} />
            <Button
              onPress={this.onSubmit}
              downStyle={styles.nextButton.downStyle}
              downTextStyle={styles.nextButton.downTextStyle}
              upStyle={styles.nextButton.upStyle}
              upTextStyle={styles.nextButton.upTextStyle}
              label={this.props.submitButton}
            />
          </View>
        </View>
      )
    }
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
      </View>
    )
  }
}
