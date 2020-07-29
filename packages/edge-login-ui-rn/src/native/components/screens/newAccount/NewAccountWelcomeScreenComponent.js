// @flow

import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { sprintf } from 'sprintf-js'

import * as Constants from '../../../../common/constants'
import s from '../../../../common/locales/strings'
import { type Dispatch, type RootState } from '../../../../types/ReduxTypes.js'
import * as Assets from '../../../assets'
import T from '../../../components/common/FormattedText.js'
import { ImageHeaderComponent } from '../../abSpecific/ImageHeaderComponent'
import { Button, HeaderBackButton } from '../../common'
import SafeAreaView from '../../common/SafeAreaView.js'

type OwnProps = {
  styles: Object,
  appName: string
}
type StateProps = {}
type DispatchProps = {
  exitScreen(): void,
  nextScreen(): void
}
type Props = OwnProps & StateProps & DispatchProps

type State = {}

class NewAccountWelcomeScreenComponent extends Component<Props, State> {
  render() {
    const { NewAccountWelcomeScreenStyle } = this.props.styles

    return (
      <SafeAreaView>
        <View style={NewAccountWelcomeScreenStyle.screen}>
          <View style={NewAccountWelcomeScreenStyle.row1}>
            <HeaderBackButton
              onPress={this.props.exitScreen}
              styles={NewAccountWelcomeScreenStyle.exitBackButtonStyle}
              label={s.strings.exit}
            />
          </View>
          <View style={NewAccountWelcomeScreenStyle.row2}>
            <ImageHeaderComponent
              style={NewAccountWelcomeScreenStyle.logoHeader}
              src={Assets.WELCOME}
            />
          </View>
          <View style={NewAccountWelcomeScreenStyle.row3}>
            <T style={NewAccountWelcomeScreenStyle.instructionsText}>
              {sprintf(
                s.strings.welcome_one,
                this.props.appName || s.strings.app_name_default
              )}
            </T>
          </View>
          <View style={NewAccountWelcomeScreenStyle.row4} />
          <View style={NewAccountWelcomeScreenStyle.row5}>
            <T style={NewAccountWelcomeScreenStyle.callToAction}>
              {s.strings.start_username}
            </T>
          </View>
          <View style={NewAccountWelcomeScreenStyle.row6}>
            <Button
              onPress={this.props.nextScreen}
              downStyle={NewAccountWelcomeScreenStyle.nextButton.downStyle}
              downTextStyle={
                NewAccountWelcomeScreenStyle.nextButton.downTextStyle
              }
              upStyle={NewAccountWelcomeScreenStyle.nextButton.upStyle}
              upTextStyle={NewAccountWelcomeScreenStyle.nextButton.upTextStyle}
              label={s.strings.get_started}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

export const NewAccountWelcomeScreen = connect(
  (state: RootState): StateProps => ({}),
  (dispatch: Dispatch): DispatchProps => ({
    exitScreen() {
      dispatch({ type: 'WORKFLOW_START', data: Constants.WORKFLOW_INIT })
    },
    nextScreen() {
      global.firebase &&
        global.firebase.analytics().logEvent(`Signup_Welcome_Next`)
      dispatch({ type: 'WORKFLOW_NEXT' })
    }
  })
)(NewAccountWelcomeScreenComponent)
