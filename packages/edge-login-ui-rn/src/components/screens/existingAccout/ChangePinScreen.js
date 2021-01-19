// @flow

import * as React from 'react'
import { Keyboard, Text, View } from 'react-native'

import {
  changePIN,
  recoveryChangePIN
} from '../../../actions/ChangePasswordPinActions.js'
import { completeResecure } from '../../../actions/LoginCompleteActions.js'
import { onComplete } from '../../../actions/WorkflowActions.js'
import s from '../../../common/locales/strings.js'
import * as Constants from '../../../constants/index.js'
import * as Styles from '../../../styles/index.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import { scale } from '../../../util/scaling.js'
import { FourDigitInput } from '../../abSpecific/FourDigitInputComponent.js'
import { Button } from '../../common/Button.js'
import { Header } from '../../common/Header.js'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'
import { ButtonsModal } from '../../modals/ButtonsModal.js'
import { Airship, showError } from '../../services/AirshipInstance.js'
import { connect } from '../../services/ReduxStore.js'

type OwnProps = {
  showHeader?: boolean
}
type StateProps = {
  pin: string,
  pinError: string
}
type DispatchProps = {
  changePin(pin: string): void,
  onBack?: () => void,
  onSkip?: () => void
}
type Props = OwnProps & StateProps & DispatchProps

type State = {
  isProcessing: boolean,
  pin: string,
  username: string,
  focusOn: string
}

class ChangePinScreenComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      username: '',
      pin: '',
      isProcessing: false,
      focusOn: 'pin'
    }
  }

  renderHeader = () => {
    if (this.props.showHeader) {
      return <Header onBack={this.props.onBack} onSkip={this.props.onSkip} />
    }
    return null
  }

  onNextPress = () => {
    this.setState({
      isProcessing: true
    })
    // validation.
    // is there no error message ,
    if (this.props.pin.length !== 4 || this.props.pinError) {
      this.setState({
        isProcessing: false
      })
      return
    }
    Keyboard.dismiss()
    this.props.changePin(this.props.pin)
  }

  render() {
    return (
      <SafeAreaView>
        <View style={SetAccountPinScreenStyle.screen}>
          {this.renderHeader()}
          <View style={SetAccountPinScreenStyle.pageContainer}>
            <View style={SetAccountPinScreenStyle.row1}>
              <Text style={SetAccountPinScreenStyle.instructions}>
                {s.strings.pin_desc}
              </Text>
            </View>
            <View style={SetAccountPinScreenStyle.row2}>
              <FourDigitInput />
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
                label={s.strings.done}
                isThinking={this.state.isProcessing}
                doesThink
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const SetAccountPinScreenStyle = {
  screen: { ...Styles.ScreenStyle },
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
  nextButton: {
    upStyle: Styles.PrimaryButtonUpScaledStyle,
    upTextStyle: Styles.PrimaryButtonUpTextScaledStyle,
    downTextStyle: Styles.PrimaryButtonUpTextScaledStyle,
    downStyle: Styles.PrimaryButtonDownScaledStyle
  }
}

export const PublicChangePinScreen = connect<
  StateProps,
  DispatchProps,
  OwnProps
>(
  (state: RootState) => ({
    pin: state.create.pin,
    pinError: state.create.pinError
  }),
  (dispatch: Dispatch) => ({
    changePin(data) {
      dispatch(changePIN(data))
        .then(() =>
          Airship.show(bridge => (
            <ButtonsModal
              bridge={bridge}
              title={s.strings.pin_changed}
              message={s.strings.pin_successfully_changed}
              buttons={{ ok: { label: s.strings.ok } }}
            />
          ))
        )
        .then(() => dispatch(onComplete()))
        .catch(showError)
    },
    onBack() {
      dispatch(onComplete())
    }
  })
)(ChangePinScreenComponent)

export const ResecurePinScreen = connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    pin: state.create.pin,
    pinError: state.create.pinError,
    showHeader: true
  }),
  (dispatch: Dispatch) => ({
    changePin(data: string) {
      dispatch(recoveryChangePIN(data))
        .then(() =>
          Airship.show(bridge => (
            <ButtonsModal
              bridge={bridge}
              title={s.strings.pswd_and_pin_changed}
              message={s.strings.change_pwd_body}
              buttons={{ ok: { label: s.strings.ok } }}
            />
          ))
        )
        .then(() => dispatch(completeResecure()))
        .catch(showError)
    },
    onSkip() {
      dispatch(completeResecure())
    }
  })
)(ChangePinScreenComponent)
