// @flow

import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import { connect } from 'react-redux'

import * as actions from '../../../common/actions/index.js'
import s from '../../../common/locales/strings.js'
import { MaterialInputOnWhite } from '../../../common/styles/common/FormFieldStyle.js'
import { theme } from '../../../common/theme/edgeDark.js'
import OtpBackupKeyConnector from '../../../native/connectors/componentConnectors/OtpBackupKeyConnector.js'
import type { Dispatch, State as StateType } from '../../../types/ReduxTypes'
import { type AirshipBridge, AirshipModal, ContentArea } from './modalParts.js'

type OwnProps = {
  bridge: AirshipBridge<void>
}

type StateProps = {
  otpCode: string,
  otpError?: string
}

type DispatchProps = {
  submit(): void
}

type State = {
  loading: boolean
}

type Props = OwnProps & StateProps & DispatchProps

export class OtpAuthenticationCodeModalConnector extends Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.otpError && prevProps.otpError !== this.props.otpError) {
      this.setState({ loading: false })
    }
  }

  submit = () => {
    this.setState({ loading: true })
    this.props.submit()
  }

  close = () => {
    if (!this.state.loading) {
      this.props.bridge.resolve()
    }
  }

  render() {
    const { bridge, otpCode } = this.props
    const { loading } = this.state

    return (
      <AirshipModal bridge={bridge} onCancel={this.close}>
        <View style={styles.container}>
          <ContentArea padding={rem(1.5)}>
            <View style={styles.contentContainer}>
              <Text style={styles.header}>
                {s.strings.otp_auth_code_header}
              </Text>
              <Text style={styles.body}>{s.strings.otp_instructions}</Text>
              <OtpBackupKeyConnector
                style={modalInput}
                onSubmitEditing={this.submit}
              />
              {otpCode && otpCode.length > 15 ? (
                <TouchableWithoutFeedback
                  onPress={this.submit}
                  disabled={loading}
                >
                  <View style={styles.submitButtonContainer}>
                    <View style={styles.submitButton}>
                      {loading ? (
                        <ActivityIndicator
                          color={theme.alertPageDenyButtonText}
                        />
                      ) : (
                        <Text style={styles.submitText}>
                          {s.strings.submit}
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              ) : null}
              <TouchableWithoutFeedback onPress={this.close}>
                <View style={styles.downIconContainer}>
                  <Entypo
                    name="chevron-thin-down"
                    size={theme.rem(1.25)}
                    color={theme.alertModalCloseIcon}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </ContentArea>
        </View>
      </AirshipModal>
    )
  }
}

export const OtpAuthenticationCodeModal = connect(
  (state: StateType) => ({
    otpCode: state.login.otpUserBackupKey,
    otpError: state.login.otpErrorMessage
  }),
  (dispatch: Dispatch) => ({
    submit: () => dispatch(actions.retryWithOtp())
  })
)(OtpAuthenticationCodeModalConnector)

const { rem } = theme
const modalInput = {
  ...MaterialInputOnWhite,
  container: {
    ...MaterialInputOnWhite.container,
    width: '100%',
    marginBottom: rem(2.5)
  },
  baseColor: theme.primaryText,
  tintColor: theme.primaryText,
  errorColor: theme.dangerText,
  textColor: theme.primaryText,
  affixTextStyle: {
    color: theme.dangerText,
    fontFamily: theme.fontFamily
  },
  titleTextStyle: {
    color: theme.primaryText,
    fontFamily: theme.fontFamily
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.qrCodeModalBackgroud,
    borderTopLeftRadius: rem(1),
    borderTopRightRadius: rem(1)
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center'
  },
  header: {
    textAlign: 'center',
    color: theme.headerText,
    fontFamily: theme.fontFamily,
    fontSize: rem(1.25),
    marginBottom: rem(1.5)
  },
  body: {
    textAlign: 'center',
    color: theme.headerText,
    fontFamily: theme.fontFamily,
    fontSize: rem(1),
    marginBottom: rem(1.5)
  },
  submitButtonContainer: {
    width: '100%',
    marginBottom: rem(1.5),
    paddingHorizontal: rem(1)
  },
  submitButton: {
    width: '100%',
    height: rem(3),
    borderRadius: rem(1.5),
    backgroundColor: theme.alertPageDenyButtonBackground,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitText: {
    fontFamily: theme.fontFamily,
    fontSize: rem(1),
    color: theme.alertPageDenyButtonText
  },
  downIconContainer: {
    alignItems: 'center'
  }
})
