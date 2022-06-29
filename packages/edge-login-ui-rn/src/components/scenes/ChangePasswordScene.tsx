import * as React from 'react'
import { Keyboard, KeyboardAvoidingView, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import {
  validateConfirmPassword,
  validatePassword
} from '../../actions/CreateAccountActions'
import { onComplete } from '../../actions/WorkflowActions'
import s from '../../common/locales/strings'
import { useHandler } from '../../hooks/useHandler.js'
import { useDispatch, useSelector } from '../../types/ReduxTypes'
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
  title?: string | undefined
  onBack?: (() => void) | undefined
  onSubmit: (password: string) => void
  mainButtonLabel?: string
}

const ChangePasswordSceneComponent = ({
  title,
  onBack,
  onSubmit,
  mainButtonLabel = s.strings.done
}: Props) => {
  const theme = useTheme()
  const styles = getStyles(theme)

  const dispatch = useDispatch()
  const [focusFirst, setFocusFirst] = React.useState(true)
  const [focusSecond, setFocusSecond] = React.useState(false)
  const [hidePassword, setHidePassword] = React.useState(true)

  const hasPasswordStatus = useSelector(state => state.passwordStatus != null)
  const passed = useSelector(state => state?.passwordStatus?.passed ?? false)
  const password = useSelector(state => state.create.password ?? '')
  const confirmPassword = useSelector(
    state => state.create.confirmPassword ?? ''
  )
  const confirmError = useSelector(
    state => state.create.confirmPasswordErrorMessage ?? ''
  )
  const createError = useSelector(
    state => state.create.createPasswordErrorMessage ?? ''
  )

  const hasError = confirmError !== '' || createError !== ''
  const isValidPassword = passed && password === confirmPassword && !hasError

  const handleHidePassword = useHandler(() => {
    setHidePassword(!hidePassword)
  })

  const handlePress = useHandler(() => {
    if (hasError) return

    if (password !== '' && password !== confirmPassword) {
      dispatch(validateConfirmPassword(confirmPassword))
      return
    }

    return onSubmit(password)
  })

  const handleFocusSwitch = () => {
    setFocusFirst(false)
    setFocusSecond(true)
  }

  const validatePasswordDispatch = (password: string) => {
    dispatch(validatePassword(password))
  }
  const validateConfirmPasswordDispatch = (password: string) => {
    dispatch(validateConfirmPassword(password))
  }

  const renderInterior = () => {
    return (
      <>
        {hasPasswordStatus ? (
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
          hidePassword={hidePassword}
          onChangeText={validatePasswordDispatch}
          onSubmitEditing={handleFocusSwitch}
          onHidePassword={handleHidePassword}
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
          hidePassword={hidePassword}
          onChangeText={validateConfirmPasswordDispatch}
          onSubmitEditing={handlePress}
          onHidePassword={handleHidePassword}
          clearIcon
          searchIcon={false}
          marginRem={[0, 0.75, 1.25]}
        />
        <FormError marginRem={[0, 0.75]} invisible={!hasError}>
          {confirmError !== '' ? confirmError : createError}
        </FormError>
        <View style={styles.actions}>
          <Fade visible={isValidPassword} hidden>
            <MainButton
              label={mainButtonLabel}
              type="secondary"
              onPress={handlePress}
            />
          </Fade>
        </View>
      </>
    )
  }

  return (
    <ThemedScene onBack={onBack} title={title}>
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

const CommonChangePasswordScene = (action: any) => {
  const dispatch = useDispatch()
  const account = useSelector(state => state.account ?? undefined)

  const handleSubmit = useHandler(async (password: string) => {
    Keyboard.dismiss()
    if (account == null) return
    try {
      await account.changePassword(password)
      await Airship.show(bridge => (
        <ButtonsModal
          bridge={bridge}
          title={s.strings.password_changed}
          message={s.strings.pwd_change_modal}
          buttons={{ ok: { label: s.strings.ok } }}
        />
      ))
      dispatch(action())
    } catch (e) {
      showError(e)
    }
  })

  return <ChangePasswordSceneComponent onSubmit={handleSubmit} />
}

// The scene for existing users to change their password
export const ChangePasswordScene = () => CommonChangePasswordScene(onComplete)

// The scene for existing users to recover their password
export const ResecurePasswordScene = () =>
  CommonChangePasswordScene(() => ({ type: 'RESECURE_PIN' }))

// The scene for new users to create a password
export const NewAccountPasswordScene = () => {
  const dispatch = useDispatch()

  const handleBack = useHandler(() => {
    dispatch({ type: 'NEW_ACCOUNT_USERNAME' })
  })

  const handleSubmit = useHandler(() => {
    logEvent('Signup_Password_Valid')
    dispatch({ type: 'NEW_ACCOUNT_PIN' })
  })

  return (
    <ChangePasswordSceneComponent
      onBack={handleBack}
      onSubmit={handleSubmit}
      title={s.strings.choose_title_password}
      mainButtonLabel={s.strings.next_label}
    />
  )
}
