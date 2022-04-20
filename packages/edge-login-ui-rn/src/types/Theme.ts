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
