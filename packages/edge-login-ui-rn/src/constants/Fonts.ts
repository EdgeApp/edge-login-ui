export let FONTS = {
  defaultButtonTextSize: 16,
  defaultFontSize: 12,
  fontFamilyRegular: 'System',
  fontFamilyBlack: 'System'
}

export function updateFontStyles(
  regularFontFamily: string,
  headingFontFamily: string
) {
  FONTS = {
    ...FONTS,
    fontFamilyBlack: headingFontFamily,
    fontFamilyRegular: regularFontFamily
  }
}
