import * as React from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import {
  validateConfirmPassword,
  validatePassword
} from '../../../actions/CreateAccountActions'
import s from '../../../common/locales/strings'
import { Dispatch, RootState } from '../../../types/ReduxTypes'
import { logEvent } from '../../../util/analytics'
import { connect } from '../../services/ReduxStore'
import { Theme, ThemeProps, withTheme } from '../../services/ThemeContext'
import { EdgeText } from '../../themed/EdgeText'
import { EdgeTextFieldOutlined } from '../../themed/EdgeTextFieldOutlined'
import { Fade } from '../../themed/Fade'
import { FormError } from '../../themed/FormError'
import { MainButton } from '../../themed/MainButton'
import { PasswordStatus } from '../../themed/PasswordStatus'
import { ThemedScene } from '../../themed/ThemedScene'

interface OwnProps {}
interface StateProps {
  confirmPassword: string
  confirmPasswordErrorMessage: string
  createPasswordErrorMessage: string
  password: string
  isPasswordStatusExists: boolean
  isPasswordPassed: boolean
}
interface DispatchProps {
  onDone: () => void
  onBack: () => void
  validateConfirmPassword: (password: string) => void
  validatePassword: (password: string) => void
}
type Props = OwnProps & StateProps & DispatchProps & ThemeProps

const NewAccountPasswordSceneComponent = ({
  confirmPassword,
  confirmPasswordErrorMessage,
  createPasswordErrorMessage,
  password,
  onDone,
  onBack,
  validateConfirmPassword,
  validatePassword,
  isPasswordStatusExists,
  isPasswordPassed,
  theme
}: Props) => {
  const styles = getStyles(theme)
  const [focusFirst, setFocusFirst] = React.useState<boolean>(true)
  const [focusSecond, setFocusSecond] = React.useState<boolean>(false)

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
    onDone()
  }

  const renderInterior = () => {
    return (
      <>
        {isPasswordStatusExists ? (
          <PasswordStatus marginRem={[0.5, 0, 1.25]} />
        ) : (
          <EdgeText style={styles.description} numberOfLines={4}>
            {s.strings.password_desc}
          </EdgeText>
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
            <MainButton
              label={s.strings.next_label}
              type="secondary"
              onPress={handleNext}
            />
          </Fade>
        </View>
      </>
    )
  }

  return (
    <ThemedScene onBack={onBack} title={s.strings.choose_title_password}>
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

export const NewAccountPasswordScene = connect<
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
      dispatch({ type: 'NEW_ACCOUNT_PIN' })
    },
    onBack() {
      dispatch({ type: 'NEW_ACCOUNT_USERNAME' })
    },
    validateConfirmPassword(password: string) {
      dispatch(validateConfirmPassword(password))
    },
    validatePassword(password: string) {
      dispatch(validatePassword(password))
    }
  })
)(withTheme(NewAccountPasswordSceneComponent))
