import * as React from 'react'
import { Text, TouchableWithoutFeedback } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { cacheStyles } from 'react-native-patina'

import { usePendingPress } from '../../hooks/usePendingPress'
import {
  fixSides,
  mapSides,
  sidesToMargin,
  sidesToPadding
} from '../../util/sides'
import { Theme, useTheme } from '../services/ThemeContext'

interface Props {
  children?: React.ReactNode

  // Called when the user presses the button.
  // If the callback returns a promise, the button will disable itself
  // and show a spinner until the promise resolves.
  onPress?: () => void | Promise<void>

  // If this is set, the component will insert a text node before the other children:
  label?: string

  testID?: string
}

/**
 * A stand-alone button to perform the primary action in a modal or scene.
 */
export function PinButton(props: Props) {
  const { children, label, onPress, testID } = props

  // `onPress` promise logic:
  const [pending, handlePress] = usePendingPress(onPress)

  // Styles:
  const theme = useTheme()
  const styles = getStyles(theme)

  const touchableStyle = styles.keypadButton
  const textStyle = styles.keypadText
  const colors = theme.keypadButton
  const start = theme.keypadButtonColorStart
  const end = theme.keypadButtonColorEnd
  const buttonShadow = styles.keypadButtonShadow
  const alignSelf: 'auto' | 'stretch' | 'center' = 'auto'

  const dynamicStyles = {
    alignSelf,
    opacity: 1,
    ...sidesToMargin(mapSides(fixSides(0, 0), theme.rem)),
    ...sidesToPadding(mapSides(fixSides(0, 0), theme.rem))
  }

  return (
    <TouchableWithoutFeedback
      style={buttonShadow}
      testID={testID}
      onPress={handlePress}
    >
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        style={[touchableStyle, dynamicStyles, styles.linearGradient]}
      >
        {label != null && !pending ? (
          <Text
            adjustsFontSizeToFit
            minimumFontScale={0.75}
            numberOfLines={1}
            style={textStyle}
          >
            {label}
          </Text>
        ) : null}
        {!pending ? children : null}
      </LinearGradient>
    </TouchableWithoutFeedback>
  )
}

const getStyles = cacheStyles((theme: Theme) => {
  const commonButton = {
    alignItems: 'center',
    borderRadius: theme.rem(theme.keypadButtonBorderRadiusRem),
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    minHeight: theme.rem(3)
  } as const
  const commonText = {
    fontFamily: theme.keypadButtonFont,
    // fontSize: theme.rem(2),
    fontSize: theme.rem(theme.keypadButtonFontSizeRem),
    marginHorizontal: theme.rem(0),
    paddingTop: theme.rem(0.5),
    paddingBottom: theme.rem(0.5),
    paddingLeft: theme.rem(0.75),
    paddingRight: theme.rem(0.75)
  }

  return {
    linearGradient: {
      // flex: 1,
      paddingLeft: 0,
      paddingRight: 0,
      borderRadius: theme.rem(theme.keypadButtonBorderRadiusRem)
    },
    keypadButton: {
      ...commonButton,
      borderColor: theme.keypadButtonOutline,
      borderWidth: theme.keypadButtonOutlineWidth
    },
    keypadButtonShadow: { ...theme.keypadButtonShadow },

    keypadText: {
      ...commonText,
      ...theme.keypadButtonTextShadow,
      color: theme.keypadButtonText
    }
  }
})
