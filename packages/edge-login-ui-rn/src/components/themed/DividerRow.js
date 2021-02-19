// @flow

import * as React from 'react'
import { Text, View } from 'react-native'
import { cacheStyles } from 'react-native-patina'

import s from '../../common/locales/strings.js'
import {
  type Theme,
  type ThemeProps,
  withTheme
} from '../services/ThemeContext'

type Props = {
  message?: string
}

/**
 * Renders a horizontal line with text in the middle.
 */
function DividerRowComponent(props: Props & ThemeProps) {
  const { message = s.strings.or, theme } = props
  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{message}</Text>
      <View style={styles.line} />
    </View>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.rem(0.5)
  },
  line: {
    height: 1,
    borderColor: theme.secondaryText,
    borderBottomWidth: 1,
    flex: 1
  },
  text: {
    fontFamily: theme.fontFamily,
    fontSize: theme.rem(1),
    color: theme.secondaryText,
    marginHorizontal: theme.rem(0.5),
    paddingBottom: 4 // padding to center the text
  }
}))

export const DividerRow = withTheme(DividerRowComponent)
