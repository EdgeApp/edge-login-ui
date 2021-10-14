import * as React from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import {
  validateConfirmPassword,
  validatePassword
} from '../../../actions/CreateAccountActions'
import s from '../../../common/locales/strings'
import { PasswordStatusState } from '../../../reducers/PasswordStatusReducer'
import { Dispatch, RootState } from '../../../types/ReduxTypes'
import { logEvent } from '../../../util/analytics'
import { connect } from '../../services/ReduxStore'
import { Theme, ThemeProps, withTheme } from '../../services/ThemeContext'
import { BackButton } from '../../themed/BackButton'
import { EdgeText } from '../../themed/EdgeText'
import { EdgeTextFieldOutlined } from '../../themed/EdgeTextFieldOutlined'
import { Fade } from '../../themed/Fade'
import { FormError } from '../../themed/FormError'
import { PasswordStatus } from '../../themed/PasswordStatus'
import { SimpleSceneHeader } from '../../themed/SimpleSceneHeader'
import { SecondaryButton } from '../../themed/ThemedButtons'
import { ThemedScene } from '../../themed/ThemedScene'

interface OwnProps {}
interface StateProps {
  confirmPassword: string
  createPasswordErrorMessage: string
  password: string
  isPasswordStatusExists: boolean
  isPasswordPassed: boolean
  status: PasswordStatusState | null
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
  createPasswordErrorMessage,
  password,
  onDone,
  onBack,
  validateConfirmPassword,
  validatePassword,
  isPasswordStatusExists,
  isPasswordPassed,
  status,
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

    if (createPasswordErrorMessage !== '') {
      logEvent('Signup_Password_Invalid')
      return
    }

    if (password != null && password !== confirmPassword) {
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
          <PasswordStatus
            marginRem={[0, 0, 1.25]}
            status={status}
            isPasswordConfirmed={
              password !== '' &&
              confirmPassword !== '' &&
              password === confirmPassword
            }
          />
        ) : (
          <>
            <EdgeText
              style={styles.subtitle}
            >{`${s.strings.step_two}: ${s.strings.choose_title_password}`}</EdgeText>
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
          invisible={createPasswordErrorMessage === ''}
        >
          {createPasswordErrorMessage}
        </FormError>
        <View style={styles.actions}>
          <Fade
            visible={
              isPasswordPassed &&
              password === confirmPassword &&
              createPasswordErrorMessage === ''
            }
            hidden
          >
            <SecondaryButton
              label={s.strings.next_label}
              onPress={handleNext}
            />
          </Fade>
        </View>
      </>
    )
  }

  return (
    <ThemedScene paddingRem={[0.5, 0, 0.5, 0.5]}>
      <BackButton onPress={onBack} marginRem={[0, 0, 1, -0.5]} />
      <SimpleSceneHeader>{s.strings.create_your_account}</SimpleSceneHeader>
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

export const NewAccountPasswordScene = connect<
  StateProps,
  DispatchProps,
  OwnProps
>(
  (state: RootState) => ({
    confirmPassword: state.create.confirmPassword || '',
    createPasswordErrorMessage: state.create.createPasswordErrorMessage || '',
    password: state.create.password || '',
    isPasswordStatusExists: !!state.passwordStatus,
    isPasswordPassed: Boolean(
      state.passwordStatus && state.passwordStatus.passed
    ),
    status: state.passwordStatus
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
