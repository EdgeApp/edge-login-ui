// @flow

import * as React from 'react'
import { View } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import {
  type Theme,
  type ThemeProps,
  withTheme
} from '../services/ThemeContext'

type Props = {
  marginVertical?: number
}

/**
 * Renders a horizontal dividing line.
 */
const DividerComponent = ({
  marginVertical = 1.5,
  theme
}: Props & ThemeProps) => {
  const styles = getStyles(theme)

  return (
    <View
      style={[styles.divider, { marginVertical: theme.rem(marginVertical) }]}
    />
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  divider: {
    width: '100%',
    borderBottomWidth: theme.thinLineWidth,
    borderBottomColor: theme.lineDivider
  }
}))

export const Divider = withTheme(DividerComponent)
