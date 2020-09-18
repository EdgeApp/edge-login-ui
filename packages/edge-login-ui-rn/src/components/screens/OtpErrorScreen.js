// @flow

import { type OtpError } from 'edge-core-js'
import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { sprintf } from 'sprintf-js'

import { login } from '../../actions/LoginAction.js'
import { hasReadyVoucher } from '../../actions/LoginOtpActions.js'
import s from '../../common/locales/strings.js'
import { type Dispatch, type RootState } from '../../types/ReduxTypes.js'
import { type LoginAttempt } from '../../util/loginAttempt.js'
import { makePeriodicTask } from '../../util/periodicTask.js'
import { Header } from '../common/Header.js'
import { OtpBackupCodeModal } from '../modals/OtpBackupCodeModal.js'
import { OtpResetModal } from '../modals/OtpResetModal.js'
import { QrCodeModal } from '../modals/QrCodeModal.js'
import { Airship, showError, showToast } from '../services/AirshipInstance.js'
import { connect } from '../services/ReduxStore.js'
import {
  type Theme,
  type ThemeProps,
  withTheme
} from '../services/ThemeContext.js'
import { ThemedScene } from '../themed/ThemedScene.js'

type OwnProps = {}
type StateProps = {
  otpError: OtpError,
  otpAttempt: LoginAttempt,
  otpResetDate?: Date
}
type DispatchProps = {
  goBack(): void,
  hasReadyVoucher(otpError: OtpError): Promise<boolean>,
  login(otpAttempt: LoginAttempt): Promise<void>,
  saveOtpError(otpAttempt: LoginAttempt, otpError: OtpError): void
}
type Props = OwnProps & StateProps & DispatchProps & ThemeProps

class OtpErrorScreenComponent extends React.Component<Props> {
  checkVoucher = makePeriodicTask(async () => {
    const {
      hasReadyVoucher,
      login,
      otpAttempt,
      otpError,
      saveOtpError
    } = this.props

    try {
      const result = await hasReadyVoucher(otpError)
      if (result) {
        showToast(s.strings.otp_screen_retrying)
        await login(otpAttempt)
      }
    } catch (error) {
      if (error != null && error.name === 'OtpError') {
        saveOtpError(otpAttempt, error)
      } else {
        showError(error)
      }
    }
  }, 5000)

  componentDidMount() {
    this.checkVoucher.start()
  }

  componentWillUnmount() {
    this.checkVoucher.stop()
  }

  handleBackupModal = () => {
    const { otpAttempt } = this.props
    Airship.show(bridge => (
      <OtpBackupCodeModal bridge={bridge} otpAttempt={otpAttempt} />
    ))
  }

  handleResetModal = () => {
    Airship.show(bridge => <OtpResetModal bridge={bridge} />)
  }

  handleQrModal = () => {
    Airship.show(bridge => <QrCodeModal bridge={bridge} />)
  }

  render() {
    const { otpError, otpResetDate, theme } = this.props
    const styles = getStyles(theme)

    let date = otpResetDate
    if (otpError.voucherActivates != null) date = otpError.voucherActivates

    const isIp = otpError.reason === 'ip'

    function divider() {
      return (
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>{s.strings.or}</Text>
          <View style={styles.dividerLine} />
        </View>
      )
    }

    return (
      <ThemedScene>
        <Header onBack={this.props.goBack} />
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <FontAwesome
              name="exclamation-triangle"
              style={styles.headerIcon}
            />
            <Text style={styles.headerText}>
              {isIp
                ? s.strings.otp_screen_header_ip
                : s.strings.otp_screen_header_2fa}
            </Text>
          </View>
          <Text style={styles.body1}>{s.strings.otp_screen_approve}</Text>
          {divider()}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.handleQrModal}
          >
            <Text style={styles.buttonText}>{s.strings.qr_modal_title}</Text>
            <FontAwesome name="chevron-right" style={styles.buttonIcon} />
          </TouchableOpacity>
          {isIp ? null : (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.handleBackupModal}
            >
              <Text style={styles.buttonText}>
                {s.strings.otp_backup_code_modal_title}
              </Text>
              <FontAwesome name="chevron-right" style={styles.buttonIcon} />
            </TouchableOpacity>
          )}
          {divider()}
          {date == null ? (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.handleResetModal}
            >
              <Text style={styles.buttonText}>
                {s.strings.disable_otp_button_two}
              </Text>
              <FontAwesome name="chevron-right" style={styles.buttonIcon} />
            </TouchableOpacity>
          ) : (
            <Text style={styles.body2}>
              {sprintf(s.strings.otp_screen_wait, date.toLocaleString())}
            </Text>
          )}
        </View>
      </ThemedScene>
    )
  }
}

const getStyles = cacheStyles((theme: Theme) => ({
  container: {
    flex: 1,
    padding: theme.rem(1)
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: theme.rem(0.5)
  },
  headerIcon: {
    color: theme.primaryText,
    fontSize: theme.rem(2.5),
    marginRight: theme.rem(1)
  },
  headerText: {
    fontFamily: theme.fontFamily,
    fontSize: theme.rem(1),
    color: theme.primaryText,
    flex: 1
  },
  body1: {
    fontFamily: theme.fontFamily,
    fontSize: theme.rem(1),
    color: theme.primaryText,
    marginVertical: theme.rem(0.5)
  },
  dividerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: theme.rem(0.5)
  },
  dividerLine: {
    height: 1,
    borderColor: theme.secondaryText,
    borderBottomWidth: 1,
    flex: 1
  },
  dividerText: {
    fontFamily: theme.fontFamily,
    fontSize: theme.rem(1),
    color: theme.secondaryText,
    marginHorizontal: theme.rem(0.5),
    paddingBottom: 5 // padding to center the text
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonIcon: {
    color: theme.primaryButton,
    height: theme.rem(1),
    textAlign: 'center'
  },
  buttonText: {
    fontFamily: theme.fontFamily,
    fontSize: theme.rem(1),
    color: theme.primaryButton,
    marginVertical: theme.rem(0.5),
    flex: 1
  },
  body2: {
    fontFamily: theme.fontFamily,
    fontSize: theme.rem(1),
    color: theme.primaryText,
    marginVertical: theme.rem(0.5)
  }
}))

export const OtpErrorScreen = withTheme(
  connect<StateProps, DispatchProps, OwnProps & ThemeProps>(
    (state: RootState) => {
      const { otpAttempt, otpError, otpResetDate } = state.login
      if (otpAttempt == null || otpError == null) {
        throw new Error('Missing OtpError for OTP error screen')
      }
      return { otpAttempt, otpError, otpResetDate }
    },
    (dispatch: Dispatch) => ({
      goBack() {
        dispatch({ type: 'WORKFLOW_START', data: 'passwordWF' })
      },
      hasReadyVoucher(error: OtpError) {
        return dispatch(hasReadyVoucher(error))
      },
      login(attempt: LoginAttempt): Promise<void> {
        return dispatch(login(attempt))
      },
      saveOtpError(attempt, error) {
        dispatch({ type: 'OTP_ERROR', data: { attempt, error } })
      }
    })
  )(OtpErrorScreenComponent)
)
