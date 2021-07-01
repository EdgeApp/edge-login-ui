// @flow

import * as React from 'react'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import {
  fixSides,
  mapSides,
  sidesToMargin,
  sidesToPadding
} from '../../util/sides.js'
import { type Theme, useTheme } from '../services/ThemeContext.js'

export const BUTTON_TYPE = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary'
}

export type AlertModalButtonType = {
  type: typeof BUTTON_TYPE.PRIMARY | typeof BUTTON_TYPE.SECONDARY
}

type Props = {
  children?: React.Node,
  onPress?: () => void,

  // If this is set, the component will insert a text node before the other children:
  label?: string,

  // If this is set, show a spinner:
  spinner?: boolean,

  // The gap around the button. Takes 0-4 numbers (top, right, bottom, left),
  // using the same logic as the web `margin` property. Defaults to 0.
  marginRem?: number[] | number,

  // The gap inside the button. Takes 0-4 numbers (top, right, bottom, left),
  // using the same logic as the web `padding` property. Defaults to 0.5.
  paddingRem?: number[] | number,

  straight?: boolean,

  bold?: boolean
}

export function PrimaryButton(props: Props) {
  const {
    children,
    label,
    marginRem,
    onPress,
    paddingRem,
    spinner,
    straight,
    bold = false
  } = props
  const theme = useTheme()
  const styles = getStyles(theme)

  const spacingStyles = {
    ...sidesToMargin(mapSides(fixSides(marginRem, 0), theme.rem)),
    ...sidesToPadding(mapSides(fixSides(paddingRem, 0.5), theme.rem))
  }
  return (
    <TouchableOpacity
      style={[
        styles.primaryButton,
        spacingStyles,
        straight ? styles.straight : null
      ]}
      onPress={onPress}
    >
      {label != null ? (
        <Text style={[styles.primaryText, bold && styles.boldText]}>
          {label}
        </Text>
      ) : null}
      {spinner === true ? (
        <ActivityIndicator
          color={theme.primaryButtonText}
          style={styles.spinner}
        />
      ) : null}
      {children}
    </TouchableOpacity>
  )
}

export function SecondaryButton(props: Props) {
  const {
    children,
    label,
    marginRem,
    onPress,
    paddingRem = [0.7, 2.2],
    spinner,
    straight,
    bold = false
  } = props
  const theme = useTheme()
  const styles = getStyles(theme)

  const spacingStyles = {
    ...sidesToMargin(mapSides(fixSides(marginRem, 0), theme.rem)),
    ...sidesToPadding(mapSides(fixSides(paddingRem, 0), theme.rem))
  }
  return (
    <TouchableOpacity
      style={[
        styles.secondaryButton,
        spacingStyles,
        straight ? styles.straight : null
      ]}
      onPress={onPress}
    >
      {label != null ? (
        <Text style={[styles.secondaryText, bold && styles.boldText]}>
          {label}
        </Text>
      ) : null}
      {spinner === true ? (
        <ActivityIndicator
          color={theme.secondaryButtonText}
          style={styles.spinner}
        />
      ) : null}
      {children}
    </TouchableOpacity>
  )
}

export function AlertModalButton(props: Props & AlertModalButtonType) {
  const {
    children,
    label,
    marginRem,
    onPress,
    paddingRem,
    spinner,
    type,
    straight,
    bold = false
  } = props
  const theme = useTheme()
  const styles = getStyles(theme)
  const buttonStyle =
    type === 'secondary'
      ? styles.alertModalSecondaryButton
      : styles.alertModalPrimaryButton
  const textStyle =
    type === 'secondary'
      ? styles.alertModalSecondaryText
      : styles.alertModalPrimaryText
  const spinnerColor =
    type === 'secondary'
      ? theme.alertModalTertiaryButtonText
      : theme.alertModalPrimaryButtonText

  const spacingStyles = {
    ...sidesToMargin(mapSides(fixSides(marginRem, 0), theme.rem)),
    ...sidesToPadding(mapSides(fixSides(paddingRem, 0.5), theme.rem))
  }
  return (
    <TouchableOpacity
      style={[buttonStyle, spacingStyles, straight ? styles.straight : null]}
      onPress={onPress}
    >
      {label != null ? (
        <Text style={[textStyle, bold && styles.boldText]}>{label}</Text>
      ) : null}
      {spinner === true ? (
        <ActivityIndicator color={spinnerColor} style={styles.spinner} />
      ) : null}
      {children}
    </TouchableOpacity>
  )
}

const getStyles = cacheStyles((theme: Theme) => {
  const commonButton = {
    alignItems: 'center',
    borderRadius: theme.rem(1.5),
    borderWidth: theme.rem(0.1),
    flexDirection: 'row',
    justifyContent: 'center'
  }
  const commonText = {
    fontFamily: theme.fontFaceDefault,
    fontSize: theme.rem(0.9),
    lineHeight: theme.rem(1),
    marginHorizontal: theme.rem(0.5)
  }

  return {
    primaryButton: {
      ...commonButton,
      backgroundColor: theme.primaryButton,
      borderColor: theme.primaryButtonOutline
    },
    primaryText: {
      ...commonText,
      color: theme.primaryButtonText
    },

    secondaryButton: {
      ...commonButton,
      backgroundColor: theme.secondaryButton,
      borderColor: theme.secondaryButtonOutline
    },
    secondaryText: {
      ...commonText,
      color: theme.secondaryButtonText
    },

    alertModalPrimaryButton: {
      ...commonButton,
      backgroundColor: theme.alertModalPrimaryButton,
      borderColor: theme.alertModalPrimaryButtonOutline
    },
    alertModalPrimaryText: {
      ...commonText,
      color: theme.alertModalPrimaryButtonText
    },

    alertModalSecondaryButton: {
      ...commonButton,
      backgroundColor: theme.alertModalTertiaryButton,
      borderColor: theme.alertModalTertiaryButtonOutline
    },
    alertModalSecondaryText: {
      ...commonText,
      color: theme.alertModalTertiaryButtonText
    },

    spinner: { height: theme.rem(2) },
    straight: {
      borderRadius: theme.rem(0.25)
    },
    boldText: {
      fontFamily: theme.fontFaceBold
    }
  }
})
