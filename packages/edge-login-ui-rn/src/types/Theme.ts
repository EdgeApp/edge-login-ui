import {
  asArray,
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
  backgroundGradientColors: asArray(asString),

  // Modal:
  modal: asOptional(asString),
  modalBlurType: asOptional(asValue('light', 'dark')),

  // Text colors:
  primaryText: asOptional(asString),
  secondaryText: asOptional(asString),
  dangerText: asOptional(asString),
  warningText: asOptional(asString),
  linkText: asOptional(asString),
  positiveText: asOptional(asString),

  // Tile:
  tileBackground: asOptional(asString),

  // Button colors:
  primaryButtonOutline: asOptional(asString),
  // primaryButton: asOptional(asString),
  primaryButtonText: asOptional(asString),

  secondaryButtonOutline: asOptional(asString),
  // secondaryButton: asOptional(asString),
  secondaryButtonText: asOptional(asString),

  alertModalPrimaryButtonOutline: asOptional(asString),
  alertModalPrimaryButton: asOptional(asString),
  alertModalPrimaryButtonText: asOptional(asString),

  alertModalTertiaryButtonOutline: asOptional(asString),
  alertModalTertiaryButton: asOptional(asString),
  alertModalTertiaryButtonText: asOptional(asString),

  // Dropdown colors:
  dropdownWarning: asOptional(asString),
  dropdownError: asOptional(asString),
  dropdownText: asOptional(asString),

  // Security alert modal:
  securityAlertModalHeaderCircle: asOptional(asString),
  securityAlertModalDangerIcon: asOptional(asString),
  securityAlertModalWarningIcon: asOptional(asString),
  securityAlertModalRowBorder: asOptional(asString),
  securityAlertModalText: asOptional(asString),

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

  // Text colors:
  primaryText: string
  secondaryText: string
  dangerText: string
  warningText: string
  linkText: string
  positiveText: string

  // Tile:
  tileBackground: string

  // Button colors:
  primaryButtonOutline: string
  primaryButton: string
  primaryButtonText: string

  secondaryButtonOutline: string
  secondaryButton: string
  secondaryButtonText: string

  alertModalPrimaryButtonOutline: string
  alertModalPrimaryButton: string
  alertModalPrimaryButtonText: string

  alertModalTertiaryButtonOutline: string
  alertModalTertiaryButton: string
  alertModalTertiaryButtonText: string

  // Dropdown colors:
  dropdownWarning: string
  dropdownError: string
  dropdownText: string

  // Security alert modal:
  securityAlertModalHeaderCircle: string
  securityAlertModalDangerIcon: string
  securityAlertModalWarningIcon: string
  securityAlertModalRowBorder: string
  securityAlertModalText: string

  // Lines
  lineDivider: string
  thinLineWidth: number
  mediumLineWidth: number

  // Font
  fontFaceDefault: string
  fontFaceBold: string
  fontFaceSymbols: string
}
