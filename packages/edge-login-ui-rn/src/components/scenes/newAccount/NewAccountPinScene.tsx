import * as React from 'react'
import { ScrollView, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import s from '../../../common/locales/strings'
import { createAccountPaddings } from '../../../constants/themedScenePaddings'
import { useScrollToEnd } from '../../../hooks/useScrollToEnd'
import { Dispatch, RootState } from '../../../types/ReduxTypes'
import { logEvent } from '../../../util/analytics'
import { connect } from '../../services/ReduxStore'
import { Theme, ThemeProps, withTheme } from '../../services/ThemeContext'
import { DigitInput, MAX_PIN_LENGTH } from '../../themed/DigitInput'
import { EdgeText } from '../../themed/EdgeText'
import { Fade } from '../../themed/Fade'
import { SecondaryButton } from '../../themed/ThemedButtons'
import { ThemedScene } from '../../themed/ThemedScene2'

interface OwnProps {}

interface StateProps {
  pin: string
  pinErrorMessage: string | null
}

interface DispatchProps {
  onDone: () => void
  onBack: () => void
}

type Props = OwnProps & StateProps & DispatchProps & ThemeProps

const NewAccountPinSceneComponent = ({
  pinErrorMessage,
  pin,
  onBack,
  onDone,
  theme
}: Props) => {
  const styles = getStyles(theme)
  const { paddingRem, innerPaddingRem } = createAccountPaddings

  const showNext = pin.length === MAX_PIN_LENGTH && !pinErrorMessage
  const scrollViewRef = useScrollToEnd(showNext)

  const handleNext = () => {
    // validation.
    // is there no error message,
    if (pin.length !== MAX_PIN_LENGTH || pinErrorMessage) {
      logEvent(`Signup_PIN_Invalid`)
      return
    }

    onDone()
  }

  return (
    <ThemedScene
      topLeft={{ type: 'back', onClick: onBack }}
      titleText={s.strings.set_four_digit_pin}
      paddingRem={paddingRem}
      innerPaddingRem={innerPaddingRem}
      showHeader
    >
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
            />
          </Fade>
        </View>
      </ScrollView>
    </ThemedScene>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  content: {
    flex: 1
  },
  description: {
    marginBottom: theme.rem(4.5)
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.rem(5.25),
    minHeight: theme.rem(3 + 15) // 15 is a hack to avoid the keyboard
  }
}))

export const NewAccountPinScene = connect<StateProps, DispatchProps, OwnProps>(
  (state: RootState) => ({
    pin: state.create.pin,
    pinErrorMessage: state.create.pinErrorMessage
  }),
  (dispatch: Dispatch) => ({
    onDone() {
      dispatch({ type: 'NEW_ACCOUNT_TOS' })
    },
    onBack() {
      dispatch({ type: 'NEW_ACCOUNT_PASSWORD' })
    }
  })
)(withTheme(NewAccountPinSceneComponent))
