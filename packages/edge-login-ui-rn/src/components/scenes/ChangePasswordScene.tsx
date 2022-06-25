import * as React from 'react'
import { Keyboard, KeyboardAvoidingView, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'
import { useDispatch, useSelector } from 'react-redux'

import {
  validateConfirmPassword,
  validatePassword
} from '../../actions/CreateAccountActions'
import { onComplete } from '../../actions/WorkflowActions'
import s from '../../common/locales/strings'
import { RootState } from '../../types/ReduxTypes'
import { logEvent } from '../../util/analytics'
import { ButtonsModal } from '../modals/ButtonsModal'
import { Airship, showError } from '../services/AirshipInstance'
import { Theme, useTheme } from '../services/ThemeContext'
import { EdgeText } from '../themed/EdgeText'
import { Fade } from '../themed/Fade'
import { FormError } from '../themed/FormError'
import { MainButton } from '../themed/MainButton'
import { OutlinedTextInput } from '../themed/OutlinedTextInput'
import { PasswordStatus } from '../themed/PasswordStatus'
import { ThemedScene } from '../themed/ThemedScene'

interface Props {
  title: string | undefined
  onBack: (() => void) | undefined
  onNext: () => void
  mainButtonLabel: string
  mainButtonType: 'primary' | 'secondary'
  noUnderline: boolean
}

const ChangePasswordSceneComponent = ({
  title,
  onBack,
  onNext,
  mainButtonLabel,
  mainButtonType,
  noUnderline
}: Props) => {
  const theme = useTheme()
  const styles = getStyles(theme)

  const dispatch = useDispatch()
  const [focusFirst, setFocusFirst] = React.useState(true)
  const [focusSecond, setFocusSecond] = React.useState(false)

  const confirmPassword =
    useSelector((state: RootState) => state.create.confirmPassword) ?? ''
  const confirmPasswordErrorMessage =
    useSelector(
      (state: RootState) => state.create.confirmPasswordErrorMessage
    ) ?? ''
  const createPasswordErrorMessage =
    useSelector(
      (state: RootState) => state.create.createPasswordErrorMessage
    ) ?? ''
  const password =
    useSelector((state: RootState) => state.create.password) ?? ''

  const handleFocusSwitch = () => {
    setFocusFirst(false)
    setFocusSecond(true)
  }

  const isPasswordStatusExists = useSelector(
    (state: RootState) => state.passwordStatus != null
  )
  const isPasswordPassed = useSelector(
    (state: RootState) =>
      state.passwordStatus != null && state.passwordStatus.passed
  )

  const validatePasswordDispatch = (password: string) => {
    dispatch(validatePassword(password))
  }
  const validateConfirmPasswordDispatch = (password: string) => {
    dispatch(validateConfirmPassword(password))
  }
  const renderInterior = () => {
    return (
      <>
        {isPasswordStatusExists ? (
          <PasswordStatus marginRem={[0.5, 0.5, 1.25]} />
        ) : (
          <EdgeText style={styles.description} numberOfLines={4}>
            {s.strings.password_desc}
          </EdgeText>
        )}
        <OutlinedTextInput
          value={password}
          secureTextEntry
          returnKeyType="next"
          label={s.strings.password}
          autoFocus={focusFirst}
          onChangeText={validatePasswordDispatch}
          onSubmitEditing={handleFocusSwitch}
          clearIcon
          searchIcon={false}
          marginRem={[0, 0.75, 1.25]}
        />
        <OutlinedTextInput
          value={confirmPassword}
          secureTextEntry
          returnKeyType="go"
          label={s.strings.confirm_password}
          autoFocus={focusSecond}
          onChangeText={validateConfirmPasswordDispatch}
          onSubmitEditing={onNext}
          clearIcon
          searchIcon={false}
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
            <MainButton
              label={mainButtonLabel}
              type={mainButtonType}
              onPress={onNext}
            />
          </Fade>
        </View>
      </>
    )
  }

  return (
    <ThemedScene onBack={onBack} title={title} noUnderline={noUnderline}>
      {focusSecond ? (
        <KeyboardAvoidingView
          style={styles.container}
          behavior="position"
          keyboardVerticalOffset={-150}
        >
          {renderInterior()}
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.container}>{renderInterior()}</View>
      )}
    </ThemedScene>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  container: {
    flex: 1,
    marginHorizontal: theme.rem(0.5),
    overflow: 'hidden'
  },
  description: {
    fontFamily: theme.fontFaceDefault,
    fontSize: theme.rem(0.875),
    marginBottom: theme.rem(3.25),
    marginTop: theme.rem(1.5)
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.rem(1)
  }
}))

