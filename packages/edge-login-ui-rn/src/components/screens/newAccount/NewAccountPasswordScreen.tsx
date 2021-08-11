import { EdgeAccount } from 'edge-core-js'
import * as React from 'react'
import { Keyboard, KeyboardAvoidingView, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import {
  validateConfirmPassword,
  validatePassword
} from '../../../actions/CreateAccountActions'
import { onComplete } from '../../../actions/WorkflowActions'
import s from '../../../common/locales/strings'
import { Dispatch, RootState } from '../../../types/ReduxTypes'
import { logEvent } from '../../../util/analytics'
import { getAccount } from '../../../util/selectors'
import { ButtonsModal } from '../../modals/ButtonsModal'
import { Airship, showError } from '../../services/AirshipInstance'
import { connect } from '../../services/ReduxStore'
import { Theme, ThemeProps, withTheme } from '../../services/ThemeContext'
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

interface OwnProps {
  showHeader?: boolean
}
interface StateProps {
  account?: EdgeAccount
  confirmPassword: string
  confirmPasswordErrorMessage: string
  createPasswordErrorMessage: string
  password: string
  isPasswordStatusExists: boolean
  isPasswordPassed: boolean
}
interface DispatchProps {
  onDone: () => void
  onBack?: () => void
  onSkip?: () => void
  validateConfirmPassword: (password: string) => void
  validatePassword: (password: string) => void
}
type Props = OwnProps & StateProps & DispatchProps & ThemeProps

const NewAccountPasswordScreenComponent = ({
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
  const [focusFirst, setFocusFirst] = React.useState<boolean>(true)
  const [focusSecond, setFocusSecond] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)

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

    if (account != null) {
      Keyboard.dismiss()
      setLoading(true)
      account
        .changePassword(password)
        .then(() => {
          setLoading(false)
          onDone()
        })
        .catch(error => {
          setLoading(false)
          showError(error)
        })
    } else {
      onDone()
    }
  }

  const renderInterior = () => {
    return (
      <>
        {isPasswordStatusExists ? (
          <PasswordStatus marginRem={[0, 0, 1.25]} />
        ) : (
          <>
            {account == null && (
              <EdgeText
                style={styles.subtitle}
              >{`${s.strings.step_two}: ${s.strings.choose_title_password}`}</EdgeText>
            )}
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
      {showHeader && onBack != null && (
        <BackButton onPress={onBack} marginRem={[0, 0, 1, -0.5]} />
      )}
      {showHeader && onSkip != null && (
        <SkipButton onPress={onSkip} marginRem={[0, -0.5, 1, 0]} />
      )}
      {showHeader && (
        <SimpleSceneHeader>
          {account != null
            ? s.strings.change_password
            : s.strings.create_your_account}
        </SimpleSceneHeader>
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

export const NewAccountPasswordScreen = connect<
  StateProps,
  DispatchProps,
  OwnProps
>(
  (state: RootState) => ({
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
    onBack() {
      dispatch({ type: 'WORKFLOW_BACK' })
    },
    validateConfirmPassword(password: string) {
      dispatch(validateConfirmPassword(password))
    },
    validatePassword(password: string) {
      dispatch(validatePassword(password))
    }
  })
)(withTheme(NewAccountPasswordScreenComponent))

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
)(withTheme(NewAccountPasswordScreenComponent))

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
)(withTheme(NewAccountPasswordScreenComponent))
