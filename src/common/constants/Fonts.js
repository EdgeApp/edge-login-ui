import { Platform } from 'react-native'

const platform = Platform.OS
const IOS = 'ios'
const BUTTON_TEXT_SIZE = platform === IOS ? 16 : 12
const DEFAULT_FONT_TEXT_SIZE = 12
const FONT_REGULAR = 'SourceSansPro-Regular'
const FONT_BLACK = 'SourceSansPro-Black'

let FONTS = {
  defaultButtonTextSize: BUTTON_TEXT_SIZE,
  defaultFontSize: DEFAULT_FONT_TEXT_SIZE,
  fontFamilyRegular: FONT_REGULAR,
  fontFamilyBlack: FONT_BLACK
}

const updateFontStyles = (obj) => {
  if (!obj.fontDescription) {
    return
  }
  const {fontDescription} = obj
  const regular = fontDescription.regularFontFamily ? fontDescription.regularFontFamily : FONTS.fontFamilyRegular
  FONTS = {...FONTS,
    fontFamilyRegular: regular
  }
}

export {FONTS, updateFontStyles}
