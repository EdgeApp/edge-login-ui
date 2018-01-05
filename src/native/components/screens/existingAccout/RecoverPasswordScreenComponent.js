import React, { Component } from 'react'
import { View } from 'react-native'
import { Button, FormField, TextAndIconButton } from '../../common/'
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
      focusSecond: false
    })
    this.renderHeader = (style) => {
      if (this.props.showHeader) {
        return <HeaderConnector style={style.header} />
      }
      return null
    }
    this.onSumbit = () => {
      this.props.setAnswers()
    }
    this.onSelectQuestionOne = () => {
      this.setState({
        showQuestionPicker: true,
        focusFirst: true
      })
    }
    this.onSelectQuestionTwo = () => {
      this.setState({
        showQuestionPicker: true,
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

    this.renderQuestions = (styles) => {
      return (
        <View style={styles.body}>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this.onSumbit}
              downStyle={styles.nextButton.downStyle}
              downTextStyle={styles.nextButton.downTextStyle}
              upStyle={styles.nextButton.upStyle}
              upTextStyle={styles.nextButton.upTextStyle}
              label={'DONE'}
            />
          </View>
        </View>
      )
    }
    this.renderForm = (styles) => {
      return (
        <View style={styles.body}>
          <View style={styles.questionRow}>
            <TextAndIconButton
              onPress={this.onSelectQuestionOne}
              icon={Constants.KEYBOARD_ARROW_DOWN}
              iconStyle={Constants.MATERIAL_ICONS}
              style={styles.textIconButton}
              numberOfLines={2}
              title={'Choose a Question'}
            />
          </View>
          <View style={styles.answerRow} >
            <FormField style={styles.input}
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
              style={styles.textIconButton}
              numberOfLines={2}
              title={'Choose a Question'}
            />
          </View>
          <View style={styles.answerRow} >
            <FormField style={styles.input}
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
              label={'DONE'}
            />
          </View>
        </View>
      )
    }
  }

  render () {
    const { RecoverPasswordSceneStyles } = this.props.styles
    // const styles = RecoverPasswordSceneStyles
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
