// @flow

import { type EdgeAccount } from 'edge-core-js'
import * as React from 'react'
import { Keyboard, Text, View } from 'react-native'

import { completeResecure } from '../../../actions/LoginCompleteActions.js'
import { onComplete } from '../../../actions/WorkflowActions.js'
import s from '../../../common/locales/strings.js'
import * as Constants from '../../../constants/index.js'
import * as Styles from '../../../styles/index.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import { scale } from '../../../util/scaling.js'
import { getAccount } from '../../../util/selectors.js'
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
  account: EdgeAccount,
  pin: string,
  pinError: string
}
type DispatchProps = {
  onDone: () => void,
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

  handleSubmit = () => {
    const { account, pin, pinError, onDone } = this.props
    if (pin.length !== 4 || pinError) return

    Keyboard.dismiss()
    this.setState({ isProcessing: true })
    account
      .changePin({ pin })
      .then(onDone)
      .catch(error => {
        this.setState({ isProcessing: false })
        showError(error)
      })
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
                onPress={this.handleSubmit}
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
    account: getAccount(state),
    pin: state.create.pin,
    pinError: state.create.pinError
  }),
  (dispatch: Dispatch) => ({
    onDone() {
      Airship.show(bridge => (
        <ButtonsModal
          bridge={bridge}
          title={s.strings.pin_changed}
          message={s.strings.pin_successfully_changed}
          buttons={{ ok: { label: s.strings.ok } }}
        />
      ))
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
    account: getAccount(state),
    pin: state.create.pin,
    pinError: state.create.pinError,
    showHeader: true
  }),
  (dispatch: Dispatch) => ({
    onDone() {
      Airship.show(bridge => (
        <ButtonsModal
          bridge={bridge}
          title={s.strings.pswd_and_pin_changed}
          message={s.strings.change_pwd_body}
          buttons={{ ok: { label: s.strings.ok } }}
        />
      ))
        .then(() => dispatch(completeResecure()))
        .catch(showError)
    },
    onSkip() {
      dispatch(completeResecure())
    }
  })
)(ChangePinScreenComponent)
