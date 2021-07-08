// @flow

import * as React from 'react'
import { Alert, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import {
  type CreateUserData,
  createUser
} from '../../../actions/CreateAccountActions.js'
import s from '../../../common/locales/strings.js'
import { type Dispatch, type RootState } from '../../../types/ReduxTypes.js'
import { logEvent } from '../../../util/analytics.js'
import { connect } from '../../services/ReduxStore.js'
import {
  type Theme,
  type ThemeProps,
  withTheme
} from '../../services/ThemeContext'
import { BackButton } from '../../themed/BackButton'
import { DigitInput, MAX_PIN_LENGTH } from '../../themed/DigitInput'
import { EdgeText } from '../../themed/EdgeText'
import { Fade } from '../../themed/Fade'
import { SimpleSceneHeader } from '../../themed/SimpleSceneHeader'
import { SecondaryButton } from '../../themed/ThemedButtons.js'
import { ThemedScene } from '../../themed/ThemedScene'

type OwnProps = {}

type StateProps = {
  createErrorMessage: string | null,
  password: string,
  pin: string,
  pinErrorMessage: string | null,
  username: string
}

type DispatchProps = {
  createUser(data: CreateUserData): void,
  clearCreateErrorMessagecircleFilled(): void,
  onBack(): void
}

type Props = OwnProps & StateProps & DispatchProps & ThemeProps

const NewAccountPinScreenComponent = ({
  username,
  password,
  pin,
  onBack,
  createUser,
  pinErrorMessage,
  createErrorMessage,
  clearCreateErrorMessagecircleFilled,
  theme
}: Props) => {
  const styles = getStyles(theme)

  if (createErrorMessage) {
    Alert.alert(
      s.strings.create_account_error_title,
      s.strings.create_account_error_message + '\n' + createErrorMessage,
      [{ text: s.strings.ok }]
    )
    clearCreateErrorMessagecircleFilled()
  }

  const handleNext = () => {
    // validation.
    // is there no error message,
    if (pin.length !== MAX_PIN_LENGTH || pinErrorMessage) {
      logEvent(`Signup_PIN_Invalid`)
      return
    }

    logEvent(`Signup_Create_User`)
    createUser({
      username,
      password,
      pin
    })
  }

  return (
    <ThemedScene paddingRem={[0.5, 0, 0.5, 0.5]}>
      <BackButton onPress={onBack} marginRem={[0, 0, 1, 0.5]} />
      <SimpleSceneHeader>{s.strings.create_your_account}</SimpleSceneHeader>
      <View style={styles.content}>
        <EdgeText
          style={styles.subtitle}
        >{`${s.strings.step_three}: ${s.strings.set_four_digit_pin}`}</EdgeText>
        <EdgeText style={styles.description} numberOfLines={2}>
          {s.strings.pin_desc}
        </EdgeText>
        <DigitInput />
        <View style={styles.actions}>
          <Fade
            visible={
              pin.length === MAX_PIN_LENGTH &&
              !pinErrorMessage &&
              !createErrorMessage
            }
          >
            <SecondaryButton
              label={s.strings.next_label}
              onPress={handleNext}
            />
          </Fade>
        </View>
      </View>
    </ThemedScene>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  content: {
    flex: 1,
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
    marginTop: theme.rem(5)
  }
}))

export const NewAccountPinScreen = connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    createErrorMessage: state.create.createErrorMessage,
    password: state.create.password || '',
    pin: state.create.pin,
    pinErrorMessage: state.create.pinErrorMessage,
    username: state.create.username || ''
  }),
  (dispatch: Dispatch) => ({
    createUser(data: CreateUserData) {
      dispatch(createUser(data))
    },
    onBack() {
      dispatch({ type: 'WORKFLOW_BACK' })
    },
    clearCreateErrorMessagecircleFilled() {
      dispatch({ type: 'CLEAR_CREATE_ERROR_MESSAGE' })
    }
  })
)(withTheme(NewAccountPinScreenComponent))
