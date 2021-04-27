// @flow

import * as React from 'react'
import { Alert, Text, View } from 'react-native'

import {
  type CreateUserData,
  createUser
} from '../../../actions/CreateAccountActions.js'
import s from '../../../common/locales/strings.js'
import * as Constants from '../../../constants/index.js'
import * as Styles from '../../../styles/index.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import { logEvent } from '../../../util/analytics.js'
import { scale } from '../../../util/scaling.js'
import { FourDigitInput } from '../../abSpecific/FourDigitInputComponent.js'
import { Button } from '../../common/Button.js'
import { Header } from '../../common/Header.js'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'
import { connect } from '../../services/ReduxStore.js'

type OwnProps = {}
type StateProps = {
  createErrorMessage: string | null,
  password: string,
  pin: string,
  pinError: string | null,
  username: string
}
type DispatchProps = {
  createUser(data: CreateUserData): void,
  onBack(): void
}
type Props = OwnProps & StateProps & DispatchProps

type State = {
  username: string,
  pin: string,
  createErrorMessage: string | null,
  isProcessing: boolean,
  focusOn: string
}

class NewAccountPinScreenComponent extends React.Component<Props, State> {
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
        <View style={styles.screen}>
          <Header onBack={this.props.onBack} />
          <View style={styles.pageContainer}>
            <View style={styles.row1}>
              <Text style={styles.instructions}>{s.strings.pin_desc}</Text>
            </View>
            <View style={styles.row2}>
              <FourDigitInput testID="pinInput" />
            </View>
            <View style={styles.row3}>
              <Button
                testID="nextButton"
                onPress={this.handleNext}
                downStyle={styles.nextButton.downStyle}
                downTextStyle={styles.nextButton.downTextStyle}
                upStyle={styles.nextButton.upStyle}
                upTextStyle={styles.nextButton.upTextStyle}
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

  handleNext = () => {
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
      logEvent(`Signup_PIN_Invalid`)
      return
    }
    logEvent(`Signup_Create_User`)
    this.props.createUser({
      username: this.props.username,
      password: this.props.password,
      pin: this.props.pin
    })
  }
}

const styles = {
  screen: { ...Styles.ScreenStyle },
  pageContainer: { flex: 1, width: '100%' },
  row1: {
    width: '100%',
    flex: -1,
    paddingTop: 24,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  row2: {
    width: '100%',
    paddingVertical: 12,
    flex: -1,
    alignItems: 'center'
  },
  row3: {
    width: '100%',
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
  nextButton: {
    upStyle: Styles.PrimaryButtonUpScaledStyle,
    upTextStyle: Styles.PrimaryButtonUpTextScaledStyle,
    downTextStyle: Styles.PrimaryButtonUpTextScaledStyle,
    downStyle: Styles.PrimaryButtonDownScaledStyle
  }
}

export const NewAccountPinScreen = connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    createErrorMessage: state.create.createErrorMessage,
    password: state.create.password || '',
    pin: state.create.pin,
    pinError: state.create.pinError,
    username: state.create.username || ''
  }),
  (dispatch: Dispatch) => ({
    createUser(data: CreateUserData) {
      dispatch({ type: 'CLEAR_CREATE_ERROR_MESSAGE' })
      dispatch(createUser(data))
    },
    onBack() {
      dispatch({ type: 'WORKFLOW_BACK' })
    }
  })
)(NewAccountPinScreenComponent)
