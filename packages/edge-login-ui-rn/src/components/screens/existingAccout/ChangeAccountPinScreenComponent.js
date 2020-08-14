// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

import {
  changePIN,
  recoveryChangePIN
} from '../../../actions/ChangePasswordPinActions.js'
import { recoveryLoginComplete } from '../../../actions/LoginAction.js'
import s from '../../../common/locales/strings.js'
import HeaderConnector from '../../../connectors/componentConnectors/HeaderConnectorChangeApps.js'
import * as Constants from '../../../constants/index.js'
import * as Styles from '../../../styles/index.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import { scale } from '../../../util/scaling.js'
import { FourDigitInput } from '../../abSpecific/FourDigitInputComponent.js'
import { Button } from '../../common/Button.js'
import SafeAreaView from '../../common/SafeAreaViewGradient.js'
import { StaticModal } from '../../common/StaticModal.js'
import { ChangePinModal } from '../../modals/ChangePinModal.js'

type OwnProps = {
  showHeader?: boolean
}
type StateProps = {
  forgotPasswordModal?: boolean,
  pin: string,
  pinError: string,
  showModal: boolean
}
type DispatchProps = {
  changePin(pin: string): void,
  login(): void
}
type Props = OwnProps & StateProps & DispatchProps

type State = {
  isProcessing: boolean,
  pin: string,
  username: string,
  focusOn: string
}

class ChangeAccountPinScreenComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      username: '',
      pin: '',
      isProcessing: false,
      focusOn: 'pin'
    }
  }

  renderHeader = (style: typeof SetAccountPinScreenStyle) => {
    if (this.props.showHeader) {
      return <HeaderConnector style={style.header} />
    }
    return null
  }

  renderModal = (style: typeof SetAccountPinScreenStyle) => {
    if (this.props.showModal) {
      if (this.props.forgotPasswordModal) {
        const body = (
          <View>
            <Text style={style.staticModalText}>
              {s.strings.pswd_and_pin_changed}
            </Text>
            <View style={style.shim} />
            <Text style={style.staticModalText}>
              {s.strings.change_pwd_body}
            </Text>
          </View>
        )
        return (
          <StaticModal
            cancel={this.props.login}
            body={body}
            modalDismissTimerSeconds={8}
          />
        )
      }
      return <ChangePinModal style={style.modal.skip} />
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
    this.props.changePin(this.props.pin)
  }

  render() {
    return (
      <SafeAreaView>
        <View style={SetAccountPinScreenStyle.screen}>
          {this.renderHeader(SetAccountPinScreenStyle)}
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
                label={s.strings.done}
                isThinking={this.state.isProcessing}
                doesThink
              />
            </View>
          </View>
          {this.renderModal(SetAccountPinScreenStyle)}
        </View>
      </SafeAreaView>
    )
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
  },
  staticModalText: {
    color: Constants.GRAY_1,
    width: '100%',
    fontSize: scale(15),
    textAlign: 'center'
  },
  modal: Styles.SkipModalStyle,
  shim: {
    height: scale(5)
  }
}

export const ChangeAccountPinScreen = connect(
  (state: RootState): StateProps => ({
    pin: state.create.pin,
    pinError: state.create.pinError,
    workflow: state.workflow,
    showModal: state.create.showModal
  }),
  (dispatch: Dispatch): DispatchProps => ({
    changePin(data) {
      dispatch(changePIN(data))
    },
    login() {
      // Not used in the settings screen version
    }
  })
)(ChangeAccountPinScreenComponent)

export const ForgotPinChangePinScene = connect(
  (state: RootState): StateProps => ({
    forgotPasswordModal: true,
    pin: state.create.pin,
    pinError: state.create.pinError,
    showHeader: true,
    showModal: state.create.showModal
  }),
  (dispatch: Dispatch): DispatchProps => ({
    changePin(data: string) {
      dispatch(recoveryChangePIN(data))
    },
    login() {
      dispatch(recoveryLoginComplete())
    }
  })
)(ChangeAccountPinScreenComponent)
