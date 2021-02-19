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
  paddingRem?: number[] | number
}

export function PrimaryButton(props: Props) {
  const { children, label, marginRem, onPress, paddingRem, spinner } = props
  const theme = useTheme()
  const styles = getStyles(theme)

  const spacingStyles = {
    ...sidesToMargin(mapSides(fixSides(marginRem, 0), theme.rem)),
    ...sidesToPadding(mapSides(fixSides(paddingRem, 0.5), theme.rem))
  }
  return (
    <TouchableOpacity
      style={[styles.primaryButton, spacingStyles]}
      onPress={onPress}
    >
      {label != null ? <Text style={styles.primaryText}>{label}</Text> : null}
      {spinner != null ? (
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
  const { children, label, marginRem, onPress, paddingRem, spinner } = props
  const theme = useTheme()
  const styles = getStyles(theme)

  const spacingStyles = {
    ...sidesToMargin(mapSides(fixSides(marginRem, 0), theme.rem)),
    ...sidesToPadding(mapSides(fixSides(paddingRem, 0.5), theme.rem))
  }
  return (
    <TouchableOpacity
      style={[styles.secondaryButton, spacingStyles]}
      onPress={onPress}
    >
      {label != null ? <Text style={styles.secondaryText}>{label}</Text> : null}
      {spinner != null ? (
        <ActivityIndicator
          color={theme.secondaryButtonText}
          style={styles.spinner}
        />
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
    fontFamily: theme.fontFamily,
    fontSize: theme.rem(1),
    lineHeight: theme.rem(2),
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

    spinner: { height: theme.rem(2) }
  }
})
