// @flow
import React, { Component } from 'react'
import { Text, View } from 'react-native'

import s from '../../../../common/locales/strings'
import { ConfirmPasswordRecoverySceneStyles } from '../../../styles/index'
import { Button, Header } from '../../common/'
// import HeaderConnector from '../../../connectors/componentConnectors/HeaderConnectorChangeApps.js'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'

type Props = {
  question1: string,
  answer1: string,
  question2: string,
  answer2: string,
  confirm(): void,
  cancel(): void
}

export default class ConfirmPasswordRecoveryScreen extends Component<Props> {
  render () {
    const style = ConfirmPasswordRecoverySceneStyles
    return (
      <SafeAreaView>
        <View style={style.screen}>
          <Header
            style={style.header}
            showBackButton={true}
            showSkipButton={false}
            title={s.strings.confirm_recovery_questions}
            subTitle={''}
            useCancel={false}
            customLabel={s.strings.back}
            goBack={this.props.cancel}
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
              onPress={this.props.confirm}
              downStyle={style.submitButton.downStyle}
              downTextStyle={style.submitButton.downTextStyle}
              upStyle={style.submitButton.upStyle}
              upTextStyle={style.submitButton.upTextStyle}
              label={s.strings.confirm_finish}
            />
            <View style={style.shim} />
            <Button
              onPress={this.props.cancel}
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
