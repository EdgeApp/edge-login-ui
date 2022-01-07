import { wrap } from 'cavy'
import * as React from 'react'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import {
  fixSides,
  mapSides,
  sidesToMargin,
  sidesToPadding
} from '../../util/sides'
import { Theme, useTheme } from '../services/ThemeContext'

export interface AlertModalButtonType {
  type: 'primary' | 'secondary'
}

interface Props {
  children?: React.ReactNode
  onPress?: () => void

  // If this is set, the component will insert a text node before the other children:
  label?: string

  // If this is set, show a spinner:
  spinner?: boolean

  // The gap around the button. Takes 0-4 numbers (top, right, bottom, left),
  // using the same logic as the web `margin` property. Defaults to 0.
  marginRem?: number[] | number

  // The gap inside the button. Takes 0-4 numbers (top, right, bottom, left),
  // using the same logic as the web `padding` property. Defaults to 0.5.
  paddingRem?: number[] | number
}

const AlertModalButtonComponent = (props: Props & AlertModalButtonType) => {
  const {
    children,
    label,
    marginRem,
    onPress,
    paddingRem,
    spinner,
    type
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
    <TouchableOpacity style={[buttonStyle, spacingStyles]} onPress={onPress}>
      {label != null ? <Text style={textStyle}>{label}</Text> : null}
      {spinner ? (
        <ActivityIndicator color={spinnerColor} style={styles.spinner} />
      ) : null}
      {children}
    </TouchableOpacity>
  )
}

const getStyles = cacheStyles((theme: Theme) => {
  const commonButton = {
    alignItems: 'center',
    borderRadius: theme.rem(0.25),
    borderWidth: theme.thinLineWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    minWidth: theme.rem(9)
  } as const
  const commonText = {
    fontFamily: theme.fontFaceDefault,
    fontSize: theme.rem(1),
    lineHeight: theme.rem(2),
    marginHorizontal: theme.rem(0.5)
  } as const

  return {
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

    spinner: { height: theme.rem(2) }
  }
})

export const AlertModalButton = wrap(AlertModalButtonComponent)
