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
import { HeaderComponent } from '../common/Header.js'
import { OtpResetModal } from '../modals/OtpResetModal.js'
import { QrCodeModal } from '../modals/QrCodeModal.js'
import { TextInputModal } from '../modals/TextInputModal.js'
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
  login(otpAttempt: LoginAttempt, otpKey?: string): Promise<void>,
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
    const { login, otpAttempt, saveOtpError } = this.props

    async function handleSubmit(otpKey: string): Promise<boolean | string> {
      try {
        this.checkVoucher.stop()
        await login(otpAttempt, otpKey)
        return true
      } catch (error) {
        // Restart the background checking if the login failed:
        this.checkVoucher.start()

        // Translate known errors:
        if (error != null && error.name === 'OtpError') {
          saveOtpError(otpAttempt, error)
          return s.strings.backup_key_incorrect
        }
        if (error != null && error.message === 'Unexpected end of data') {
          return s.strings.backup_key_incorrect
        }
        showError(error)
        return false
      }
    }

    Airship.show(bridge => (
      <TextInputModal
        bridge={bridge}
        onSubmit={handleSubmit}
        title={s.strings.otp_backup_code_modal_title}
        message={s.strings.otp_instructions}
        inputLabel={s.strings.backup_key_label}
        submitLabel={s.strings.submit}
        autoCapitalize="characters"
        returnKeyType="done"
      />
    ))
  }

  handleResetModal = () => {
    Airship.show(bridge => <OtpResetModal bridge={bridge} />)
  }

  handleQrModal = () => {
    Airship.show(bridge => <QrCodeModal bridge={bridge} />)
  }

  render() {
    const { otpError, theme } = this.props
    const styles = getStyles(theme)

    const isIp = otpError.reason === 'ip'

    return (
      <ThemedScene>
        <HeaderComponent
          onBack={this.props.goBack}
          subTitle=""
          title={isIp ? s.strings.otp_header_ip : s.strings.otp_header}
        />
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
          {this.renderDivider(styles)}
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
          {this.renderResetArea(styles)}
        </View>
      </ThemedScene>
    )
  }

  renderResetArea(styles: $Call<typeof getStyles, Theme>): React.Node {
    const { otpError, otpResetDate } = this.props

    // If we have an automatic login date, show that:
    let date = otpResetDate
    if (otpError.voucherActivates != null) date = otpError.voucherActivates
    if (date != null) {
      return (
        <>
          {this.renderDivider(styles)}
          <Text style={styles.body2}>
            {sprintf(s.strings.otp_screen_wait, date.toLocaleString())}
          </Text>
        </>
      )
    }

    // Otherwise, show the reset button if we have a token:
    if (otpError.resetToken != null) {
      return (
        <>
          {this.renderDivider(styles)}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.handleResetModal}
          >
            <Text style={styles.buttonText}>
              {s.strings.disable_otp_button_two}
            </Text>
            <FontAwesome name="chevron-right" style={styles.buttonIcon} />
          </TouchableOpacity>
        </>
      )
    }

    // Otherwise, there is nothing to show here:
    return null
  }

  renderDivider(styles: $Call<typeof getStyles, Theme>): React.Node {
    return (
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>{s.strings.or}</Text>
        <View style={styles.dividerLine} />
      </View>
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
      login(attempt: LoginAttempt, otpKey?: string): Promise<void> {
        return dispatch(login(attempt, otpKey))
      },
      saveOtpError(attempt, error) {
        dispatch({ type: 'OTP_ERROR', data: { attempt, error } })
      }
    })
  )(OtpErrorScreenComponent)
)
