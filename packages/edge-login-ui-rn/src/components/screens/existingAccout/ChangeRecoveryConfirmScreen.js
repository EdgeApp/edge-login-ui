// @flow
import * as React from 'react'
import { Text, View } from 'react-native'

import s from '../../../common/locales/strings.js'
import * as Constants from '../../../constants/index.js'
import * as Styles from '../../../styles/index.js'
import { Button } from '../../common/Button.js'
import { HeaderComponent } from '../../common/Header.js'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'

type Props = {
  question1: string,
  answer1: string,
  question2: string,
  answer2: string,
  onEmail(): void,
  onShare(): void,
  onCancel(): void
}

export class ChangeRecoveryConfirmScreen extends React.Component<Props> {
  render() {
    const style = ConfirmPasswordRecoverySceneStyles
    return (
      <SafeAreaView>
        <View style={style.screen}>
          <HeaderComponent
            onBack={this.props.onCancel}
            title={s.strings.confirm_recovery_questions}
            subTitle=""
          />
          <View style={style.shim} />
          <Text style={style.questionText}>{this.props.question1}</Text>
          <Text style={style.answerText}>{this.props.answer1}</Text>
          <View style={style.shim} />
          <Text style={style.questionText}>{this.props.question2}</Text>
          <Text style={style.answerText}>{this.props.answer2}</Text>
          <View style={style.shim} />
          <View style={style.buttonContainer}>
            <Button
              onPress={this.props.onEmail}
              downStyle={style.submitButton.downStyle}
              downTextStyle={style.submitButton.downTextStyle}
              upStyle={style.submitButton.upStyle}
              upTextStyle={style.submitButton.upTextStyle}
              label={s.strings.confirm_email}
            />
            <View style={style.shim} />
            <Button
              onPress={this.props.onShare}
              downStyle={style.submitButton.downStyle}
              downTextStyle={style.submitButton.downTextStyle}
              upStyle={style.submitButton.upStyle}
              upTextStyle={style.submitButton.upTextStyle}
              label={s.strings.confirm_share}
            />
            <View style={style.shim} />
            <Button
              onPress={this.props.onCancel}
              downStyle={style.disableButton.downStyle}
              downTextStyle={style.disableButton.downTextStyle}
              upStyle={style.disableButton.upStyle}
              upTextStyle={style.disableButton.upTextStyle}
              label={s.strings.cancel}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const ConfirmPasswordRecoverySceneStyles = {
  screen: { ...Styles.ScreenStyle, alignItems: 'center' },
  submitButton: {
    upStyle: Styles.PrimaryWidthButtonUpStyle,
    upTextStyle: Styles.PrimaryButtonUpTextStyle,
    downTextStyle: Styles.PrimaryButtonUpTextStyle,
    downStyle: Styles.PrimaryWidthButtonDownStyle
  },
  disableButton: {
    upStyle: Styles.DefaultWidthButtonUpStyle,
    upTextStyle: Styles.DefaultButtonUpTextStyle,
    downTextStyle: Styles.DefaultButtonDownTextStyle,
    downStyle: Styles.DefaultWidthButtonDownStyle
  },
  buttonContainer: {
    width: '90%',
    alignItems: 'center'
    // height: THEME.BUTTONS.HEIGHT
  },
  questionText: {
    color: Constants.GRAY_2,
    width: '90%',
    fontSize: 15,
    paddingBottom: 10
  },
  answerText: {
    color: Constants.GRAY_1,
    width: '90%',
    fontSize: 15,
    textAlign: 'left',
    paddingBottom: 10
  },
  shim: {
    height: 20
  }
}
