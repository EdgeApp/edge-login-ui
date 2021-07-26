// @flow

import { type EdgeAccount } from 'edge-core-js'
import * as React from 'react'
import { Keyboard, KeyboardAvoidingView, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import {
  validateConfirmPassword,
  validatePassword
} from '../../../actions/CreateAccountActions.js'
import { onComplete } from '../../../actions/WorkflowActions.js'
import s from '../../../common/locales/strings.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import { logEvent } from '../../../util/analytics.js'
import { useState } from '../../../util/hooks'
import { getAccount } from '../../../util/selectors.js'
import { ButtonsModal } from '../../modals/ButtonsModal.js'
import { Airship, showError } from '../../services/AirshipInstance.js'
import { connect } from '../../services/ReduxStore.js'
import {
  type Theme,
  type ThemeProps,
  withTheme
} from '../../services/ThemeContext'
import { BackButton } from '../../themed/BackButton'
import { EdgeText } from '../../themed/EdgeText'
import { EdgeTextFieldOutlined } from '../../themed/EdgeTextFieldOutlined'
import { Fade } from '../../themed/Fade'
import { FormError } from '../../themed/FormError'
import { PasswordStatus } from '../../themed/PasswordStatus'
import { SimpleSceneHeader } from '../../themed/SimpleSceneHeader'
import { SkipButton } from '../../themed/SkipButton'
import { SecondaryButton } from '../../themed/ThemedButtons'
import { ThemedScene } from '../../themed/ThemedScene'

type OwnProps = {
  showHeader?: boolean
}
type StateProps = {
  account: EdgeAccount,
  confirmPassword: string,
  confirmPasswordErrorMessage: string,
  createPasswordErrorMessage: string,
  password: string,
  isPasswordStatusExists: boolean,
  isPasswordPassed: boolean
}
type DispatchProps = {
  onDone(): void,
  onBack?: () => void,
  onSkip?: () => void,
  validateConfirmPassword(password: string): void,
  validatePassword(password: string): void
}
type Props = OwnProps & StateProps & DispatchProps & ThemeProps

const ChangePasswordScreenComponent = ({
  account,
  confirmPassword,
  confirmPasswordErrorMessage,
  createPasswordErrorMessage,
  password,
  onDone,
  onBack,
  onSkip,
  validateConfirmPassword,
  validatePassword,
  isPasswordStatusExists,
  isPasswordPassed,
  showHeader,
  theme
}: Props) => {
  const styles = getStyles(theme)
  const [focusFirst, setFocusFirst] = useState<boolean>(true)
  const [focusSecond, setFocusSecond] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleFocusSwitch = () => {
    setFocusFirst(false)
    setFocusSecond(true)
  }

  const handleNext = () => {
    if (!isPasswordStatusExists) return

    if (
      confirmPasswordErrorMessage !== '' ||
      createPasswordErrorMessage !== ''
    ) {
      logEvent('Signup_Password_Invalid')
      return
    }

    if (password && password !== confirmPassword) {
      validateConfirmPassword(confirmPassword)
      logEvent('Signup_Password_Invalid')
      return
    }

    logEvent('Signup_Password_Valid')

    setLoading(true)

    Keyboard.dismiss()
    account
      .changePassword(password)
      .then(onDone)
      .catch(error => {
        setLoading(false)
        showError(error)
      })
  }

  const renderInterior = () => {
    return (
      <>
        {isPasswordStatusExists ? (
          <PasswordStatus marginRem={[0, 0, 1.25]} />
        ) : (
          <>
            <EdgeText style={styles.description} numberOfLines={2}>
              {s.strings.password_desc}
            </EdgeText>
          </>
        )}
        <EdgeTextFieldOutlined
          value={password}
          secureTextEntry
          returnKeyType="next"
          label={s.strings.password}
          autoFocus={focusFirst}
          onChangeText={validatePassword}
          onSubmitEditing={handleFocusSwitch}
          isClearable
          showSearchIcon={false}
          marginRem={[0, 0.75, 1.25]}
        />
        <EdgeTextFieldOutlined
          value={confirmPassword}
          secureTextEntry
          returnKeyType="go"
          label={s.strings.confirm_password}
          autoFocus={focusSecond}
          onChangeText={validateConfirmPassword}
          onSubmitEditing={handleNext}
          isClearable
          showSearchIcon={false}
          marginRem={[0, 0.75, 1.25]}
        />
        <FormError
          marginRem={[0, 0.75]}
          invisible={
            !(confirmPasswordErrorMessage || createPasswordErrorMessage)
          }
        >
          {confirmPasswordErrorMessage || createPasswordErrorMessage}
        </FormError>
        <View style={styles.actions}>
          <Fade
            visible={
              isPasswordPassed &&
              password === confirmPassword &&
              !confirmPasswordErrorMessage &&
              !createPasswordErrorMessage
            }
            hidden
          >
            <SecondaryButton
              label={s.strings.next_label}
              onPress={handleNext}
              spinner={loading}
            />
          </Fade>
        </View>
      </>
    )
  }

  return (
    <ThemedScene paddingRem={[0.5, 0, 0.5, 0.5]}>
      {showHeader && onBack && (
        <BackButton onPress={onBack} marginRem={[0, 0, 1, -0.5]} />
      )}
      {showHeader && onSkip && (
        <SkipButton onPress={onSkip} marginRem={[0, -0.5, 1, 0]} />
      )}
      {showHeader && (
        <SimpleSceneHeader>{s.strings.change_password}</SimpleSceneHeader>
      )}
      {focusSecond ? (
        <KeyboardAvoidingView
          style={[styles.container, styles.overflowHidden]}
          contentContainerStyle={[
            styles.container,
            styles.overflowHidden,
            styles.containerMargins
          ]}
          behavior="position"
          keyboardVerticalOffset={-150}
        >
          {renderInterior()}
        </KeyboardAvoidingView>
      ) : (
        <View style={[styles.container, styles.containerMargins]}>
          {renderInterior()}
        </View>
      )}
    </ThemedScene>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  container: {
    flex: 1
  },
  overflowHidden: {
    overflow: 'hidden'
  },
  containerMargins: {
    marginLeft: theme.rem(0.5),
    marginRight: theme.rem(1)
  },
  subtitle: {
    fontFamily: theme.fontFaceBold,
    color: theme.secondaryText,
    fontSize: theme.rem(1),
    marginBottom: theme.rem(2.25)
  },
  description: {
    fontFamily: theme.fontFaceDefault,
    fontSize: theme.rem(0.875),
    marginBottom: theme.rem(3.25)
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.rem(1)
  }
}))