// The scene for existing users to change their password
export const ChangePasswordScene = () => {
  const dispatch = useDispatch()
  const confirmPassword =
    useSelector((state: RootState) => state.create.confirmPassword) ?? ''
  const error =
    useSelector(
      (state: RootState) => state.create.confirmPasswordErrorMessage
    ) ?? ''
  const error2 =
    useSelector(
      (state: RootState) => state.create.createPasswordErrorMessage
    ) ?? ''
  const password =
    useSelector((state: RootState) => state.create.password) ?? ''
  const passwordStatus =
    useSelector((state: RootState) => state.create.passwordStatus) ?? ''
  const account = useSelector((state: RootState) => state.account ?? undefined)

  const validateConfirmPassword = (password: string) => {
    dispatch(validateConfirmPassword(password))
  }

  const handleBack = () => {
    dispatch(onComplete())
  }

  const handleDone = () => {
    Airship.show(bridge => (
      <ButtonsModal
        bridge={bridge}
        title={s.strings.password_changed}
        message={s.strings.pwd_change_modal}
        buttons={{ ok: { label: s.strings.ok } }}
      />
    ))
      .then(handleBack)
      .catch(showError)
  }

  const handleNext = () => {
    if (!passwordStatus || error !== '' || error2 !== '') {
      return
    }
    if (password && password !== confirmPassword) {
      validateConfirmPassword(confirmPassword)
      return
    }
    Keyboard.dismiss()
    if (account) {
      return account
        .changePassword(password)
        .then(handleDone)
        .catch(error => {
          showError(error)
        })
    }
  }

  return (
    <ChangePasswordSceneComponent
      onBack={undefined}
      onNext={handleNext}
      title={undefined}
      mainButtonLabel={s.strings.done}
      mainButtonType="primary"
      noUnderline
    />
  )
}

// The scene for new users to create a password
export const NewAccountPasswordScene = () => {
  const dispatch = useDispatch()
  const confirmPassword = useSelector(
    (state: RootState) => state.create.confirmPassword
  )
  const password = useSelector((state: RootState) => state.create.password)
  const confirmPasswordErrorMessage = useSelector(
    (state: RootState) => state.create.confirmPasswordErrorMessage
  )
  const createPasswordErrorMessage = useSelector(
    (state: RootState) => state.create.createPasswordErrorMessage
  )

  const isPasswordStatusExists = useSelector(
    (state: RootState) => !!state.passwordStatus
  )

  const validateConfirmPasswordDispatch = (password: string) => {
    dispatch(validateConfirmPassword(password))
  }

  const handleBack = () => {
    dispatch({ type: 'NEW_ACCOUNT_USERNAME' })
  }

  const handleDone = () => {
    dispatch({ type: 'NEW_ACCOUNT_PIN' })
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
      validateConfirmPasswordDispatch(confirmPassword ?? '')
      logEvent('Signup_Password_Invalid')
      return
    }

    logEvent('Signup_Password_Valid')
    handleDone()
  }

  return (
    <ChangePasswordSceneComponent
      onBack={handleBack}
      onNext={handleNext}
      title={s.strings.choose_title_password}
      mainButtonLabel={s.strings.next_label}
      mainButtonType="secondary"
      noUnderline={false}
    />
  )
}

// The scene for existing users to recover their password
export const ResecurePasswordScene = () => {
  const dispatch = useDispatch()
  const confirmPassword = useSelector(
    (state: RootState) => state.create.confirmPassword
  )
  const error = useSelector(
    (state: RootState) => state.create.confirmPasswordErrorMessage
  )
  const error2 = useSelector(
    (state: RootState) => state.create.createPasswordErrorMessage
  )
  const password = useSelector((state: RootState) => state.create.password)
  const passwordStatus = useSelector(
    (state: RootState) => state.create.passwordStatus
  )
  const account = useSelector((state: RootState) => state.account ?? undefined)

  const validateConfirmPasswordDispatch = (password: string) => {
    dispatch(validateConfirmPassword(password))
  }

  const handleDone = () => {
    dispatch({ type: 'RESECURE_PIN' })
  }

  const handleNext = () => {
    if (!passwordStatus || error !== '' || error2 !== '') {
      return
    }
    if (password && password !== confirmPassword) {
      validateConfirmPasswordDispatch(confirmPassword ?? '')
      return
    }

    Keyboard.dismiss()

    if (account) {
      return account
        .changePassword(password ?? '')
        .then(handleDone)
        .catch(error => {
          showError(error)
        })
    }
  }

  return (
    <ChangePasswordSceneComponent
      onBack={undefined}
      onNext={handleNext}
      title={undefined}
      mainButtonLabel={s.strings.done}
      mainButtonType="primary"
      noUnderline
    />
  )
}
