// @flow

import React, { Component } from 'react'
import { Alert, Text, View } from 'react-native'
import { connect } from 'react-redux'

import { createUser } from '../../../actions/CreateAccountActions.js'
import s from '../../../common/locales/strings.js'
import HeaderConnector from '../../../connectors/componentConnectors/HeaderConnector'
import * as Constants from '../../../constants/index.js'
import * as Styles from '../../../styles/index.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import { scale } from '../../../util/scaling.js'
import { FourDigitInput } from '../../abSpecific/FourDigitInputComponent.js'
import { Button } from '../../common'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'

type OwnProps = {}
type StateProps = {
  createErrorMessage: string | null,
  password: string,
  pin: string,
  pinError: string | null,
  username: string
}
type DispatchProps = {
  createUser(data: Object): void
}
type Props = OwnProps & StateProps & DispatchProps

type State = {
  username: string,
  pin: string,
  createErrorMessage: string | null,
  isProcessing: boolean,
  focusOn: string
}

class SetAccountPinScreenComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      username: '',
      pin: '',
      isProcessing: false,
      focusOn: 'pin',
      createErrorMessage: this.props.createErrorMessage
    }
  }

  checkError = () => {
    if (this.state.createErrorMessage) {
      Alert.alert(
        s.strings.create_account_error_title,
        s.strings.create_account_error_message +
          '\n' +
          this.state.createErrorMessage,
        [{ text: s.strings.ok }]
      )
      this.setState({ createErrorMessage: null })
    }
  }

  render() {
    this.checkError()
    return (
      <SafeAreaView>
        <View style={SetAccountPinScreenStyle.screen}>
          <HeaderConnector style={SetAccountPinScreenStyle.header} />
          <View style={SetAccountPinScreenStyle.pageContainer}>
            <View style={SetAccountPinScreenStyle.row1}>
              <Text style={SetAccountPinScreenStyle.instructions}>
                {s.strings.pin_desc}
              </Text>
            </View>
            <View style={SetAccountPinScreenStyle.row2}>
              <FourDigitInput style={SetAccountPinScreenStyle.fourPin} />
            </View>
            <View style={SetAccountPinScreenStyle.row3}>
              <Button
                onPress={this.onNextPress}
                downStyle={SetAccountPinScreenStyle.nextButton.downStyle}
                downTextStyle={
                  SetAccountPinScreenStyle.nextButton.downTextStyle
                }
                upStyle={SetAccountPinScreenStyle.nextButton.upStyle}
                upTextStyle={SetAccountPinScreenStyle.nextButton.upTextStyle}
                label={s.strings.next_label}
                isThinking={this.state.isProcessing}
                doesThink
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  onNextPress = () => {
    this.setState({
      isProcessing: true,
      createErrorMessage: null
    })
    // validation.
    // is there no error message ,
    if (this.props.pin.length !== 4 || this.props.pinError) {
      this.setState({
        isProcessing: false
      })
      global.firebase &&
        global.firebase.analytics().logEvent(`Signup_PIN_Invalid`)
      return
    }
    global.firebase &&
      global.firebase.analytics().logEvent(`Signup_Create_User`)
    this.props.createUser({
      username: this.props.username,
      password: this.props.password,
      pin: this.props.pin
    })
  }
}

const SetAccountPinScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  header: {
    ...Styles.HeaderContainerScaledStyle,
    backgroundColor: Constants.PRIMARY
  },
  pageContainer: Styles.PageContainerWithHeaderStyle,
  row1: {
    ...Styles.ScreenRow,
    flex: -1,
    paddingTop: 24,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  row2: {
    ...Styles.ScreenRow,
    paddingVertical: 12,
    flex: -1,
    alignItems: 'center'
  },
  row3: {
    ...Styles.ScreenRow,
    paddingVertical: 12,
    flex: -1,
    alignItems: 'center'
  },
  instructions: {
    position: 'relative',
    width: '80%',
    fontSize: scale(Styles.CreateAccountFont.defaultFontSize),
    fontFamily: Constants.FONTS.fontFamilyRegular,
    color: Constants.GRAY_2,
    textAlign: 'center'
  },
  fourPin: {
    ...Styles.FourDotInputDarkScaledStyle,
    container: {
      ...Styles.FourDotInputDarkScaledStyle.container,
      height: scale(120)
    }
  },
  nextButton: {
    upStyle: Styles.PrimaryButtonUpScaledStyle,
    upTextStyle: Styles.PrimaryButtonUpTextScaledStyle,
    downTextStyle: Styles.PrimaryButtonUpTextScaledStyle,
    downStyle: Styles.PrimaryButtonDownScaledStyle
  }
}

export const SetAccountPinScreen = connect(
  (state: RootState): StateProps => ({
    createErrorMessage: state.create.createErrorMessage,
    password: state.create.password || '',
    pin: state.create.pin,
    pinError: state.create.pinError,
    username: state.create.username || ''
  }),
  (dispatch: Dispatch): DispatchProps => ({
    createUser(data: Object) {
      dispatch({ type: 'CLEAR_CREATE_ERROR_MESSAGE' })
      dispatch(createUser(data))
    }
  })
)(SetAccountPinScreenComponent)
