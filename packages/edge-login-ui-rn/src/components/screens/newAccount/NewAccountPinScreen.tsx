import { EdgeAccount } from 'edge-core-js'
import * as React from 'react'
import { Keyboard, ScrollView, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import { completeResecure } from '../../../actions/LoginCompleteActions'
import { onComplete } from '../../../actions/WorkflowActions'
import s from '../../../common/locales/strings'
import { useScrollToEnd } from '../../../hooks/useScrollToEnd'
import { Dispatch, RootState } from '../../../types/ReduxTypes'
import { logEvent } from '../../../util/analytics'
import { getAccount } from '../../../util/selectors'
import { ButtonsModal } from '../../modals/ButtonsModal'
import { Airship, showError } from '../../services/AirshipInstance'
import { connect } from '../../services/ReduxStore'
import { Theme, ThemeProps, withTheme } from '../../services/ThemeContext'
import { BackButton } from '../../themed/BackButton'
import { DigitInput, MAX_PIN_LENGTH } from '../../themed/DigitInput'
import { EdgeText } from '../../themed/EdgeText'
import { Fade } from '../../themed/Fade'
import { SimpleSceneHeader } from '../../themed/SimpleSceneHeader'
import { SkipButton } from '../../themed/SkipButton'
import { SecondaryButton } from '../../themed/ThemedButtons'
import { ThemedScene } from '../../themed/ThemedScene'

interface OwnProps {
  showHeader?: boolean
}

interface StateProps {
  account?: EdgeAccount
  pin: string
  pinErrorMessage: string | null
}

interface DispatchProps {
  onDone: () => void
  onBack?: () => void
  onSkip?: () => void
}

type Props = OwnProps & StateProps & DispatchProps & ThemeProps

const NewAccountPinScreenComponent = ({
  showHeader,
  account,
  pinErrorMessage,
  pin,
  onBack,
  onSkip,
  onDone,
  theme
}: Props) => {
  const [loading, setLoading] = React.useState<boolean>(false)

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

    if (account != null) {
      Keyboard.dismiss()
      setLoading(true)
      account
        .changePin({ pin })
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
            ? s.strings.change_pin
            : s.strings.create_your_account}
        </SimpleSceneHeader>
      )}
      <ScrollView ref={scrollViewRef} style={styles.content}>
        {account == null && (
          <EdgeText
            style={styles.subtitle}
          >{`${s.strings.step_three}: ${s.strings.set_four_digit_pin}`}</EdgeText>
        )}
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

export const NewAccountPinScreen = connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    pin: state.create.pin,
    pinErrorMessage: state.create.pinErrorMessage
  }),
  (dispatch: Dispatch) => ({
    onDone() {
      dispatch({ type: 'WORKFLOW_NEXT' })
    },
    onBack() {
      dispatch({ type: 'WORKFLOW_BACK' })
    }
  })
)(withTheme(NewAccountPinScreenComponent))

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
)(withTheme(NewAccountPinScreenComponent))

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
)(withTheme(NewAccountPinScreenComponent))
