import * as React from 'react'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { cacheStyles } from 'react-native-patina'

import { usePendingPress } from '../../hooks/usePendingPress'
import { textNoShadow, themeNoShadow } from '../../types/Theme'
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

  // Whether to center the button or stretch to fill the screen.
  // Defaults to 'auto', letting the parent component be in charge:
  alignSelf?: 'auto' | 'stretch' | 'center'

  // True to dim the button & prevent interactions:
  disabled?: boolean

  // If this is set, the component will insert a text node before the other children:
  label?: string

  // The gap around the button. Takes 0-4 numbers (top, right, bottom, left),
  // using the same logic as the web `margin` property. Defaults to 0.
  marginRem?: number[] | number

  // The gap inside the button. Takes 0-4 numbers (top, right, bottom, left),
  // using the same logic as the web `padding` property. Defaults to 0.5.
  paddingRem?: number[] | number

  // True to show a spinner after the contents:
  spinner?: boolean

  // Which visual style to use. Defaults to primary (solid):
  type?: 'primary' | 'secondary' | 'escape' | 'textOnly'

  testID?: string
}

const primaryTextColorArray = ['transparent', 'transparent']
const primaryTextStart = { x: 0, y: 0 }
const primaryTextEnd = { x: 0, y: 1 }

/**
 * A stand-alone button to perform the primary action in a modal or scene.
 */
export function MainButton(props: Props) {
  const {
    alignSelf = 'auto',
    children,
    disabled = false,
    label,
    marginRem,
    onPress,
    type = 'primary',
    paddingRem,
    spinner = false,
    testID
  } = props

  // `onPress` promise logic:
  const [pending, handlePress] = usePendingPress(onPress)

  // Styles:
  const theme = useTheme()
  const styles = getStyles(theme)

  let touchableStyle, textStyle, spinnerColor, colors, start, end, buttonShadow
  if (type === 'primary') {
    touchableStyle = styles.primaryButton
    textStyle = styles.primaryText
    spinnerColor = theme.primaryButtonText
    colors = theme.primaryButton
    start = theme.primaryButtonColorStart
    end = theme.primaryButtonColorEnd
    buttonShadow = styles.primaryButtonShadow
  } else if (type === 'secondary') {
    touchableStyle = styles.secondaryButton
    textStyle = styles.secondaryText
    spinnerColor = theme.secondaryButtonText
    colors = theme.secondaryButton
    start = theme.secondaryButtonColorStart
    end = theme.secondaryButtonColorEnd
    buttonShadow = styles.secondaryButtonShadow
  } else if (type === 'textOnly') {
    touchableStyle = styles.textOnlyButton
    textStyle = styles.textOnlyText
    spinnerColor = theme.primaryText
    colors = primaryTextColorArray
    start = primaryTextStart
    end = primaryTextEnd
    buttonShadow = styles.textOnlyButtonShadow
  } else {
    touchableStyle = styles.escapeButton
    textStyle = styles.escapeText
    spinnerColor = theme.escapeButtonText
    colors = theme.escapeButton
    start = theme.escapeButtonColorStart
    end = theme.escapeButtonColorEnd
    buttonShadow = styles.escapeButtonShadow
  }
  const dynamicStyles = {
    alignSelf,
    opacity: disabled || pending ? 0.7 : 1,
    ...sidesToMargin(mapSides(fixSides(marginRem, 0), theme.rem)),
    ...sidesToPadding(mapSides(fixSides(paddingRem, 0), theme.rem))
  }

  return (
    <TouchableOpacity
      disabled={disabled || pending}
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
        {spinner || pending ? (
          <ActivityIndicator color={spinnerColor} style={styles.spinner} />
        ) : null}
      </LinearGradient>
    </TouchableOpacity>
  )
}

const getStyles = cacheStyles((theme: Theme) => {
  const commonButton = {
    alignItems: 'center',
    borderRadius: theme.rem(theme.buttonBorderRadiusRem),
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: theme.rem(3),
    minWidth: theme.rem(7)
  } as const
  const commonText = {
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
      borderRadius: theme.rem(theme.buttonBorderRadiusRem)
    },

    primaryButton: {
      ...commonButton,
      borderColor: theme.primaryButtonOutline,
      borderWidth: theme.primaryButtonOutlineWidth
    },

    primaryButtonShadow: { ...theme.primaryButtonShadow },

    primaryText: {
      ...commonText,
      ...theme.primaryButtonTextShadow,
      fontFamily: theme.primaryButtonFont,
      fontSize: theme.rem(theme.primaryButtonFontSizeRem),
      color: theme.primaryButtonText
    },

    secondaryButton: {
      ...commonButton,
      borderColor: theme.secondaryButtonOutline,
      borderWidth: theme.secondaryButtonOutlineWidth
    },
    secondaryButtonShadow: { ...theme.secondaryButtonShadow },

    secondaryText: {
      ...commonText,
      ...theme.secondaryButtonTextShadow,
      fontFamily: theme.secondaryButtonFont,
      fontSize: theme.rem(theme.secondaryButtonFontSizeRem),
      color: theme.secondaryButtonText
    },

    escapeButton: {
      ...commonButton,
      borderColor: theme.escapeButtonOutline,
      borderWidth: theme.escapeButtonOutlineWidth
    },
    escapeButtonShadow: { ...theme.escapeButtonShadow },

    escapeText: {
      ...commonText,
      ...theme.escapeButtonTextShadow,
      fontFamily: theme.escapeButtonFont,
      fontSize: theme.rem(theme.escapeButtonFontSizeRem),
      color: theme.escapeButtonText
    },

    textOnlyButton: {
      ...commonButton,
      borderColor: 'transparent',
      borderWidth: 0
    },
    textOnlyButtonShadow: { ...themeNoShadow },

    textOnlyText: {
      ...commonText,
      ...textNoShadow,
      fontFamily: theme.fontFaceDefault,
      fontSize: theme.rem(1),
      color: theme.primaryText
    },

    // Common styles:
    spinner: {
      height: theme.rem(1.875),
      marginHorizontal: theme.rem(0.5)
    }
  }
})
