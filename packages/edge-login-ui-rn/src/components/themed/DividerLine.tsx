import * as React from 'react'
import { View } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import { fixSides, mapSides, sidesToMargin } from '../../util/sides.js'
import { Theme, useTheme } from '../services/ThemeContext.js'

interface Props {
  // The gap around the line. Takes 0-4 numbers (top, right, bottom, left),
  // using the same logic as the web `margin` property. Defaults to 0.
  marginRem?: number | number[]
}

/**
 * A horizontal line for dividing sections of the app.
 *
 * This is designed to "stick out" to the right of the content area,
 * touching the edge of the screen. Just add the same horizontal
 * margin to this component as you would to its siblings,
 * such as buttons or text fields, and everything will line up.
 */
export const DividerLine = (props: Props) => {
  const { marginRem } = props
  const theme = useTheme()
  const styles = getStyles(theme)

  const margin = sidesToMargin(mapSides(fixSides(marginRem, 0), theme.rem))
  margin.marginRight -= theme.rem(1)

  return <View style={[styles.underline, margin]} />
}

const getStyles = cacheStyles((theme: Theme) => ({
  underline: {
    borderTopWidth: theme.thinLineWidth,
    borderTopColor: theme.lineDivider,
    alignSelf: 'stretch'
  }
}))
