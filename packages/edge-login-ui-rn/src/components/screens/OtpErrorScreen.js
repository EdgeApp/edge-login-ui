// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'

import { retryWithOtp } from '../../actions/LoginAction.js'
import s from '../../common/locales/strings.js'
import OtpBackupKeyConnector from '../../connectors/componentConnectors/OtpBackupKeyConnector.js'
import * as Constants from '../../constants/index.js'
import * as Styles from '../../styles/index.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { EdgeLoginQr } from '../abSpecific/EdgeLoginQrComponent.js'
import { OtpHeroComponent } from '../abSpecific/OtpHeroComponent'
import { Button } from '../common/Button.js'
import { Header } from '../common/Header.js'
import SafeAreaView from '../common/SafeAreaViewGradient.js'
import { OtpAuthCodeModal } from '../modals/OtpAuthCodeModal.js'
import { OtpResetModal } from '../modals/OtpResetModal.js'
import { Airship } from '../services/AirshipInstance.js'
import { connect } from '../services/ReduxStore.js'

type OwnProps = {}
type StateProps = {
  backupKeyError?: string,
  loginSuccess: boolean,
  otpResetDate?: Date
}
type DispatchProps = {
  goBack(): void,
  setbackupKey(): void
}
type Props = OwnProps & StateProps & DispatchProps

type State = {
  showBackupCodeModal: boolean,
  backupKeyEntered: boolean
}

class OtpErrorScreenComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      showBackupCodeModal: false,
      backupKeyEntered: false
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.loginSuccess) {
      this.closeModals()
    }
    if (nextProps.backupKeyError) {
      this.setState({
        backupKeyEntered: false
      })
    }
  }

  componentWillUnMount() {
    this.closeModals()
  }

  handleResetModal = () => {
    Airship.show(bridge => <OtpResetModal bridge={bridge} />)
  }

  closeModals() {
    this.setState({
      showBackupCodeModal: false,
      backupKeyEntered: false
    })
  }

  sendCode() {
    this.setState({
      backupKeyEntered: true
    })
    this.props.setbackupKey()
  }

  showBackupModal() {
    this.setState({
      showBackupCodeModal: true
    })
  }

  renderModal(style: typeof OtpErrorScreenStyle) {
    if (this.state.showBackupCodeModal) {
      const middle = (
        <View style={style.modalMiddle}>
          <Text style={style.staticModalText}>
            {s.strings.otp_instructions}
          </Text>
          <OtpBackupKeyConnector
            style={style.modalInput}
            onSubmitEditing={this.sendCode.bind(this)}
          />
          <View style={style.shim} />
        </View>
      )
      return (
        <OtpAuthCodeModal
          cancel={this.closeModals.bind(this)}
          action={this.sendCode.bind(this)}
          middle={middle}
          thinking={this.state.backupKeyEntered}
        />
      )
    }
    return null
  }

  renderDisableButton(style: typeof OtpErrorScreenStyle) {
    if (this.props.otpResetDate == null) {
      return (
        <Button
          onPress={this.handleResetModal}
          downStyle={style.exitButton.downStyle}
          downTextStyle={style.exitButton.downTextStyle}
          upStyle={style.exitButton.upStyle}
          upTextStyle={style.exitButton.upTextStyle}
          label={s.strings.disable_otp_button_two}
        />
      )
    }
    return null
  }

  render() {
    return (
      <SafeAreaView>
        <View style={OtpErrorScreenStyle.screen}>
          <Header onBack={this.props.goBack} />
          <View style={OtpErrorScreenStyle.pageContainer}>
            <OtpHeroComponent
              style={OtpErrorScreenStyle.hero}
              otpResetDate={this.props.otpResetDate}
            />
            <View style={OtpErrorScreenStyle.qrRow}>
              <EdgeLoginQr />
            </View>
            <View style={OtpErrorScreenStyle.shim} />
            <Button
              onPress={this.showBackupModal.bind(this)}
              downStyle={OtpErrorScreenStyle.exitButton.downStyle}
              downTextStyle={OtpErrorScreenStyle.exitButton.downTextStyle}
              upStyle={OtpErrorScreenStyle.exitButton.upStyle}
              upTextStyle={OtpErrorScreenStyle.exitButton.upTextStyle}
              label={s.strings.type_auth_button}
            />
            {this.renderDisableButton(OtpErrorScreenStyle)}
          </View>
          {this.renderModal(OtpErrorScreenStyle)}
        </View>
      </SafeAreaView>
    )
  }
}

const OtpErrorScreenStyle = {
  screen: { ...Styles.ScreenStyle },
  pageContainer: {
    ...Styles.PageContainerWithHeaderStyle,
    alignItems: 'center'
  },
  hero: {
    container: {
      position: 'relative',
      width: '100%'
    },
    colorField: {
      position: 'relative',
      width: '100%',
      height: 100,
      backgroundColor: Constants.GRAY_3,
      flexDirection: 'row',
      paddingTop: 20
    },
    leftField: {
      flex: 2,
      paddingRight: 10,
      paddingTop: 2,
      alignItems: 'flex-end'
    },
    rightField: {
      flex: 8
    },
    heroTitleText: {
      color: Constants.PRIMARY,
      fontSize: 17
    },
    heroText: {
      color: Constants.GRAY_1,
      fontSize: 14,
      marginTop: 7
    },
    orOption: {
      position: 'relative',
      height: 100,
      width: '100%',
      backgroundColor: Constants.WHITE
    },
    orRow: {
      height: 48,
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    instructionsRow: {
      height: 52
    },
    instructionsText: {
      width: '90%',
      textAlign: 'center',
      marginLeft: '5%',
      marginRight: '5%',
      color: Constants.GRAY_1
    },
    shim: { ...Styles.Shim, height: 20 }
  },
  shim: { ...Styles.Shim, height: 20 },
  qrRow: {
    position: 'relative',
    width: '100%',
    height: 150
  },
  exitButton: {
    upStyle: Styles.TextOnlyButtonUpStyle,
    upTextStyle: { ...Styles.TextOnlyButtonTextUpStyle, width: 'auto' },
    downTextStyle: { ...Styles.TextOnlyButtonTextDownStyle, width: 'auto' },
    downStyle: Styles.TextOnlyButtonDownStyle
  },
  staticModalText: {
    color: Constants.GRAY_1,
    width: '100%',
    fontSize: 15,
    textAlign: 'center'
  },
  modalMiddle: {
    position: 'relative',
    width: '100%'
  },
  modalInput: {
    ...Styles.MaterialInputOnWhite,
    container: {
      ...Styles.MaterialInputOnWhite.container,
      width: '100%'
    }
  }
}

export const OtpErrorScreen = connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => {
    let otpResetDate
    if (state.login.otpError != null) {
      otpResetDate = state.login.otpError.resetDate
    }
    return {
      backupKeyError: state.login.otpErrorMessage || '',
      loginSuccess: state.login.loginSuccess,
      otpResetDate
    }
  },
  (dispatch: Dispatch) => ({
    goBack() {
      dispatch({ type: 'WORKFLOW_START', data: 'passwordWF' })
    },
    setbackupKey() {
      dispatch(retryWithOtp())
    }
  })
)(OtpErrorScreenComponent)
