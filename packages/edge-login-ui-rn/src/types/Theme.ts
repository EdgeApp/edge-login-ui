import {
  asArray,
  asBoolean,
  asNumber,
  asObject,
  asOptional,
  asString,
  asValue,
  Cleaner
} from 'cleaners'

const asFunction: Cleaner<() => any> = raw => {
  if (typeof raw === 'function') return raw
  throw new TypeError()
}

const asThemeShadowParams = asObject({
  shadowColor: asString,
  shadowOffset: asObject({
    width: asNumber,
    height: asNumber
  }),
  shadowOpacity: asNumber,
  shadowRadius: asNumber,
  elevation: asNumber
})
type ThemeShadowParams = ReturnType<typeof asThemeShadowParams>

const asTextShadowParams = asObject({
  textShadowColor: asString,
  textShadowOffset: asObject({
    width: asNumber,
    height: asNumber
  }),
  textShadowRadius: asNumber
})
type TextShadowParams = ReturnType<typeof asTextShadowParams>

const asGradientCoords = asObject({
  x: asNumber,
  y: asNumber
})
type GradientCoords = ReturnType<typeof asGradientCoords>

export const themeNoShadow: ThemeShadowParams = {
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 0
  },
  shadowOpacity: 0,
  shadowRadius: 0,
  elevation: 0
}

export const textNoShadow: TextShadowParams = {
  textShadowColor: '#000000',
  textShadowOffset: {
    width: 0,
    height: 0
  },
  textShadowRadius: 0
}

export const asOptionalTheme = asObject<Partial<Theme>>({
  // The app scaling factor, which is the height of "normal" text:
  rem: asOptional(asFunction),

  preferPrimaryButton: asOptional(asBoolean),
  fontFamily: asOptional(asString),
  fontWeightBold: asOptional(
    asValue(
      'normal',
      'bold',
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900'
    )
  ),

  // Icons
  icon: asOptional(asString),
  iconDeactivated: asOptional(asString),
  iconTappable: asOptional(asString),

  // Background colors:
  backgroundGradientColors: asOptional(asArray(asString)),

  // Modal:
  modal: asOptional(asString),
  modalBlurType: asOptional(asValue('light', 'dark')),
  modalBorderColor: asOptional(asString),
  modalBorderWidth: asOptional(asNumber),
  modalBorderRadiusRem: asOptional(asNumber),

  // Text colors:
  primaryText: asOptional(asString),
  secondaryText: asOptional(asString),
  dangerText: asOptional(asString),
  warningText: asOptional(asString),
  linkText: asOptional(asString),
  positiveText: asOptional(asString),

  // Tile:
  tileBackground: asOptional(asString),

  // Buttons
  buttonBorderRadiusRem: asOptional(asNumber),

  keypadButtonOutline: asOptional(asString),
  keypadButtonOutlineWidth: asOptional(asNumber),
  keypadButton: asOptional(asArray(asString)),
  keypadButtonColorStart: asOptional(asGradientCoords),
  keypadButtonColorEnd: asOptional(asGradientCoords),
  keypadButtonText: asOptional(asString),
  keypadButtonTextShadow: asOptional(asTextShadowParams),
  keypadButtonShadow: asOptional(asThemeShadowParams),
  keypadButtonBorderRadiusRem: asOptional(asNumber),
  keypadButtonFontSizeRem: asOptional(asNumber),
  keypadButtonFont: asOptional(asString),

  primaryButtonOutline: asOptional(asString),
  primaryButtonOutlineWidth: asOptional(asNumber),
  primaryButton: asOptional(asArray(asString)),
  primaryButtonColorStart: asOptional(asGradientCoords),
  primaryButtonColorEnd: asOptional(asGradientCoords),
  primaryButtonText: asOptional(asString),
  primaryButtonTextShadow: asOptional(asTextShadowParams),
  primaryButtonShadow: asOptional(asThemeShadowParams),

  secondaryButtonOutline: asOptional(asString),
  secondaryButtonOutlineWidth: asOptional(asNumber),
  secondaryButton: asOptional(asArray(asString)),
  secondaryButtonColorStart: asOptional(asGradientCoords),
  secondaryButtonColorEnd: asOptional(asGradientCoords),
  secondaryButtonText: asOptional(asString),
  secondaryButtonTextShadow: asOptional(asTextShadowParams),
  secondaryButtonShadow: asOptional(asThemeShadowParams),

  escapeButtonOutline: asOptional(asString),
  escapeButtonOutlineWidth: asOptional(asNumber),
  escapeButton: asOptional(asArray(asString)),
  escapeButtonColorStart: asOptional(asGradientCoords),
  escapeButtonColorEnd: asOptional(asGradientCoords),
  escapeButtonText: asOptional(asString),
  escapeButtonTextShadow: asOptional(asTextShadowParams),
  escapeButtonShadow: asOptional(asThemeShadowParams),

  // Outline Text Input
  outlineTextInputColor: asOptional(asString),
  outlineTextInputTextColor: asOptional(asString),
  outlineTextInputBorderWidth: asOptional(asNumber),

  // Dropdown colors:
  dropdownWarning: asOptional(asString),
  dropdownError: asOptional(asString),
  dropdownText: asOptional(asString),

  // Lines
  lineDivider: asOptional(asString),
  thinLineWidth: asOptional(asNumber),
  mediumLineWidth: asOptional(asNumber),

  // Font
  fontFaceDefault: asOptional(asString),
  fontFaceBold: asOptional(asString),
  fontFaceSymbols: asOptional(asString)
})

