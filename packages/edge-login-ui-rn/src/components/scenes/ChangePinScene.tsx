import * as React from 'react'
import { Keyboard, ScrollView, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'
import { useDispatch, useSelector } from 'react-redux'

import { completeResecure } from '../../actions/LoginCompleteActions'
import { onComplete } from '../../actions/WorkflowActions'
import s from '../../common/locales/strings'
import { useScrollToEnd } from '../../hooks/useScrollToEnd'
import { RootState } from '../../types/ReduxTypes'
import { logEvent } from '../../util/analytics'
import { ButtonsModal } from '../modals/ButtonsModal'
import { Airship, showError } from '../services/AirshipInstance'
import { Theme, useTheme } from '../services/ThemeContext'
import { DigitInput, MAX_PIN_LENGTH } from '../themed/DigitInput'
import { EdgeText } from '../themed/EdgeText'
import { Fade } from '../themed/Fade'
import { MainButton } from '../themed/MainButton'
import { ThemedScene } from '../themed/ThemedScene'

interface Props {
  title: string | undefined
  onBack: (() => void) | undefined
  onNext: () => void
  mainButtonLabel: string
  mainButtonType: 'primary' | 'secondary'
  noUnderline: boolean
}
const ChangePinSceneComponent = ({
  title,
  onBack,
  onNext,
  mainButtonLabel,
  mainButtonType,
  noUnderline
}: Props) => {
  const theme = useTheme()
  const styles = getStyles(theme)

  const pin = useSelector((state: RootState) => state.create.pin)
  const pinError = useSelector((state: RootState) => state.create.pinError)
  const pinErrorMessage = useSelector(
    (state: RootState) => state.create.pinErrorMessage
  )

  const showNext =
    pin.length === MAX_PIN_LENGTH && !pinErrorMessage && !pinError
  const scrollViewRef = useScrollToEnd(showNext)

  return (
    <ThemedScene onBack={onBack} title={title} noUnderline={noUnderline}>
      <ScrollView ref={scrollViewRef} style={styles.content}>
        <EdgeText style={styles.description} numberOfLines={2}>
          {s.strings.pin_desc}
        </EdgeText>
        <DigitInput />
        <View style={styles.actions}>
          <Fade visible={showNext}>
            <MainButton
              label={mainButtonLabel}
              type={mainButtonType}
              onPress={onNext}
            />
          </Fade>
        </View>
      </ScrollView>
    </ThemedScene>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  content: {
    flex: 1,
    marginHorizontal: theme.rem(0.5),
    marginTop: theme.rem(1.5)
  },
  description: {
    fontFamily: theme.fontFaceDefault,
    fontSize: theme.rem(0.875),
    marginBottom: theme.rem(3.25)
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.rem(5),
    minHeight: theme.rem(3 + 15) // 15 is a hack to avoid the keyboard
  }
}))

// The scene for existing users to change their PIN
export const ChangePinScene = () => {
  const dispatch = useDispatch()

  const account = useSelector((state: RootState) => state.account ?? undefined)
  const pin = useSelector((state: RootState) => state.create.pin)
  const pinError = useSelector((state: RootState) => state.create.pinError)

  const handleDone = () => {
    Airship.show(bridge => (
      <ButtonsModal
        bridge={bridge}
        title={s.strings.pin_changed}
        message={s.strings.pin_successfully_changed}
        buttons={{ ok: { label: s.strings.ok } }}
      />
    ))
      .then(() => dispatch(onComplete()))
      .catch(showError)
  }

  const handleNext = () => {
    if (pin.length !== 4 || pinError) return

    Keyboard.dismiss()
    if (account) {
      return account
        .changePin({ pin })
        .then(handleDone)
        .catch(error => {
          showError(error)
        })
    }
  }
  return (
    <ChangePinSceneComponent
      title={undefined}
      onBack={undefined}
      onNext={handleNext}
      mainButtonLabel={s.strings.done}
      mainButtonType="primary"
      noUnderline
    />
  )
}

// The scene for new users to set their PIN
export const NewAccountPinScene = () => {
  const dispatch = useDispatch()

  const pin = useSelector((state: RootState) => state.create.pin)
  const pinErrorMessage = useSelector(
    (state: RootState) => state.create.pinErrorMessage
  )

  const handleDone = () => {
    dispatch({ type: 'NEW_ACCOUNT_TOS' })
  }

  const handleBack = () => {
    dispatch({ type: 'NEW_ACCOUNT_PASSWORD' })
  }
  const handleNext = () => {
    // validation.
    // is there no error message,
    if (pin.length !== MAX_PIN_LENGTH || pinErrorMessage) {
      logEvent(`Signup_PIN_Invalid`)
      return
    }
    handleDone()
  }
  return (
    <ChangePinSceneComponent
      title={s.strings.choose_title_pin}
      onBack={handleBack}
      onNext={handleNext}
      mainButtonLabel={s.strings.next_label}
      mainButtonType="secondary"
      noUnderline={false}
    />
  )
}

// The scene for new users to recover their PIN
export const ResecurePinScene = () => {
  const dispatch = useDispatch()

  const account = useSelector((state: RootState) => state.account ?? undefined)
  const pin = useSelector((state: RootState) => state.create.pin)
  const pinError = useSelector((state: RootState) => state.create.pinError)

  const handleDone = () => {
    Airship.show(bridge => (
      <ButtonsModal
        bridge={bridge}
        title={s.strings.pin_changed}
        message={s.strings.pin_successfully_changed}
        buttons={{ ok: { label: s.strings.ok } }}
      />
    ))
      .then(() => dispatch(completeResecure()))
      .catch(showError)
  }

  const handleNext = () => {
    if (pin.length !== 4 || pinError) return

    Keyboard.dismiss()
    if (account) {
      return account
        .changePin({ pin })
        .then(handleDone)
        .catch(error => {
          showError(error)
        })
    }
  }
  return (
    <ChangePinSceneComponent
      title={undefined}
      onBack={undefined}
      onNext={handleNext}
      mainButtonLabel={s.strings.done}
      mainButtonType="primary"
      noUnderline
    />
  )
}
