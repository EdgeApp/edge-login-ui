// @flow

import { type EdgeAccount } from 'edge-core-js'
import * as React from 'react'
import { Keyboard, ScrollView, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import { completeResecure } from '../../../actions/LoginCompleteActions.js'
import { onComplete } from '../../../actions/WorkflowActions.js'
import s from '../../../common/locales/strings.js'
import { useScrollToEnd } from '../../../hooks/useScrollToEnd.js'
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
import { DigitInput, MAX_PIN_LENGTH } from '../../themed/DigitInput'
import { EdgeText } from '../../themed/EdgeText'
import { Fade } from '../../themed/Fade'
import { SimpleSceneHeader } from '../../themed/SimpleSceneHeader'
import { SkipButton } from '../../themed/SkipButton'
import { SecondaryButton } from '../../themed/ThemedButtons.js'
import { ThemedScene } from '../../themed/ThemedScene'

type OwnProps = {
  showHeader?: boolean
}

type StateProps = {
  account: EdgeAccount,
  pin: string,
  pinErrorMessage: string | null
}

type DispatchProps = {
  onBack?: () => void,
  onSkip?: () => void,
  onDone(): void
}

type Props = OwnProps & StateProps & DispatchProps & ThemeProps

const ChangePinScreenComponent = ({
  account,
  pinErrorMessage,
  pin,
  onBack,
  onSkip,
  onDone,
  showHeader,
  theme
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false)

  const styles = getStyles(theme)

  const showNext = pin.length === MAX_PIN_LENGTH && !pinErrorMessage
  const scrollViewRef = useScrollToEnd(showNext)

  const handleNext = () => {
    // validation.
    // is there no error message,
    if (pin.length !== MAX_PIN_LENGTH || pinErrorMessage) {
      logEvent(`Signup_PIN_Invalid`)
      return
    }

    Keyboard.dismiss()
    setLoading(true)
    account
      .changePin({ pin })
      .then(onDone)
      .catch(error => {
        setLoading(false)
        showError(error)
      })
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
        <SimpleSceneHeader>{s.strings.change_pin}</SimpleSceneHeader>
      )}
      <ScrollView ref={scrollViewRef} style={styles.content}>
        <EdgeText style={styles.description} numberOfLines={2}>
          {s.strings.pin_desc}
        </EdgeText>
        <DigitInput />
        <View style={styles.actions}>
          <Fade visible={showNext}>
            <SecondaryButton
              label={s.strings.next_label}
              onPress={handleNext}
              spinner={loading}
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
    marginTop: theme.rem(5),
    minHeight: theme.rem(3 + 15) // 15 is a hack to avoid the keyboard
  }
}))

export const PublicChangePinScreen = connect<
  StateProps,
  DispatchProps,
  OwnProps
>(
  (state: RootState) => ({
    account: getAccount(state),
    pin: state.create.pin,
    pinErrorMessage: state.create.pinError
  }),
  (dispatch: Dispatch) => ({
    onDone() {
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
    },
    onBack() {
      dispatch(onComplete())
    }
  })
)(withTheme(ChangePinScreenComponent))

export const ResecurePinScreen = connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    account: getAccount(state),
    pin: state.create.pin,
    pinErrorMessage: state.create.pinError
  }),
  (dispatch: Dispatch) => ({
    onDone() {
      Airship.show(bridge => (
        <ButtonsModal
          bridge={bridge}
          title={s.strings.pswd_and_pin_changed}
          message={s.strings.change_pwd_body}
          buttons={{ ok: { label: s.strings.ok } }}
        />
      ))
        .then(() => dispatch(completeResecure()))
        .catch(showError)
    },
    onSkip() {
      dispatch(completeResecure())
    }
  })
)(withTheme(ChangePinScreenComponent))