export type OptionalTheme = ReturnType<typeof asOptionalTheme>

type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'

export interface Theme {
  // The app scaling factor, which is the height of "normal" text:
  rem: (size: number) => number

  preferPrimaryButton: boolean
  fontFamily: string
  fontWeightBold: FontWeight

  // Icons
  icon: string
  iconDeactivated: string
  iconTappable: string

  // Background colors:
  backgroundGradientColors: string[]

  // Modal:
  modal: string
  modalBlurType: 'light' | 'dark'
  modalBorderColor: string
  modalBorderWidth: number
  modalBorderRadiusRem: number

  // Text colors:
  primaryText: string
  secondaryText: string
  dangerText: string
  warningText: string
  linkText: string
  positiveText: string

  // Tile:
  tileBackground: string

  // Buttons
  buttonBorderRadiusRem: number

  keypadButtonOutline: string
  keypadButtonOutlineWidth: number
  keypadButton: string[]
  keypadButtonColorStart: GradientCoords
  keypadButtonColorEnd: GradientCoords
  keypadButtonText: string
  keypadButtonTextShadow: TextShadowParams
  keypadButtonShadow: ThemeShadowParams
  keypadButtonBorderRadiusRem: number
  keypadButtonFontSizeRem: number
  keypadButtonFont: string

  primaryButtonOutline: string
  primaryButtonOutlineWidth: number
  primaryButton: string[]
  primaryButtonColorStart: GradientCoords
  primaryButtonColorEnd: GradientCoords
  primaryButtonText: string
  primaryButtonTextShadow: TextShadowParams
  primaryButtonShadow: ThemeShadowParams

  secondaryButtonOutline: string
  secondaryButtonOutlineWidth: number
  secondaryButton: string[]
  secondaryButtonColorStart: GradientCoords
  secondaryButtonColorEnd: GradientCoords
  secondaryButtonText: string
  secondaryButtonTextShadow: TextShadowParams
  secondaryButtonShadow: ThemeShadowParams

  escapeButtonOutline: string
  escapeButtonOutlineWidth: number
  escapeButton: string[]
  escapeButtonColorStart: GradientCoords
  escapeButtonColorEnd: GradientCoords
  escapeButtonText: string
  escapeButtonTextShadow: TextShadowParams
  escapeButtonShadow: ThemeShadowParams

  // Outline Text Input
  outlineTextInputColor: string
  outlineTextInputTextColor: string
  outlineTextInputBorderWidth: number

  // Dropdown colors:
  dropdownWarning: string
  dropdownError: string
  dropdownText: string

  // Lines
  lineDivider: string
  thinLineWidth: number
  mediumLineWidth: number

  // Font
  fontFaceDefault: string
  fontFaceBold: string
  fontFaceSymbols: string
}
