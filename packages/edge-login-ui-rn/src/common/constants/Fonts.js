// @flow

import { Platform } from 'react-native'

const platform = Platform.OS
const IOS = 'ios'
const BUTTON_TEXT_SIZE = platform === IOS ? 16 : 16
const DEFAULT_FONT_TEXT_SIZE = 12
const SYSTEM = 'System'

let FONTS = {
  defaultButtonTextSize: BUTTON_TEXT_SIZE,
  defaultFontSize: DEFAULT_FONT_TEXT_SIZE,
  fontFamilyRegular: SYSTEM,
  fontFamilyBlack: SYSTEM
}

const updateFontStyles = (obj: Object) => {
  if (!obj.fontDescription) {
    return
  }
  const { fontDescription } = obj
  const regular = fontDescription.regularFontFamily
    ? fontDescription.regularFontFamily
    : FONTS.fontFamilyRegular
  FONTS = {
    ...FONTS,
    fontFamilyRegular: regular
  }
}

export { FONTS, updateFontStyles }