export const PublicChangePasswordScreen = connect<
  StateProps,
  DispatchProps,
  OwnProps
>(
  (state: RootState) => ({
    account: getAccount(state),
    confirmPassword: state.create.confirmPassword || '',
    confirmPasswordErrorMessage: state.create.confirmPasswordErrorMessage || '',
    createPasswordErrorMessage: state.create.createPasswordErrorMessage || '',
    password: state.create.password || '',
    isPasswordStatusExists: !!state.passwordStatus,
    isPasswordPassed: Boolean(
      state.passwordStatus && state.passwordStatus.passed
    )
  }),
  (dispatch: Dispatch) => ({
    onDone() {
      Airship.show(bridge => (
        <ButtonsModal
          bridge={bridge}
          title={s.strings.password_changed}
          message={s.strings.pwd_change_modal}
          buttons={{ ok: { label: s.strings.ok } }}
        />
      ))
        .then(() => dispatch(onComplete()))
        .catch(showError)
    },
    onBack() {
      dispatch(onComplete())
    },
    validateConfirmPassword(password: string) {
      dispatch(validateConfirmPassword(password))
    },
    validatePassword(password: string) {
      dispatch(validatePassword(password))
    }
  })
)(withTheme(ChangePasswordScreenComponent))

export const ResecurePasswordScreen = connect<
  StateProps,
  DispatchProps,
  OwnProps
>(
  (state: RootState) => ({
    account: getAccount(state),
    confirmPassword: state.create.confirmPassword || '',
    confirmPasswordErrorMessage: state.create.confirmPasswordErrorMessage || '',
    createPasswordErrorMessage: state.create.createPasswordErrorMessage || '',
    password: state.create.password || '',
    isPasswordStatusExists: !!state.passwordStatus,
    isPasswordPassed: Boolean(
      state.passwordStatus && state.passwordStatus.passed
    )
  }),
  (dispatch: Dispatch) => ({
    onDone() {
      dispatch({ type: 'WORKFLOW_NEXT' })
    },
    onSkip() {
      dispatch(dispatch({ type: 'WORKFLOW_NEXT' }))
    },
    validateConfirmPassword(password: string) {
      dispatch(validateConfirmPassword(password))
    },
    validatePassword(password: string) {
      dispatch(validatePassword(password))
    }
  })
)(withTheme(ChangePasswordScreenComponent))
