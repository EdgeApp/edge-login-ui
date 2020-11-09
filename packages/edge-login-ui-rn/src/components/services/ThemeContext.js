// @flow

import { makeThemeContext } from 'react-native-patina'

import { edgeDark } from '../../constants/themes/edgeDark.js'
import { type Theme } from '../../types/Theme.js'

export type { Theme }

/**
 * Utility type for declaring `withTheme` components.
 */
export type ThemeProps = {|
  theme: Theme
|}

// Provide the theme context methods:
export const {
  ThemeProvider,
  useTheme,
  withTheme,
  changeTheme,
  getTheme,
  watchTheme
} = makeThemeContext(edgeDark)

/**
 * Changes just the font.
 */
export function changeFont(fontFamily: string = edgeDark.fontFamily) {
  if (fontFamily !== lastFont) {
    lastFont = fontFamily
    changeTheme({ ...getTheme(), fontFamily })
  }
}

let lastFont = edgeDark.fontFamily
