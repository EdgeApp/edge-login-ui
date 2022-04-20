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

/**
 * A font definition.
 * We can add weight, kerning, etc. in here for full typography control.
 */
interface FontStyle {
  fontFamily: string
}

export interface Theme {
  // The app scaling factor, which is the height of "normal" text:
  rem: (size: number) => number

  pressedOpacity: number

  // Icons
  icon: string
  iconDeactivated: string
  iconTappable: string

  // Background colors:
  backgroundGradientLeft: string
  backgroundGradientRight: string

  // Modal:
  modal: string
  modalShadow: string
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
  securityAlertModalBackground: string
  securityAlertModalHeaderCircle: string
  securityAlertModalHeaderIcon: string
  securityAlertModalDangerIcon: string
  securityAlertModalWarningIcon: string
  securityAlertModalRowBorder: string
  securityAlertModalText: string

  // Lines
  lineDivider: string
  titleLineDivider: string
  reallyThinLineWidth: number
  thinLineWidth: number
  mediumLineWidth: number

  // Font
  bodyFont: FontStyle
  headingFont: FontStyle

  // Deprecated. Do not use, or we will reject your pull request:
  fontFaceDefault: string
  fontFaceBold: string
  fontFaceSymbols: string
  fontWeightBold: FontWeight
}
